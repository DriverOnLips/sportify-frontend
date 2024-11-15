import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import SignupForm from './components/SignupForm/SignupForm';
import LoginForm from './components/LoginForm/LoginForm.tsx';
import styles from './Login.module.scss';
import { BackgroundGradientAnimation } from 'components/lib/BackgroundAnimation/BackgroundAnimation';
import { Divider } from 'antd';

const Login: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const isLogin = location.pathname === '/login';

	// Функция для переключения маршрута
	const toggleAuth = () => {
		navigate(isLogin ? '/signup' : '/login');
	};

	useEffect(() => {
		const content = document.getElementById('content');
		if (content) {
			content.style.overflow = 'hidden';
		}

		return () => {
			if (content) {
				content.style.overflow = 'auto';
			}
		};
	}, []);

	return (
		<div className={styles.login}>
			<BackgroundGradientAnimation />
			<div className={styles.login_container}>
				<motion.div
					animate={{ x: isLogin ? '0%' : '100%' }}
					transition={{ type: 'spring', stiffness: 50 }}
					style={{ flex: 1 }}
				>
					{isLogin ? <LoginForm /> : <SignupForm />}
				</motion.div>
				<Divider type='vertical' />
				<motion.div
					animate={{ x: isLogin ? '0%' : '-100%' }}
					transition={{ type: 'spring', stiffness: 50 }}
					style={{ flex: 1 }}
				>
					<div />
				</motion.div>
			</div>

			<div>
				<a
					onClick={toggleAuth}
					style={{ cursor: 'pointer', color: '#1890ff' }}
				>
					{isLogin ? 'Перейти к регистрации' : 'Перейти к авторизации'}
				</a>
			</div>
		</div>
	);
};

export default Login;
