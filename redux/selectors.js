export const selectImage = (state) => {
    const image = state.shovel.data?.images[state.shovel.current.screen];
    return state.shovel.data?.image_id_map[image];
};
export const selectParagraph = (state) => {
    const screen = state.shovel.current.screen;
    const position = state.shovel.current.position;
    return state.shovel.data?.texts[screen][position];
}
export const selectChoices = (state) => {
    const screen = state.shovel.current.screen;
    const choices = state.shovel.data?.choices_descriptions[screen];
    return choices === undefined ? {} : choices;
};

export const selectFetchStatus = (state) => state.shovel.fetch?.state;
export const selectFetchError = (state) => state.shovel.fetch?.error;

export const selectLoadStatus = (state) =>  state.shovel.load?.state;
export const selectLoadError = (state) => state.shovel.load?.error;

export const selectSaveStatus = (state) => state.shovel.save?.state;
export const selectSaveError = (state) => state.shovel.save?.error;

export const selectContinue = (state) => state.shovel.continue;

export const selectShowChoices = (state) => state.shovel.showChoices;
export const selectIsFinal = (state)=> state.shovel.current.screen === state.shovel.data.finalScreen;
