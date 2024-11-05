import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventShortInfoModel } from 'types/types/Event/EventShortInfo.ts';
import { RootState } from '../store.ts';

export type EventListState = {
	events: EventShortInfoModel[];
};

const initialState: EventListState = {
	events: [],
};

export const eventListSlice = createSlice({
	name: 'eventList',
	initialState,
	reducers: {
		setEvents: (state, action: PayloadAction<EventShortInfoModel[]>) => {
			state.events = action.payload;
		},
		deleteEvents: (state) => {
			state.events = [];
		},
	},
});

export const selectEvents = (state: RootState): EventListState['events'] =>
	state.eventList.events;

export const { setEvents: setEventsAction, deleteEvents: deleteEventsAction } =
	eventListSlice.actions;

export const eventListReducer = eventListSlice.reducer;
