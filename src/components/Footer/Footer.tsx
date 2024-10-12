import React from 'react';
import styles from './Footer.module.scss';
import { useNavigate } from 'react-router-dom';

export const Footer: React.FC = () => {
	const navigate = useNavigate();

	const onFooterClick = () => {
		navigate('/');
	};

	return (
		<div
			className={styles.footer__container}
			onClick={onFooterClick}
		>
			Нажми
			<span className={styles['footer__container-span']}>
				{' '}
				чтобы перейти домой
			</span>
		</div>
	);
};
