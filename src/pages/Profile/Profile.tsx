import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { showToast } from '../../components/lib/Toast/Toast.tsx';
import { UsersService } from '../../api/UsersService/UsersService.ts';
import { UserInfoModel } from '../../types/types/User/UserInfo.ts';
import { useSelector } from 'react-redux';
import { selectUser } from '../../states/UserInfoState/UserInfoState.ts';
import ViewProfile from './components/View.tsx';
import { Loader } from '../../components/lib/Loader/Loader.tsx';

const Profile = () => {
	const { id } = useParams();

	const currentUser = useSelector(selectUser);
	const isMe = currentUser?.id === id;

	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [userInfo, setUserInfo] = useState<UserInfoModel | null>(null);

	const usersService = new UsersService();

	const getUserInfo = async (id: string) => {
		try {
			const usr = await usersService.getUserInfo(id);
			setUserInfo(usr);
		} catch (error: any) {
			if (!error.message?.includes('EREQUESTPENDING')) {
				showToast(
					'error',
					'Ошибка',
					`Ошибка при получении данных: ${(error as Error).message}`,
				);
			}
		} finally {
			setIsLoaded(true);
		}
	};

	useEffect(() => {
		if (!id) {
			return;
		}

		if (currentUser?.id !== id) {
			getUserInfo(id);
		} else {
			setIsLoaded(true);
		}
	}, [id]);

	return (
		<>
			{!isLoaded ? (
				<Loader />
			) : (
				<>
					{isMe ? (
						<ViewProfile user={currentUser} />
					) : (
						<ViewProfile user={userInfo} />
					)}
				</>
			)}
		</>
	);
};

export default Profile;
