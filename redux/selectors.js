const selectImage = (state) => state.images[state.screen];
const selectParagraph = (state) => state.texts[state.screen];
const selectChoices = (state) => state.choices;

const selectLoadStatus = (state) => state.requestState;
const selectError = (state) => state.error;