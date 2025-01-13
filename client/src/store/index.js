import { configureStore } from '@reduxjs/toolkit';
import errorReducer from './error-slice/error-slice.js';
import blogReducer from './blog-slice/blog-slice.js';


const store = configureStore({
    reducer: {
        // Define your reducers here
        blog: blogReducer,
        error: errorReducer,
    },
});

export default store;