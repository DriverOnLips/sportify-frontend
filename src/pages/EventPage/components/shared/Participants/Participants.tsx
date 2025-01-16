import React from 'react';
import userDefaultAvatar from 'assets/user-default-avatar.png';
import { AnimatedTooltip } from 'components/lib/Aceternity/AnimatedTooltip/AnimatedTooltip.tsx';
import { UserShortInfoModel } from 'types/types/User/UserShortInfo.ts';

type Props = {
	participants: UserShortInfoModel[];
};

const Participants: React.FC<Props> = ({ participants }) => {
	const tooltipItems = participants.map((participant, index) => ({
		id: index,
		userId: participant.id,
		name: participant.username,
		link: participant.tgUrl,
		image: participant.avatar || userDefaultAvatar,
	}));

	return (
		<div className='flex flex-row items-center justify-center w-max custom'>
			<AnimatedTooltip
				imgStyle={{ height: '30px' }}
				items={tooltipItems}
			/>
		</div>
	);
};

export default Participants;
