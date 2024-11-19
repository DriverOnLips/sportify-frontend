import useUserInfo from 'hooks/useUserInfo.tsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
	const { logout } = useUserInfo();
	const navigate = useNavigate();

	useEffect(() => {
		logout();
		navigate(-1);
	}, []);

	return <></>;
};
export default Logout;
