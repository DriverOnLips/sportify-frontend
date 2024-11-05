import { configureStore } from '@reduxjs/toolkit';
import { eventListReducer } from './EventListState/EventListState.ts';

const store = configureStore({
	reducer: {
		eventList: eventListReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
