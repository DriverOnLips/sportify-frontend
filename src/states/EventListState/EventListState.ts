import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventShortInfoModel } from 'types/types/Event/EventShortInfo.ts';
import { RootState } from '../store.ts';

export type EventListState = {
	allEvents: EventShortInfoModel[];
	myEvents: EventShortInfoModel[];
	upcomingEvents: EventShortInfoModel[];
	pastEvents: EventShortInfoModel[];
};

const initialState: EventListState = {
	allEvents: [],
	myEvents: [],
	upcomingEvents: [],
	pastEvents: [],
};

export const eventListSlice = createSlice({
	name: 'eventList',
	initialState,
	reducers: {
		// allEvents
		setAllEvents: (state, action: PayloadAction<EventShortInfoModel[]>) => {
			state.allEvents = action.payload;
		},
		deleteAllEvents: (state) => {
			state.allEvents = [];
		},

		// myEvents
		setMyEvents: (state, action: PayloadAction<EventShortInfoModel[]>) => {
			state.myEvents = action.payload;
		},
		deleteMyEvents: (state) => {
			state.myEvents = [];
		},

		// upcomingEvents
		setUpcomingEvents: (
			state,
			action: PayloadAction<EventShortInfoModel[]>,
		) => {
			state.upcomingEvents = action.payload;
		},
		deleteUpcomingEvents: (state) => {
			state.upcomingEvents = [];
		},

		// pastEvents
		setPastEvents: (state, action: PayloadAction<EventShortInfoModel[]>) => {
			state.pastEvents = action.payload;
		},
		deletePastEvents: (state) => {
			state.pastEvents = [];
		},
	},
});

export const selectAllEvents = (
	state: RootState,
): EventListState['allEvents'] => state.eventList.allEvents;

export const selectMyEvents = (state: RootState): EventListState['myEvents'] =>
	state.eventList.myEvents;

export const selectUpcomingEvents = (
	state: RootState,
): EventListState['upcomingEvents'] => state.eventList.upcomingEvents;

export const selectPastEvents = (
	state: RootState,
): EventListState['pastEvents'] => state.eventList.pastEvents;

export const {
	setAllEvents: setAllEventsAction,
	deleteAllEvents: deleteAllEventsAction,

	setMyEvents: setMyEventsAction,
	deleteMyEvents: deleteMyEventsAction,

	setUpcomingEvents: setUpcomingEventsAction,
	deleteUpcomingEvents: deleteUpcomingEventsAction,

	setPastEvents: setPastEventsAction,
	deletePastEvents: deletePastEventsAction,
} = eventListSlice.actions;

export const eventListReducer = eventListSlice.reducer;
