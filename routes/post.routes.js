import { Router } from "express";
import { createComment, createPost, deletePost, getFeedPosts, getPost,likePost, savePost } from "../controllers/post.controller.js";

export let postRoutes = Router();


postRoutes.route("/feed").get(getFeedPosts);
postRoutes.route("/:postId").get(getPost);

postRoutes.route("/comment").post(createComment);
postRoutes.route("/create").post(createPost);
postRoutes.route("/like/:postId").patch(likePost);
postRoutes.route("/save/:postId").patch(savePost);
postRoutes.route("/delete/:postId").delete(deletePost);

    




