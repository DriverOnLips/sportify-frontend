import React from 'react';
import Button from '../../../../components/Button/Button.tsx';

type Props = {
	isSub: boolean;
	disabled?: boolean;
};

const SubButton: React.FC<Props> = ({ isSub, disabled }) => {
	const [isSubscribed, setIsSubscribed] = React.useState(isSub);

	return (
		<>
			<Button
				onClick={(e) => {
					e.stopPropagation();
					setIsSubscribed((prev) => !prev);
				}}
				type={isSubscribed ? 'default' : 'primary'}
				disabled={disabled}
			>
				{isSubscribed ? 'Отписаться' : 'Записаться'}
			</Button>
		</>
	);
};

export default React.memo(SubButton);
