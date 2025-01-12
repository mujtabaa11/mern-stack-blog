import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   formData: {
        title: "",
        body: "",
        author: "",
        image: "",
        category: "",
        tags: "",
    },
    blogsList: [],
    isPending: false,
    isEdit: false,
};

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        setFormData: (state, action) => {
            state.formData = {...state.formData, ...action.payload};
        },
        clearFormData: (state) => { state.formData = initialState.formData; },

        setBlogsList: (state, action) => {
            state.blogsList = action.payload;
        },

        addBlog: (state, action) => {
            state.blogsList = [...state.blogsList, action.payload];
        },
        deleteBlog: (state, action) => {
            state.blogsList = state.blogsList.filter((blog) => blog._id !== action.payload);
        },
        editBlog: (state, action) => {
            const { id, updatedBlog } = action.payload;
            const index = state.blogsList.findIndex((blog) => blog._id === id);
            if (index !== -1) {
                state.blogsList[index] = updatedBlog;
            }
        },
        setIsPending: (state, action) => {
            state.isPending = action.payload;
        },
        setIsEdit: (state, action) => {
            state.isEdit = action.payload;
        },
    },
});

export const { setFormData, clearFormData, setBlogsList, addBlog, deleteBlog, editBlog, setIsPending, setIsEdit } = blogSlice.actions;
export default blogSlice.reducer;