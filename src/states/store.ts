import { configureStore } from '@reduxjs/toolkit';
import { eventListReducer } from './EventListState/EventListState.ts';
import { tgWebAppSliceReducer } from './TGWebApp/TGWebAppState.ts';
import { userInfoReducer } from './UserInfoState/UserInfoState.ts';

const store = configureStore({
	reducer: {
		eventList: eventListReducer,
		tgWebApp: tgWebAppSliceReducer,
		userInfo: userInfoReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
