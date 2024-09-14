import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './slices/loginSlice';
import themeSlice from './slices/themeSlice';


const rootReducer = {
    login: loginSlice,
    theme:themeSlice
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
