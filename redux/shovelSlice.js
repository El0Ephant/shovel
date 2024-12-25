import { createSlice } from "@reduxjs/toolkit"
import Service from "../data/service.js"
import LocalStorage from "../data/localStorage.js"
import processStatus from "./requestState"

const initialState = {
    fetch: {
        state: processStatus.initial,
        error: null,
    },
    data: {
        choices: {},
        choices_descriptions: {},
        texts: {},
        images: {},
        image_id_map: {},
        initialScreen: null,
        finalScreen: null
    },
    load: {
        state: processStatus.initial,
        error: null,
    },
    save: {
        state: processStatus.initial,
        error: null,
    },
    current: {
        screen: null,
        position: 0,
    },
    continue: false,
    showChoices: false
}

const demoState = {
    fetch: {
        state: processStatus.finished,
        error: null,
    },
    data: {
        choices: {
            start: {
                left: "something",
                right: "end"
            }
        },
        choices_descriptions: {
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
        initialScreen: 'start',
    },
    load: {
        state: processStatus.finished,
        error: null,
    },
    save: {
        state: processStatus.initial,
        error: null,
    },
    current: {
        screen: "start",
        position: 0
    },
    continue: true,
}

const service = new Service();
const storage = new LocalStorage();

const shovelSlice = createSlice({
    name: 'shovel',
    initialState,
    reducers: {
        // FETCH DATA
        fetchDataStart: (state) => {
            state.fetch.state = processStatus.inProgress;
            state.fetch.error = null;
        },
        fetchDataSucceeded: (state, action) => {
            state.fetch.state = processStatus.succeeded;
            state.data = action.payload;
        },
        fetchDataFailed: (state, action) => {
            state.fetch.state = processStatus.failed;
            state.fetch.error = action.payload;
        },

        // LOAD DATA
        loadDataStart: (state) => {
            state.load.state = processStatus.inProgress;
            state.load.error = null;
        },
        loadDataSucceeded: (state, action) => {
            state.load.state = processStatus.succeeded;
            if (action.payload == null) {
                state.continue = false;
                return;
            }

            state.current = action.payload;
            state.continue = true;
        },
        loadDataFailed: (state, action) => {
            state.data.state = processStatus.failed;
            state.data.error = action.payload;
        },

        // SAVE DATA

        saveDataStart: (state) => {
            state.save.state = processStatus.inProgress;
            state.save.error = null;
        },
        saveDataSucceeded: (state, action) => {
            state.save.state = processStatus.succeeded;
        },
        saveDataFailed: (state, action) => {
            state.save.state = processStatus.failed;
            state.save.error = action.payload;
        },

        saveStatusClear: (state) => {
            state.save.state = processStatus.initial;
        },

        // START
        newGame: (state) => {
            state.current.screen = state.data.initialScreen;
            state.current.position = 0;
        },

        // NOVEL
        nextParagraph: (state) => {
            state.current.position += 1;
        },
        showChoices: (state) => {
            state.showChoices = true;
        },
        choice: (state, action) => {
            const choice = action.payload;
            state.current.screen = state.data.choices[state.current.screen][choice];
            state.current.position = 0;
            state.showChoices = false;
        },
    },
}
)


export const fetchData = () => async (dispatch) => {
    dispatch(fetchDataStart());
    try {
        const data = await service.fetchStory();
        dispatch(fetchDataSucceeded(data));
    } catch (error) {
        dispatch(fetchDataFailed(error.toString()));
    }
};

export const loadData = () => async (dispatch) => {
    dispatch(loadDataStart());
    try {
        const data = await storage.load();
        dispatch(loadDataSucceeded(data));
    } catch (error) {
        dispatch(loadDataFailed(error.toString()));
    }
};

export const saveData = () => async (dispatch, getState) => {
    const state = getState().shovel;
    dispatch(saveDataStart());
    try {
        const data = await storage.save(state.current)
        dispatch(saveDataSucceeded());
    } catch (error) {
        dispatch(saveDataFailed(error.toString()));
    }
};

export const handleNextParagraph = () => (dispatch, getState) => {
    const state = getState().shovel;
    const newPosition = state.current.position + 1;
    let choices = state.data.choices[state.current.screen];
    if (choices === undefined) {
        choices = {};
    }
    
    if (newPosition < state.data.texts[state.current.screen].length) {
        dispatch(nextParagraph());
    } else if (Object.hasOwn(choices, 'next')) {
        dispatch(choice('next'));
    } else {
        dispatch(showChoices());
    }
};

export const { fetchDataStart, fetchDataSucceeded, fetchDataFailed,
    loadDataStart, loadDataSucceeded, loadDataFailed,
    saveDataStart, saveDataSucceeded, saveDataFailed,
    saveStatusClear,
    newGame, showChoices, choice, nextParagraph } = shovelSlice.actions
export default shovelSlice.reducer