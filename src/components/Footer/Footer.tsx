import React from 'react';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
	return (
		<div className={styles.footer__container}>
			footer
			<span className={styles['footer__container-span']}>text</span>
		</div>
	);
};

export default Footer;
