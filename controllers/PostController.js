import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate("user").exec();
        res.json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "cant get all posts",
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await PostModel.findByIdAndUpdate(
            {
                _id: postId,
            },
            {
                $inc: { viewsCount: 1 },
            },
            {
                returnDocument: "after",
            }
        );
        if (!post) {
            return res.status(500).json({
                message: "not found one for creation post",
            });
        }
        res.json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "cant get one post",
        });
    }
};
export const remove = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await PostModel.findByIdAndDelete({
            _id: postId,
        });

        if (!post) {
            return res.status(500).json({
                message: "not found one for delete post",
            });
        }
        res.json({
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "cant delete one post",
        });
    }
};

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        const post = await doc.save();

        res.json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "cant create post",
        });
    }
};

export const update = async (req, res) => {
    try {
        const postId = req.params.id;
        await PostModel.updateOne(
            {
                _id: postId,
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags,
                user: req.userId,
            }
        );
        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "cant update post",
        });
    }
};
