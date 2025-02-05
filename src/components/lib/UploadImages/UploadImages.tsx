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
	initialFiles?: string[];
};

const UploadImages: React.FC<Props> = ({
	className,
	setLink,
	removeLink,
	initialFiles,
}) => {
	const imageService = new ImageService();

	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [fileList, setFileList] = useState<UploadFile[]>(() => {
		return (
			initialFiles?.map((file, index) => ({
				uid: `-initial-${index}`,
				name: `image-${index + 1}`,
				status: 'done',
				url: file,
			})) || []
		);
	});

	const [filesWithUrls, setFilesWithUrls] = useState<
		{ file: string; url: string }[]
	>([]);

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

	const handleAddFiles = useCallback(
		async (newFileList: UploadFile[]) => {
			const newFiles = newFileList.filter(
				(file) => file.status === 'uploading' || !file.status,
			);

			for (const file of newFiles) {
				if (file.originFileObj) {
					try {
						const base64Data = await getBase64(file.originFileObj as FileType);
						const strippedBase64 = base64Data.replace(
							/^data:image\/\w+;base64,/,
							'',
						); // Обрезаем data:image/png;base64,

						const response = await imageService.uploadImage(strippedBase64);
						setFilesWithUrls((prevState) => [
							...prevState,
							{ file: file.uid, url: response },
						]);
						setLink(response);

						file.status = 'done';
					} catch (error: any) {
						file.status = 'error';

						showToast(
							'error',
							`${file.name} не удалось загрузить`,
							error.message,
						);
					}
				}
			}
		},
		[getBase64, imageService, setFilesWithUrls, setLink, showToast],
	);

	const handleRemoveFiles = useCallback(
		(fileList: UploadFile[]) => {
			const removedFiles = fileList.filter(
				(file) => file.status === 'removed' || !file.status,
			);

			for (const file of removedFiles) {
				// Удаление добавленной картинки : удаление существующей картинки
				let fileLink = file.originFileObj
					? filesWithUrls?.find((fileWithUrl) => fileWithUrl.file === file.uid)
							?.url
					: file.url;

				if (fileLink) {
					removeLink(fileLink);
					setFilesWithUrls((prevState) =>
						prevState.filter((fileWithUrl) => fileWithUrl.url !== fileLink),
					);
				}
			}
		},
		[filesWithUrls, removeLink, setFilesWithUrls],
	);

	const handleChange: UploadProps['onChange'] = useCallback(
		async (info: UploadChangeParam<UploadFile<any>>) => {
			const { fileList: newFileList } = info;

			setFileList(newFileList);

			await handleAddFiles(newFileList);

			handleRemoveFiles(fileList);
		},
		[handleAddFiles, handleRemoveFiles, fileList, setFileList],
	);

	return (
		<>
			<Upload
				className={className}
				listType='picture-card'
				fileList={fileList}
				onPreview={handlePreview}
				beforeUpload={() => false}
				onChange={handleChange}
				multiple
			>
				{fileList.length >= 8 ? null : (
					<Button type={'dashed'}>
						<PlusOutlined />
					</Button>
				)}
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

export default UploadImages;
