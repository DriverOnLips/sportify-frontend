import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { showToast } from '../../components/lib/Toast/Toast.tsx';
import { UsersService } from '../../api/UsersService/UsersService.ts';
import { UserInfoModel } from '../../types/types/User/UserInfo.ts';
import { useSelector } from 'react-redux';
import { selectUser } from '../../states/UserInfoState/UserInfoState.ts';
import ViewProfile from './components/View/View.tsx';
import { Loader } from '../../components/lib/Loader/Loader.tsx';
import { EditOutlined } from '@ant-design/icons';
import Button from '../../components/lib/Button/Button.tsx';
import useQueryParams from '../../hooks/useQueryParams.ts';
import EditProfile from './components/Edit/Edit.tsx';

const Profile = () => {
	const navigate = useNavigate();

	const { id } = useParams();

	const currentUser = useSelector(selectUser);
	const isMe = currentUser?.id && id && currentUser?.id === id;

	const { edit } = useQueryParams();

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

	const navigateToEdit = useCallback(
		() => isMe && navigate(`/profile/${currentUser.id}?edit=true`),
		[currentUser, isMe],
	);

	return (
		<>
			{!isLoaded ? (
				<Loader />
			) : (
				<>
					{isMe ? (
						<>
							{edit !== 'true' ? (
								<>
									<Button
										style={{ position: 'absolute', right: '10px', top: '10px' }}
										onClick={navigateToEdit}
									>
										<EditOutlined />
									</Button>
									<ViewProfile user={currentUser} />
								</>
							) : (
								<EditProfile user={currentUser} />
							)}
						</>
					) : (
						<ViewProfile user={userInfo} />
					)}
				</>
			)}
		</>
	);
};

export default Profile;
