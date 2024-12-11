import { AnimatedTooltip } from 'components/lib/Aceternity/AnimatedTooltip/AnimatedTooltip.tsx';
import { UserShortInfoModel } from 'types/types/User/UserShortInfo.ts';
import userDefaultAvatar from 'assets/user-default-avatar.png';
import React from 'react';

type Props = {
	creator: UserShortInfoModel;
};

const Creator: React.FC<Props> = ({ creator }) => {
	const { id, username, avatar, tgUrl } = creator;
	return (
		<div className='flex flex-row items-center justify-center w-max'>
			<AnimatedTooltip
				imgStyle={{ height: '30px' }}
				items={[
					{
						id: 1,
						userId: id,
						name: username,
						link: tgUrl,
						image: avatar || userDefaultAvatar,
					},
				]}
			/>
		</div>
	);
};

export default Creator;
