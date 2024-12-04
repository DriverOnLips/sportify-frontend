import React, { useState } from 'react';
import Input from 'components/lib/Aceternity/Input/AceternityInput.tsx';
import Label from 'components/lib/Aceternity/Label/AceternityLabel.tsx';
import { cn } from 'lib/utils.ts';
import { UserInfoModel } from 'types/types/User/UserInfo.ts';
import { showToast } from 'components/lib/Toast/Toast.tsx';
import { useNavigate } from 'react-router-dom';
import { UsersService } from 'api/UsersService/UsersService.ts';
import { useDispatch } from 'react-redux';
import { setUserAction } from '../../../../states/UserInfoState/UserInfoState.ts';

type Props = {
	user: UserInfoModel;
};

const EditProfile: React.FC<Props> = ({ user }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const usersService = new UsersService();

	const [editedUser, setEditedUser] = useState<UserInfoModel>(user);

	const changeUserField = (field: Partial<UserInfoModel>) => {
		setEditedUser((prev) => ({ ...prev, ...field }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			await usersService.updateUserInfo(editedUser);

			dispatch(setUserAction(editedUser));

			showToast('success', 'Данные сохранены');
			navigate(`/profile/${user.id}`);
		} catch (error: any) {
			if (!error.message?.includes('EREQUESTPENDING')) {
				showToast(
					'error',
					'Ошибка',
					`Ошибка при сохранении данных: ${(error as Error).message}`,
				);
			}
		}
	};

	return (
		<div className={cn('w-[60vw] mx-auto p-4')}>
			<h2 className='font-bold text-xl text-neutral-800 dark:text-neutral-200'>
				Изменение профиля
			</h2>
			<p className='text-neutral-600 text-sm mt-2 dark:text-neutral-300'>
				Тут вы вольны делать, что захотите. Но соблюдайте нормы морали!
			</p>

			<form
				className='my-8'
				onSubmit={handleSubmit}
			>
				<div className='flex md:w-[50%] mb-4'>
					<LabelInputContainer>
						<Label htmlFor='firstname'>Имя пользователя</Label>
						<Input
							id='firstname'
							placeholder='Tyler'
							type='text'
							disabled
							value={editedUser.username}
							onChange={(e) => {
								changeUserField({ username: e.target.value });
							}}
						/>
					</LabelInputContainer>
				</div>

				<div className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4'>
					<LabelInputContainer>
						<Label htmlFor='firstname'>Имя</Label>
						<Input
							id='firstname'
							placeholder='Tyler'
							type='text'
							value={editedUser.firstName}
							onChange={(e) => {
								changeUserField({ firstName: e.target.value });
							}}
						/>
					</LabelInputContainer>
					<LabelInputContainer>
						<Label htmlFor='secondname'>Фамилия</Label>
						<Input
							id='lastname'
							placeholder='Durden'
							type='text'
							value={editedUser.secondName}
							onChange={(e) => {
								changeUserField({ secondName: e.target.value });
							}}
						/>
					</LabelInputContainer>
				</div>

				<LabelInputContainer className='mb-4'>
					<Label htmlFor='description'>О себе</Label>
					<Input
						id='description'
						placeholder='Расскажите о своих интересах'
						type='text'
						mode={'textarea'}
						style={{ minHeight: 100 }}
						value={editedUser.description}
						onChange={(e) => {
							changeUserField({ description: e.target.value });
						}}
					/>
				</LabelInputContainer>

				<button
					className='bg-gradient-to-br relative group/btn from-blue-950 to-blue-400 block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]'
					type='submit'
				>
					Сохранить
					<BottomGradient />
				</button>
			</form>
		</div>
	);
};

// TODO: вынести в отдельный компонент
const BottomGradient = () => {
	return (
		<>
			<span className='group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent' />
			<span className='group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent' />
		</>
	);
};

const LabelInputContainer = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<div className={cn('flex flex-col space-y-2 w-full', className)}>
			{children}
		</div>
	);
};

export default EditProfile;
