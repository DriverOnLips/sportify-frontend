import React from 'react';
import { useNavigate } from 'react-router-dom'; // Для внутренних редиректов
import Slider from 'react-slick';
import styles from './AnnouncementsCarousel.module.scss';

type Announcement = {
	id: string;
	image: string;
	link: string;
};

const AnnouncementsCarousel: React.FC<{ announcements: Announcement[] }> = ({
	announcements,
}) => {
	const navigate = useNavigate();

	const settings = {
		infinite: true,
		speed: 500,
		slidesToShow: 3.5,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3800,
		arrows: true,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2.5,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1.5,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	const handleRedirect = (link: string) => {
		if (link.startsWith('http')) {
			window.open(link, '_blank');
		} else {
			navigate(link);
		}
	};

	return (
		<div className={styles.carousel}>
			<Slider {...settings}>
				{announcements.map((announcement) => (
					<div
						key={announcement.id}
						className={styles.slide}
						onClick={() => handleRedirect(announcement.link)}
					>
						<img
							src={announcement.image}
							className={styles.image}
							alt='announcement'
						/>
					</div>
				))}
			</Slider>
		</div>
	);
};

export default AnnouncementsCarousel;
