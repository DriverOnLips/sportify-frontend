import { UserInfoModel } from 'types/types/User/UserInfo.ts';
import React from 'react';
import Image from 'components/lib/Image/Image.tsx';
import styles from './View.module.scss';
import userDefaultAvatar from 'assets/user-default-avatar.png';
import Label from '../../../../components/lib/Aceternity/Label/AceternityLabel.tsx';
import Input from '../../../../components/lib/Aceternity/Input/AceternityInput.tsx';
import { cn } from '../../../../lib/utils.ts';

type Props = {
	user: UserInfoModel | null;
};

const ViewProfile: React.FC<Props> = ({ user }) => {
	return (
		<>
			{user ? (
				<div className={styles.profile_view_wrapper}>
					<div className={styles.profile_view}>
						<div className={styles.profile_view__first_row}>
							<div className={styles.profile_view__first_row_image}>
								<Image
									src={user.avatar || userDefaultAvatar}
									style={{
										width: '20vw',
										maxWidth: '200px',
										borderRadius: 8,
									}}
								/>
							</div>

							<div className={styles.profile_view__first_row_info}>
								<div className='flex mb-4'>
									<LabelInputContainer>
										<Label htmlFor='firstname'>Имя пользователя</Label>
										<Input
											id='firstname'
											style={{ cursor: 'auto' }}
											placeholder='Tyler'
											type='text'
											value={user.username}
											disabled
										/>
									</LabelInputContainer>
								</div>

								{user.tgUrl && (
									<div className='flex mb-4'>
										<LabelInputContainer>
											<div onClick={() => window.open(user.tgUrl, '_blank')}>
												<Label htmlFor='firstname'>Telegram пользователя</Label>

												<Input
													id='tg'
													style={{ cursor: 'auto' }}
													value={user.tgUrl}
													type='text'
													disabled
												/>
											</div>
										</LabelInputContainer>
									</div>
								)}

								<div className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4'>
									{user.firstName && (
										<LabelInputContainer>
											<Label htmlFor='firstname'>Имя</Label>
											<Input
												id='firstname'
												style={{ cursor: 'auto' }}
												placeholder='Tyler'
												type='text'
												value={user.firstName}
												disabled
											/>
										</LabelInputContainer>
									)}
									{user.secondName && (
										<LabelInputContainer>
											<Label htmlFor='secondname'>Фамилия</Label>
											<Input
												id='lastname'
												style={{ cursor: 'auto' }}
												placeholder='Durden'
												type='text'
												value={user.secondName}
												disabled
											/>
										</LabelInputContainer>
									)}
								</div>
							</div>
						</div>

						{user.secondName && (
							<LabelInputContainer className='mb-4'>
								<Label htmlFor='description'>О себе</Label>
								<Input
									id='description'
									style={{ cursor: 'auto', minHeight: 100 }}
									placeholder='Расскажите о своих интересах'
									type='text'
									mode={'textarea'}
									value={user.description}
									disabled
								/>
							</LabelInputContainer>
						)}
					</div>
				</div>
			) : (
				<span>Пользователь не найден :(</span>
			)}
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

export default ViewProfile;
