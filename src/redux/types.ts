
interface rootReducerState{
    posts: Post[],
    selectedPost:Post,
    comments: Comment[],
}
export interface RootModuleAwareState {
    root: rootReducerState;
}
export interface Post {
    id: number;
    title: string;
    body: string;
}
export interface Comment {
    id: number;
    text: string;
    postId: number;
}
