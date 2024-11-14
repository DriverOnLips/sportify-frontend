import { configureStore } from '@reduxjs/toolkit';
import { eventListReducer } from './EventListState/EventListState.ts';
import { tgWebAppSliceReducer } from './TGWebApp/TGWebAppState.ts';

const store = configureStore({
	reducer: {
		eventList: eventListReducer,
		tgWebApp: tgWebAppSliceReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
