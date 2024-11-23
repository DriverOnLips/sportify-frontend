import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import SignupForm from './components/SignupForm.tsx';
import LoginForm from './components/LoginForm.tsx';
import styles from './Login.module.scss';
import { BackgroundGradientAnimation } from 'components/lib/BackgroundAnimation/BackgroundAnimation';
import { Divider } from 'antd';
import useUserInfo from 'hooks/useUserInfo.tsx';
import { useScreenMode } from '../../hooks/useScreenMode.ts';

const Login: React.FC = () => {
	const { isAuthorized } = useUserInfo();

	const navigate = useNavigate();
	const location = useLocation();

	const isLogin = location.pathname === '/login';

	const screenWidth = useScreenMode();
	const isWide = screenWidth > 650;

	useEffect(() => {
		isAuthorized && navigate('/events');
	}, [isAuthorized]);

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
					animate={{ x: isWide ? (isLogin ? '0%' : '125%') : '0' }}
					transition={{ type: 'spring', stiffness: 50 }}
					style={{
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						// minHeight: '70vh',
						width: isWide ? '25vw' : '50vw',
						padding: isWide ? '1.5rem' : '0',
					}}
				>
					{isLogin ? <LoginForm /> : <SignupForm />}
				</motion.div>

				{isWide && (
					<>
						<Divider
							type='vertical'
							style={{
								minHeight: '60vh',
								margin: '0 1.5rem',
							}}
						/>

						<motion.div
							animate={{ x: isLogin ? '0%' : '-125%' }}
							transition={{ type: 'spring', stiffness: 50 }}
							style={{
								flex: 1,
								display: 'flex',
								alignItems: 'center',
								minHeight: '70vh',
								width: '25vw',
								padding: '1.5rem',
							}}
						>
							<div />
						</motion.div>
					</>
				)}
			</div>
		</div>
	);
};

export default Login;
