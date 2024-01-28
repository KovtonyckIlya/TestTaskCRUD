import type { StackScreenProps } from '@react-navigation/stack';

type post = {
	id:number | undefined;
	title:string | undefined;
	body:string | undefined;
}

export type ApplicationStackParamList = {
	PostsScreen: undefined;
	PostDetailsScreen: post;

};

export type ApplicationScreenProps =
	StackScreenProps<ApplicationStackParamList>;
