import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { showToast } from '../components/lib/Toast/Toast.tsx';

interface ProtectedRouteProps {
	isAuthorized: boolean;
	children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
	isAuthorized,
	children,
}) => {
	useEffect(() => {
		!isAuthorized && showToast('info', 'Авторизуйтесь, чтобы продолжить');
	}, [isAuthorized]);

	return isAuthorized ? (
		children
	) : (
		<Navigate
			to='/login'
			replace
		/>
	);
};

export default ProtectedRoute;
