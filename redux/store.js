import { configureStore } from "@reduxjs/toolkit";
import shovelReducer from "./shovelSlice";


export const store = configureStore({
    reducer: {
        shovel: shovelReducer
    },
})

export default store