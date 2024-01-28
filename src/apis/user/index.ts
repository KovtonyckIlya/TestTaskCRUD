import axios from "../axios";

interface Post {
  id: number;
  title: string;
  body: string;
}
interface Comment {
  id: number;
  text: string;
  postId: number;
}
export const getPostsList = async () => {
  return axios.get(`/posts`);
};
export const createNewPost = async (post: Post) => {
  return axios.post(`/posts`, post);
};
export const getPostById = async (postId: number) => {
  return axios.get(`/posts/${postId}`);
};
export const deletePostById = async (postId: number) => {
  return axios.delete(`/posts/${postId}`);
};
export const patchPostById = async (post: Post) => {
  return axios.patch(`/posts/${post.id}`, { title: post.title, body: post.body });
};
export const getComments = async () => {
  return axios.get(`/comments`);
};
export const deleteCommentstById = async (commentId: number) => {
  return axios.delete(`/comments/${commentId}`);
};
export const editCommentById = async (comment: Comment) => {
  return axios.patch(`/comments/${comment.id}`, { text: comment.text });
};
export const createNewComment = async (comment: Comment) => {
  return axios.post(`/comments`, comment);
};

