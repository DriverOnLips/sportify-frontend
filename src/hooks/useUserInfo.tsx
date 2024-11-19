import { useDispatch, useSelector } from 'react-redux';
import {
	deleteUserAction,
	selectIsAuthorized,
	selectUser,
	setUserAction,
} from 'states/UserInfoState/UserInfoState.ts';
import { AuthService } from 'api/AuthService/AuthService.ts';
import { UserWithPwModel } from 'types/types/User/UserWithPw.ts';
import { showToast } from 'components/lib/Toast/Toast.tsx';
import { useEffect } from 'react';

const useUserInfo = () => {
	const user = useSelector(selectUser);
	const isAuthorized = useSelector(selectIsAuthorized);

	const dispatch = useDispatch();

	const authService = new AuthService();

	const register = async (user: UserWithPwModel) => {
		try {
			const usr = await authService.register(user);
			dispatch(setUserAction(usr));
		} catch (error: any) {
			if (!error.message?.includes('EREQUESTPENDING')) {
				dispatch(deleteUserAction());

				showToast('error', 'Ошибка', `${(error as Error).message}`);
			}
		}
	};

	const login = async (user: UserWithPwModel) => {
		try {
			const usr = await authService.login(user);
			dispatch(setUserAction(usr));
		} catch (error: any) {
			if (!error.message?.includes('EREQUESTPENDING')) {
				dispatch(deleteUserAction());

				showToast('error', 'Ошибка', `${(error as Error).message}`);
			}
		}
	};

	const logout = async () => {
		try {
			await authService.logout();
			dispatch(deleteUserAction());
		} catch (error: any) {
			if (!error.message?.includes('EREQUESTPENDING')) {
				showToast('error', 'Ошибка', `${(error as Error).message}`);
			}
		}
	};

	const check = async () => {
		try {
			const usr = await authService.check();
			dispatch(setUserAction(usr));
		} catch (error: any) {
			dispatch(deleteUserAction());
		}
	};

	useEffect(() => {
		check();
	}, []);

	return {
		user,
		isAuthorized,
		register,
		login,
		logout,
	};
};

export default useUserInfo;
