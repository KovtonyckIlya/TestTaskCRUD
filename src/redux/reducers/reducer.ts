import { POSTS_FAILURE, PATCH_COMMENT_SUCCESS, NEW_COMMENT_SUCCESS, POSTS_SUCCESS, DELETE_COMMENT_SUCCESS, POSTS_REQUEST, CREATE_POST_SUCCESS, GET_POST_BY_ID_SUCCESS, DELETE_POST_SUCCESS, PATCH_POST_SUCCESS, GET_COMMENTS_SUCCESS } from "../actions/actions_declaration"
const initialState = {
  posts: [],
  selectedPost: {},
  comments: []

};

export const PostsReducer = (state = initialState, action: { type: any; post: any; comment: any; comments: any; data: any; }) => {
  switch (action.type) {

    case DELETE_POST_SUCCESS:
      const actualList = state.posts.filter((obj) => obj.id !== action.post)
      return { ...state, posts: actualList, };
    case DELETE_COMMENT_SUCCESS:
      const actualCommentList = state.comments.filter((obj) => obj.id !== action.comment)
      return { ...state, comments: actualCommentList, };
    case GET_COMMENTS_SUCCESS:
      return { ...state, comments: action.comments, };
    case POSTS_SUCCESS:
      return { ...state, posts: action.data, };
    case PATCH_POST_SUCCESS:
      const prevState = [...state.posts]
      const currentState = action.post
      const result = prevState.map((item) => item.id === currentState.id ? currentState : item);
      return { ...state, posts: result };
    case PATCH_COMMENT_SUCCESS:
      const commentsCurrentState = [...state.comments]
      const incomingCommentsState = action.comment
      const modifiedComment = commentsCurrentState.map((item) => item.id === incomingCommentsState.id ? incomingCommentsState : item);
      return { ...state, comments: modifiedComment };
    case NEW_COMMENT_SUCCESS:
      const updatedCommentList = [...state.comments, action.comment]
      return { ...state, comments: updatedCommentList, };
    case CREATE_POST_SUCCESS:
      const updatedList = [...state.posts, action.post]
      return { ...state, posts: updatedList, };
    case GET_POST_BY_ID_SUCCESS:
      return { ...state, selectedPost: action.post, };

    default:
      return state;
  }
};