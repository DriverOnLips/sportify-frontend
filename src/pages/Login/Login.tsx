import React from 'react';
import SignupForm from './components/SignupForm/SignupForm.tsx';
import styles from './Login.module.scss';
import { BackgroundGradientAnimation } from 'components/lib/BackgroundAnimation/BackgroundAnimation.tsx';

const Login: React.FC = () => {
	return (
		<div className={styles.login}>
			<BackgroundGradientAnimation />
			<SignupForm />
		</div>
	);
};

export default Login;
