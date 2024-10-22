import React from 'react';
import { Button } from 'antd';
import { SportTypes } from '../../types/enums/SportTypes';
import { convertSportTypeToDisplayValue } from '../../utils/converSportTypes';
import { BankOutlined } from '@ant-design/icons';

import VolleyballIcon from '../../assets/sport-icons/volleyball-icon.svg';
import FootballIcon from '../../assets/sport-icons/football-icon.svg';
import BasketballIcon from '../../assets/sport-icons/basketball-icon.svg';
import './ModalSportSelector.scss';

interface ModalSportSelectorProps {
	isVisible: boolean;
	onClose: () => void;
}

const sportIcons: { [key: string]: string } = {
	[SportTypes.Volleyball]: VolleyballIcon,
	[SportTypes.Football]: FootballIcon,
	[SportTypes.Basketball]: BasketballIcon,
};

const sportOptions = Object.values(SportTypes);

const ModalSportSelector: React.FC<ModalSportSelectorProps> = ({
	isVisible,
	onClose,
}) => {
	const handleClose = () => {
		if (isVisible) {
			onClose();
		}
	};

	if (!isVisible) return null;

	return (
		<>
			<div
				className='modal-sport-selector__overlay visible'
				onClick={handleClose}
			/>

			<div className='modal-sport-selector__content visible'>
				<h4 className='modal-sport-selector__header'>Выберите вид спорта:</h4>
				<div className='modal-sport-selector__grid'>
					{sportOptions.map((sport) => (
						<Button
							key={sport}
							className='modal-sport-selector__button'
							onClick={() => {
								console.log(
									'Selected sport:',
									convertSportTypeToDisplayValue(sport),
								);
								handleClose();
							}}
						>
							<div className='modal-sport-selector__icon'>
								{sportIcons[sport] ? (
									<img
										src={sportIcons[sport]}
										alt={convertSportTypeToDisplayValue(sport)}
									/>
								) : (
									<BankOutlined />
								)}
							</div>
							<div className='modal-sport-selector__name'>
								{convertSportTypeToDisplayValue(sport)}
							</div>
						</Button>
					))}
				</div>
			</div>
		</>
	);
};

export default ModalSportSelector;
