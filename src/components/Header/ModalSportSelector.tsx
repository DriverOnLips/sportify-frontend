import React, { useState } from 'react';
import { Button } from 'antd';
import { SportTypes } from '../../types/enums/SportTypes';
import { convertSportTypeToDisplayValue } from '../../utils/converSportTypes';
import { BankOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

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
	const navigate = useNavigate();
	const [selectedSport, setSelectedSport] = useState<SportTypes | null>(null);

	const handleClose = () => {
		if (isVisible) {
			setSelectedSport(null);
			onClose();
		}
	};

	const handleSportSelect = (sport: SportTypes) => {
		setSelectedSport(sport);
		handleClose();

		navigate(`/events?sport_type=${sport}`);
	};

	if (!isVisible) return null;

	return (
		<>
			<div
				className='modal-sport-selector__overlay visible'
				onClick={handleClose}
			/>

			<div className='modal-sport-selector__content visible'>
				<>
					<h4 className='modal-sport-selector__header'>Выберите вид спорта:</h4>
					<div className='modal-sport-selector__grid'>
						{sportOptions.map((sport) => (
							<Button
								key={sport}
								className='modal-sport-selector__button'
								onClick={() => handleSportSelect(sport)}
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
				</>
			</div>
		</>
	);
};

export default ModalSportSelector;
