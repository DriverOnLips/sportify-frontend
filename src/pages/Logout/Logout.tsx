import useUserInfo from 'hooks/useUserInfo.tsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../components/lib/Toast/Toast.tsx';

const Logout = () => {
	const { logout } = useUserInfo();
	const navigate = useNavigate();

	const handleLogout = async () => {
		await logout();
		showToast('success', 'Вы вышли из аккаунта');
		navigate('/login');
	};

	useEffect(() => {
		handleLogout();
	}, []);

	return <></>;
};
export default Logout;
