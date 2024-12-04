import { UserInfoModel } from 'types/types/User/UserInfo.ts';
import React from 'react';
import Image from '../../../components/lib/Image/Image.tsx';

type Props = {
	user: UserInfoModel | null;
};

const ViewProfile: React.FC<Props> = ({ user }) => {
	return (
		<>
			{user ? (
				<div>
					<Image
						src={user.avatar}
						width={'300px'}
						height={'200px'}
					/>
					<span>{user.username}</span>
				</div>
			) : (
				<span>Пользователь не найден :(</span>
			)}
		</>
	);
};

export default ViewProfile;
