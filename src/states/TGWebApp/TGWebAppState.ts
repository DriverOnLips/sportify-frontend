import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store.ts';

export type TGWebAppState = {
	startPage: string;
	userId: string;
	chatId: string;
};

const initialState: TGWebAppState = {
	startPage: '',
	userId: '',
	chatId: '',
};

export const tgWebAppSlice = createSlice({
	name: 'tgWebApp',
	initialState,
	reducers: {
		setParams: (state, action: PayloadAction<any>) => {
			state.startPage = action.payload.start_param?.split('__')[0];
			state.chatId = action.payload.start_param?.split('__')[1];
			state.userId = action.payload.user?.id;
		},
	},
});

export const selectTGWebAppStartPage = (
	state: RootState,
): TGWebAppState['startPage'] => state.tgWebApp.startPage;

export const selectTGWebAppUserId = (
	state: RootState,
): TGWebAppState['userId'] => state.tgWebApp.userId;

export const selectTGWebAppChatId = (
	state: RootState,
): TGWebAppState['chatId'] => state.tgWebApp.chatId;

export const { setParams: setParamsAction } = tgWebAppSlice.actions;

export const tgWebAppSliceReducer = tgWebAppSlice.reducer;
