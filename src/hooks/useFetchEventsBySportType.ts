import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { EventsService } from '../api/EventsService/EventsService';
import { SportTypes } from '../types/enums/SportTypes';

interface UseFetchEventsBySportTypeResult {
	events: any[];
	loading: boolean;
	error: string | null;
}

export const useFetchEventsBySportType =
	(): UseFetchEventsBySportTypeResult => {
		const [events, setEvents] = useState<any[]>([]);
		const [loading, setLoading] = useState<boolean>(true);
		const [error, setError] = useState<string | null>(null);

		const location = useLocation();
		const queryParams = new URLSearchParams(location.search);
		const sportTypeParam = queryParams.get('sport_type');

		const sportType = Object.values(SportTypes).includes(
			sportTypeParam as SportTypes,
		)
			? (sportTypeParam as SportTypes)
			: null;

		useEffect(() => {
			const fetchEvents = async () => {
				const eventsService = new EventsService();
				try {
					if (sportType) {
						const result = await eventsService.getEventsBySportType(sportType);
						setEvents(result);
					} else {
						setError('Не выбран корректный вид спорта');
					}
				} catch (err) {
					setError('Ошибка при загрузке мероприятий');
				} finally {
					setLoading(false);
				}
			};

			fetchEvents();
		}, [sportType]);

		return { events, loading, error };
	};
