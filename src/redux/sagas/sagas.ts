import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import {
  POSTS_FAILURE,
  POSTS_REQUEST,
  POSTS_SUCCESS,
  CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  GET_POST_BY_ID_FAILURE,
  GET_POST_BY_ID_REQUEST,
  GET_POST_BY_ID_SUCCESS,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  PATCH_POST_FAILURE,
  PATCH_POST_REQUEST,
  PATCH_POST_SUCCESS,
  GET_COMMENTS_FAILURE,
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  DELETE_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  NEW_COMMENT_FAILURE,
  NEW_COMMENT_REQUEST,
  NEW_COMMENT_SUCCESS,
  PATCH_COMMENT_FAILURE,
  PATCH_COMMENT_REQUEST,
  PATCH_COMMENT_SUCCESS
} from "../actions/actions_declaration"
import { createNewPostActions, getPostByIdActions, deletePostByIdActions, patchPostActions, createNewCommentActions, deleteCommentByIdActions, patchCommentActions } from "../actions/actions"
import { getPostsList, createNewPost, getPostById, deletePostById, patchPostById, getComments, deleteCommentstById, createNewComment, editCommentById } from "../../apis/user/index"
import { AxiosResponse } from 'axios'
import { Post, Comment } from "./intrerfaces"


export function* getPostsListSaga() {
  try {
    const { data } = (yield call(getPostsList)) as AxiosResponse<Post[]>;
    if (data) {
      yield put({
        type: POSTS_SUCCESS,
        data: data,
      });
    } else {
      yield put({ type: POSTS_FAILURE });
    }
  } catch (error: any) {
    yield put({ type: POSTS_FAILURE, error: error });
  }
}
export function* createNewPostSaga(payload: ReturnType<typeof createNewPostActions>) {
  const post = payload.payload
  try {
    const { data } = (yield call(createNewPost, post)) as AxiosResponse<Post>;
    if (data) {
      yield put({
        type: CREATE_POST_SUCCESS,
        post: data,
      });

    } else {
      yield put({ type: CREATE_POST_FAILURE });
    }
  } catch (error: any) {
    yield put({ type: CREATE_POST_FAILURE, error: error });
  }
}
export function* getPostByIdSaga(payload: ReturnType<typeof getPostByIdActions>) {
  const meta = payload.meta;
  const postId = payload.payload
  try {
    const { data } = (yield call(getPostById, postId)) as AxiosResponse<Post>;
    if (data) {
      yield put({
        type: GET_POST_BY_ID_SUCCESS,
        post: data,
      });
      if (meta?.onRecieve) {
        yield call(meta.onRecieve);
      }
    } else {
      yield put({ type: GET_POST_BY_ID_FAILURE});
    }
  } catch (error: any) {
    yield put({ type: GET_POST_BY_ID_FAILURE, error: error });
  }
}
export function* deletePostByIdSaga(payload: ReturnType<typeof deletePostByIdActions>) {
  const meta = payload.meta;
  const postId = payload.payload
  try {
    const { data } = (yield call(deletePostById, postId)) as AxiosResponse<Post>;
    if (data) {
      yield put({
        type: DELETE_POST_SUCCESS,
        post: postId,
      });
      if (meta?.onDelete) {
        yield call(meta.onDelete);
      }
    } else {
      yield put({ type: DELETE_POST_FAILURE });
    }
  } catch (error: any) {
    yield put({ type: DELETE_POST_FAILURE, error: error });
  }
}
export function* patchPostByIdSaga(payload: ReturnType<typeof patchPostActions>) {
  const post = payload.payload
  try {
    const { data } = (yield call(patchPostById, post)) as AxiosResponse<Post>;
    if (data) {
      yield put({
        type: PATCH_POST_SUCCESS,
        post: data,
      });
    } else {
      yield put({ type: PATCH_POST_FAILURE});
    }
  } catch (error: any) {
    yield put({ type: PATCH_POST_FAILURE, error: error });
  }
}
export function* getCommentsSaga() {
  try {
    const { data } = (yield call(getComments)) as AxiosResponse<Comment[]>;
    if (data) {
      yield put({
        type: GET_COMMENTS_SUCCESS,
        comments: data,
      });
    } else {
      yield put({ type: GET_COMMENTS_FAILURE });
    }
  } catch (error: any) {
    yield put({ type: GET_COMMENTS_FAILURE, error: error });
  }
}
export function* deleteCommentByIdSaga(payload: ReturnType<typeof deleteCommentByIdActions>) {
  const meta = payload.meta;
  const commentId = payload.payload
  try {
    const { data } = (yield call(deleteCommentstById, commentId)) as AxiosResponse<Comment>;
    if (data) {
      yield put({
        type: DELETE_COMMENT_SUCCESS,
        comment: commentId,
      });
      if (meta?.onDelete) {
        yield call(meta.onDelete);
      }
    } else {
      yield put({ type: DELETE_COMMENT_FAILURE });
    }
  } catch (error: any) {
    yield put({ type: DELETE_COMMENT_FAILURE, error: error });
  }
}
export function* createNewCommentSaga(payload: ReturnType<typeof createNewCommentActions>) {
  const comment = payload.payload
  try {
    const { data } = (yield call(createNewComment, comment)) as AxiosResponse<Comment>;
    if (data) {
      yield put({
        type: NEW_COMMENT_SUCCESS,
        comment: data,
      });
    } else {
      yield put({ type: NEW_COMMENT_FAILURE });
    }
  } catch (error: any) {
    yield put({ type: NEW_COMMENT_FAILURE, error: error });
  }
}
export function* patchCommentByIdSaga(payload: ReturnType<typeof patchCommentActions>) {
  const comment = payload.payload
  try {
    const { data } = (yield call(editCommentById, comment)) as AxiosResponse<Comment>;
    if (data) {
      yield put({
        type: PATCH_COMMENT_SUCCESS,
        comment: data,
      });
    } else {
      yield put({ type: PATCH_COMMENT_FAILURE });
    }
  } catch (error: any) {
    yield put({ type: PATCH_COMMENT_FAILURE, error: error });
  }
}
function* mySaga() {
  yield takeEvery(PATCH_COMMENT_REQUEST, patchCommentByIdSaga)
  yield takeEvery(NEW_COMMENT_REQUEST, createNewCommentSaga)
  yield takeEvery(DELETE_COMMENT_REQUEST, deleteCommentByIdSaga)
  yield takeEvery(GET_COMMENTS_REQUEST, getCommentsSaga)
  yield takeEvery(PATCH_POST_REQUEST, patchPostByIdSaga)
  yield takeEvery(DELETE_POST_REQUEST, deletePostByIdSaga)
  yield takeEvery(GET_POST_BY_ID_REQUEST, getPostByIdSaga)
  yield takeEvery(GET_POST_BY_ID_REQUEST, getPostByIdSaga)
  yield takeEvery(POSTS_REQUEST, getPostsListSaga)
  yield takeEvery(CREATE_POST_REQUEST, createNewPostSaga)
}

export default mySaga