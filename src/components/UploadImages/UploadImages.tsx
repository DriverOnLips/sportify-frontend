import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload, message } from 'antd';
import type { UploadFile, UploadProps } from 'antd';

const UploadImages: React.FC = () => {
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [fileList, setFileList] = useState<UploadFile[]>([]);

	// Обработчик предпросмотра изображения
	const handlePreview = async (file: UploadFile) => {
		setPreviewImage(file.url || (file.preview as string));
		setPreviewOpen(true);
	};

	// Обработчик изменений списка файлов
	const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
		setFileList(newFileList);

	// Отправка URL файла на API
	const sendFileUrl = async (fileUrl: string) => {
		try {
			const response = await fetch('/api/upload', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ fileUrl }), // Отправляем URL в теле запроса
			});
			if (response.ok) {
				message.success('File URL uploaded successfully');
			} else {
				message.error('Failed to upload file URL');
			}
		} catch (error) {
			message.error('Error occurred while uploading file URL');
			console.error('Upload error:', error);
		}
	};

	// Обработчик перед загрузкой, выводит URL файла и отправляет его на API
	const handleBeforeUpload = (file: File) => {
		const fileUrl = URL.createObjectURL(file);
		console.log('File URL:', fileUrl);
		message.info(`File URL: ${fileUrl}`);

		// Отправляем URL на сервер
		sendFileUrl(fileUrl);

		// Возвращаем true, чтобы продолжить загрузку файла
		return true;
	};

	const uploadButton = (
		<button
			style={{ border: 0, background: 'none' }}
			type='button'
		>
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Upload</div>
		</button>
	);

	return (
		<>
			<Upload
				listType='picture-card'
				fileList={fileList}
				onPreview={handlePreview}
				onChange={handleChange}
				beforeUpload={handleBeforeUpload}
				multiple
			>
				{fileList.length >= 8 ? null : uploadButton}
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
