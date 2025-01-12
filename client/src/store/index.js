import { configureStore } from '@reduxjs/toolkit';
import blogSlice from './blog-slice/blog-slice.js';


const store = configureStore({
    reducer: {
        // Define your reducers here
        blog: blogSlice,
    },
});

export default store;