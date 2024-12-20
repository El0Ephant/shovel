import { createSlice } from "@reduxjs/toolkit"
import Service from "../api/service.js"
import requestState from "./requestState"

const initialState = {
    requestState: requestState.initial,
    error: null,
    choices: {},
    texts: {},
    images: {},
    screen: null,
    position: null,
    currentChoices: [],
}

const demoState = {
    requestState: requestState.finished,
    error: null,
    choices: {
        start: {
            left: "something",
            right: "end"
        }
    },
    texts: {
        start: ["start", "startstartstart", "startstart"],
        something: ["somethingsomethingsomething"],
        end: ["endend", "endendend", "endend", "endend"]
    },
    images: {
        start: "start.jpg",
        something: "something.jpg",
        end: "end.jpg",
    },
    screen: "start",
    position: 0,
    currentChoices: [],
}

const service = new Service();

const shovelSlice = createSlice({
    name: 'shovel',
    initialState: initialState,
    reducers: {
        // FETCH DATA
        fetchDataStart: (state) => {
            state.requestState = requestState.inProgress;
            state.error = null;
        },
        fetchDataSucceeded: (state, action) => {
            state.requestState = requestState.succeeded;
            state.texts = action.payload.texts;
            state.images = action.payload.images;
            state.choices = action.payload.choices;
            state.screen = action.payload.initialScreen;
        },
        fetchDataFailed: (state, action) => {
            state.requestState = requestState.failed;
            state.error = action.payload;
        },

        // NOVEL
        nextParagraph: (state) => {
            state.position += 1;
        },
        showChoices: (state) => {
            state.currentChoices = state.choices[state.screen];
        },
        choice: (state, action) => {
            const choice = action.payload;
            state.screen = state.choices[state.screen][choice];
            state.currentChoices = [];
            state.position = 0;
        },
    },
}
)


export const fetchData = () => async (dispatch) => {
    dispatch(fetchDataStart());
    try {
        await service.fillImageIdMap();
        const data = await service.fetchStory();
        dispatch(fetchDataSucceeded(data));
    } catch (error) {
        dispatch(fetchDataFailed(error.toString()));
    }
};

export const handleNextParagraph = () => (dispatch, getState) => {
    const state = getState().mySlice;
    const newPosition = state.position + 1;

    if (newPosition < state.texts.length) {
        dispatch(nextParagraph());
    } else if (Object.hasOwn(state.choices[state.screen], 'next')) {
        dispatch(choice('next'));
    } else {
        dispatch(showChoices());
    }
};

export const {fetchDataStart, fetchDataSucceeded, fetchDataFailed} = shovelSlice.actions
export default shovelSlice.reducer