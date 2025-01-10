import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: false,
    },
    tags: {
        type: String,
        required: false,
    }
},
    { timestamps: true });

export default mongoose.model("Blog", blogSchema);