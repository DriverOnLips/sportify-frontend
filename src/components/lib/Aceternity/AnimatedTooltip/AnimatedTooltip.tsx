import React, { useState } from 'react';
import {
	motion,
	useTransform,
	AnimatePresence,
	useMotionValue,
	useSpring,
} from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../../../lib/utils.ts';

export const AnimatedTooltip = ({
	items,
	imgStyle,
}: {
	items: {
		id: number;
		userId: string;
		name: string;
		link?: string;
		image: string;
	}[];
	imgStyle?: React.CSSProperties;
}) => {
	const navigate = useNavigate();

	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const springConfig = { stiffness: 100, damping: 5 };
	const x = useMotionValue(0); // going to set this value on mouse move
	// rotate the tooltip
	const rotate = useSpring(
		useTransform(x, [-100, 100], [-45, 45]),
		springConfig,
	);
	// translate the tooltip
	const translateX = useSpring(
		useTransform(x, [-100, 100], [-50, 50]),
		springConfig,
	);
	const handleMouseMove = (event: any) => {
		const halfWidth = event.target.offsetWidth / 2;
		x.set(event.nativeEvent.offsetX - halfWidth); // set the x value, which is then used in transform and rotate
	};

	const handleUsernameClick = (userId: string) => {
		navigate(`/profile/${userId}`);
	};

	return (
		<>
			{items.map((item) => (
				<div className='flex space-x-2'>
					<div
						className='relative group'
						key={item.name}
						onMouseEnter={() => setHoveredIndex(item.id)}
						onMouseLeave={() => setHoveredIndex(null)}
					>
						<AnimatePresence mode='popLayout'>
							{hoveredIndex === item.id && (
								<motion.div
									initial={{ opacity: 0, y: 20, scale: 0.6 }}
									animate={{
										opacity: 1,
										y: 0,
										scale: 1,
										transition: {
											type: 'spring',
											stiffness: 260,
											damping: 10,
										},
									}}
									exit={{ opacity: 0, y: 20, scale: 0.6 }}
									style={{
										translateX: translateX,
										rotate: rotate,
										whiteSpace: 'nowrap',
									}}
									className='absolute -top-16 -left-[50%] translate-x-1/2 flex text-xs  flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2'
								>
									<div className='absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px ' />
									<div className='absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px ' />
									<div
										className='font-bold text-white relative z-30 text-base cursor-pointer'
										onClick={() => handleUsernameClick(item.userId)}
									>
										{item.name}
									</div>
									{item.link && (
										<a
											href={item.link}
											target='_blank'
											className='text-white text-xs'
										>
											{item.link}
										</a>
									)}
								</motion.div>
							)}
						</AnimatePresence>
						<img
							src={item.image}
							alt={item.name}
							style={imgStyle}
							className={cn(
								'object-cover !m-0 !p-0 object-top rounded-full border-2',
								'group-hover:scale-105 group-hover:z-30 border-white relative',
								'transition duration-500 cursor-pointer',
							)}
							onMouseMove={handleMouseMove}
							onClick={() => handleUsernameClick(item.userId)}
						/>
					</div>
				</div>
			))}
		</>
	);
};
