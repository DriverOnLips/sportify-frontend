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
import { UsersService } from '../api/UsersService/UsersService.ts';

// Когда появится пользователь, этот хук нужно будет переобуть в useAuthorize
// и state тоже
const useUserInfo = () => {
	const user = useSelector(selectUser);
	const isAuthorized = useSelector(selectIsAuthorized);

	const dispatch = useDispatch();

	const usersService = new UsersService();
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
			const usrInfo = await usersService.getUserInfo(usr.id);
			dispatch(setUserAction(usrInfo));
		} catch (error: any) {
			dispatch(deleteUserAction());
		}
	};

	const tgLogin = async (callback: () => void) => {
		try {
			const response = await authService.getTgToken();
			const authUrl = makeTgLoginUrl(response);

			// Открываем окно авторизации
			const authWindow = window.open(authUrl, '_blank');

			let intervalId: NodeJS.Timeout | null = null;
			let attempts = 0;
			const maxAttempts = 10;

			// Функция проверки статуса авторизации
			const checkAuthStatus = async () => {
				try {
					attempts += 1;

					const usr = await authService.tgLogin(response.token);

					if (usr) {
						dispatch(setUserAction(usr));
						showToast('success', 'Вы вошли в аккаунт');

						stopAuthProcess();
					} else if (attempts >= maxAttempts) {
						stopAuthProcess('error');
					}
				} catch (error: any) {
					if (attempts >= maxAttempts) {
						stopAuthProcess('error');
					}
				}
			};

			// Остановка процесса авторизации
			const stopAuthProcess = (result: 'success' | 'error' = 'success') => {
				callback();

				window.removeEventListener('focus', handleFocus);

				if (intervalId) {
					clearInterval(intervalId);
					intervalId = null;
				}

				if (authWindow && !authWindow.closed) {
					authWindow.close();
				}

				if (result === 'error') {
					dispatch(deleteUserAction());
					showToast('error', 'Ошибка входа в аккаунт');
				}
			};

			const handleFocus = () => {
				if (!intervalId) {
					intervalId = setInterval(checkAuthStatus, 3000);
				}
			};

			// Добавляем обработчик события фокуса
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
