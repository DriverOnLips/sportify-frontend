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
import { makeTgLoginUrl } from '../utils/makeTgLoginUrl.ts';

// Когда появится пользователь, этот хук нужно будет переобуть в useAuthorize
// и state тоже
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

				throw error;
			}
		}
	};

	const login = async (user: UserWithPwModel) => {
		try {
			const usr = await authService.login(user);
			dispatch(setUserAction(usr));
			showToast('success', 'Вы вошли в аккаунт');
		} catch (error: any) {
			if (!error.message?.includes('EREQUESTPENDING')) {
				dispatch(deleteUserAction());
				showToast('error', 'Ошибка', `${(error as Error).message}`);

				throw error;
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

	const tgLogin = async () => {
		try {
			const response = await authService.getTgToken();
			const authUrl = makeTgLoginUrl(response);

			// Открываем окно авторизации
			const authWindow = window.open(authUrl, '_blank');

			// Обработчик для фокуса
			const handleFocus = async () => {
				window.removeEventListener('focus', handleFocus);

				if (authWindow && !authWindow.closed) {
					// Закрываем окно авторизации, если оно ещё открыто
					authWindow.close();
				}

				try {
					const usr = await authService.tgLogin(response.token);
					dispatch(setUserAction(usr));
					showToast('success', 'Вы вошли в аккаунт');
				} catch (loginError: any) {
					showToast('error', 'Ошибка', `Ошибка входа: ${loginError.message}`);
				}
			};

			window.addEventListener('focus', handleFocus);
		} catch (error: any) {
			dispatch(deleteUserAction());
			showToast('error', 'Ошибка', `${(error as Error).message}`);
		}
	};

	return {
		user,
		isAuthorized,
		register,
		login,
		logout,
		check,
		tgLogin,
	};
};

export default useUserInfo;
