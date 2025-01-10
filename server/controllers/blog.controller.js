import Blog from "../models/blog.model.js";

export const getAllBlogs = async (_req, res) => {
    try {
        const blogs = await Blog.find();
        if (!blogs) {
            return res.status(200).json({ message: "No blogs found, please create one" });
        }
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getSingleBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "No blog found" });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createBlog = async (req, res) => {
    const { title, body, author, image, category, tags } = req.body;
    try {
        const blog = await Blog.create({ title, body, author, image, category, tags });
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, body, author, image, category, tags } = req.body;

    // Validate input data (optional but recommended)
    if (!title || !body ) {
        return res.status(400).json({ message: "Title and body are required!" });
    }

    try {
        // Find the blog by ID and update with the provided data
        const updatedBlog = await Blog.findByIdAndUpdate(
            id, 
            { title, body, author, image, category, tags }, 
            { new: true } // Return the updated blog document
        );

        // If blog not found
        if (!updatedBlog) {
            return res.status(404).json({ message: "No blog found" });
        }

        // Respond with the updated blog
        res.status(200).json(updatedBlog);
    } catch (error) {
        // Catch any error that occurs during the operation
        res.status(500).json({ message: error.message });
    }
};

export const deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            return res.status(404).json({ message: "No blog found" });
        }
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default { getAllBlogs, getSingleBlog, createBlog, updateBlog, deleteBlog };