import { POSTS_REQUEST,DELETE_COMMENT_REQUEST,NEW_COMMENT_REQUEST,PATCH_COMMENT_REQUEST, CREATE_POST_REQUEST, GET_POST_BY_ID_REQUEST, DELETE_POST_REQUEST, DELETE_POST_SUCCESS, PATCH_POST_REQUEST, GET_COMMENTS_REQUEST } from "../actions/actions_declaration"

interface PostAction {
  id: number;
  body: string;
  title: string;
}
interface CommentAction {
  id: number;
  text: string;
  postId: number;
}
export const createNewPostActions = (params: PostAction) => {
  return {
    type: CREATE_POST_REQUEST,
    payload: {
      id: params.id,
      title: params.title,
      body: params.body
    }
  }
}
export const patchPostActions = (params: PostAction) => {
  return {
    type: PATCH_POST_REQUEST,
    payload: {
      id: params.id,
      title: params.title,
      body: params.body
    }
  }
}
export const getPostByIdActions = (postId: number, meta?: { onRecieve: () => void }) => {
  return {
    type: GET_POST_BY_ID_REQUEST,
    payload: postId,
    meta
  }
}
export const deletePostByIdActions = (postId: number, meta?: { onDelete: () => void }) => {
  return {
    type: DELETE_POST_REQUEST,
    payload: postId,
    meta
  }
}
export const loadPostsList = () => ({
  type: POSTS_REQUEST,
});

// export const loadCommentsList = (postId: number) => {
//   return {
//     type: GET_COMMENTS_REQUEST,
//     payload: postId,
//   }
// }
export const loadCommentsList = () => ({
  type: GET_COMMENTS_REQUEST,
});
export const deleteCommentByIdActions = (commentId: number, meta?: { onDelete: () => void }) => {
  return {
    type: DELETE_COMMENT_REQUEST,
    payload: commentId,
    meta
  }
}
export const createNewCommentActions = (params: CommentAction) => {
  return {
    type: NEW_COMMENT_REQUEST,
    payload: {
      id: params.id,
      text: params.text,
      postId: params.postId
    }
  }
}
export const patchCommentActions = (params: CommentAction) => {
  return {
    type: PATCH_COMMENT_REQUEST,
    payload: {
      id: params.id,
      text: params.text,
      postId: params.postId
    }
  }
}
