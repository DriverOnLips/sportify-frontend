import { UserInfoModel } from '../../types/types/User/UserInfo.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store.ts';

export type UserInfoState = {
	user: UserInfoModel | null;
	isAuthorized: boolean;
};

const initialState: UserInfoState = {
	user: null,
	isAuthorized: false,
};

export const userInfoSlice = createSlice({
	name: 'userInfo',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<UserInfoModel>) => {
			state.user = action.payload;
			state.isAuthorized = true;
			console.log(state.user, state.isAuthorized);
		},
		deleteUser: (state) => {
			state.user = null;
			state.isAuthorized = false;
		},
	},
});

export const selectUser = (state: RootState): UserInfoState['user'] =>
	state.userInfo.user;

export const selectIsAuthorized = (
	state: RootState,
): UserInfoState['isAuthorized'] => state.userInfo.isAuthorized;

export const { setUser: setUserAction, deleteUser: deleteUserAction } =
	userInfoSlice.actions;

export const userInfoReducer = userInfoSlice.reducer;
