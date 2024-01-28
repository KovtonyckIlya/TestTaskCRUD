import { RootModuleAwareState } from "../types";

export const selectPostsList = (state: RootModuleAwareState) => {
  return state.root.posts;
};
export const selectCurrentPost = (state: RootModuleAwareState) => {
  return state.root.selectedPost;
};
export const selectPostComments = (state: RootModuleAwareState) => {
  return state.root.comments;
};