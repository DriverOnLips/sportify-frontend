import React, { useCallback, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { GetProp, Image, Upload } from 'antd';
import { ImageService } from 'api/ImageService/ImageService.ts';
import { UploadChangeParam } from 'antd/lib/upload';
import { showToast } from '../Toast/Toast.tsx';
import Button from '../Button/Button.tsx';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type Props = {
	className?: string;
	setLink: (link: string) => void;
	removeLink: (link: string) => void;
	initialFile?: string;
};

const UploadImage: React.FC<Props> = ({
	className,
	setLink,
	removeLink,
	initialFile,
}) => {
	const imageService = new ImageService();

	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [fileList, setFileList] = useState<UploadFile[]>(() => {
		return (
			[initialFile]?.map((file, index) => ({
				uid: `-initial-${index}`,
				name: `image-${index + 1}`,
				status: 'done',
				url: file,
			})) || []
		);
	});

	const getBase64 = useCallback((file: FileType): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = (error) => reject(error);
		});
	}, []);

	const handlePreview = useCallback(
		async (file: UploadFile) => {
			if (!file.url && !file.preview) {
				file.preview = await getBase64(file.originFileObj as FileType);
			}
			setPreviewImage(file.url || (file.preview as string));
			setPreviewOpen(true);
		},
		[getBase64],
	);

	const handleChange: UploadProps['onChange'] = useCallback(
		async (info: UploadChangeParam<UploadFile>) => {
			const { fileList: newFileList } = info;

			if (newFileList.length > 1) {
				showToast('error', 'Можно загрузить только одну фотографию');
				return;
			}

			setFileList(newFileList);

			if (newFileList.length === 1 && newFileList[0].originFileObj) {
				try {
					const base64Data = await getBase64(
						newFileList[0].originFileObj as FileType,
					);
					const strippedBase64 = base64Data.replace(
						/^data:image\/\w+;base64,/,
						'',
					);

					const response = await imageService.uploadImage(strippedBase64);
					setLink(response);

					newFileList[0].status = 'done';
				} catch (error: any) {
					newFileList[0].status = 'error';
					showToast(
						'error',
						`${newFileList[0].name} не удалось загрузить`,
						error.message,
					);
				}
			}

			setFileList(newFileList);
		},
		[getBase64, imageService, setLink, showToast],
	);

	const handleRemoveFiles = useCallback(() => {
		if (fileList.length > 0) {
			const fileLink = fileList[0].url;
			if (fileLink) {
				removeLink(fileLink);
				setFileList([]);
			}
		}
	}, [fileList, removeLink]);

	return (
		<>
			<Upload
				className={className}
				listType='picture-card'
				fileList={fileList}
				onPreview={handlePreview}
				beforeUpload={() => false}
				onChange={handleChange}
				onRemove={handleRemoveFiles}
			>
				{fileList.length === 0 ? (
					<Button type={'dashed'}>
						<PlusOutlined />
					</Button>
				) : null}
			</Upload>
			{previewImage && (
				<Image
					wrapperStyle={{ display: 'none' }}
					preview={{
						visible: previewOpen,
						onVisibleChange: (visible) => setPreviewOpen(visible),
						afterOpenChange: (visible) => !visible && setPreviewImage(''),
					}}
					src={previewImage}
				/>
			)}
		</>
	);
};

export default UploadImage;
