import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store.ts';

export type AppState = {
	isSidebarOpen: boolean;
};

const initialState: AppState = {
	isSidebarOpen: false,
};

export const appSlice = createSlice({
	name: 'appList',
	initialState,
	reducers: {
		setSidebarOpen: (state, action: PayloadAction<boolean>) => {
			state.isSidebarOpen = action.payload;
		},
		toggleSidebarOpen: (state) => {
			state.isSidebarOpen = !state.isSidebarOpen;
		},
	},
});

export const selectIsSidebarOpen = (
	state: RootState,
): AppState['isSidebarOpen'] => state.appState.isSidebarOpen;

export const {
	setSidebarOpen: setSidebarOpenAction,
	toggleSidebarOpen: toggleSidebarOpenAction,
} = appSlice.actions;

export const appReducer = appSlice.reducer;
