
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
	View,
	StyleSheet,
	ScrollView,
	FlatList,
	SafeAreaView
} from 'react-native';
import type { ApplicationScreenProps } from '@/types/navigations';
import { Card, Modal } from "../../components"
import { Button, } from '@rneui/themed';
import { useSelector, useDispatch } from 'react-redux';
import { selectPostsList } from "../../redux/selectors"
import { loadPostsList, createNewPostActions, deletePostByIdActions, patchPostActions, loadCommentsList } from "@/redux/actions/actions"
import uuid from 'react-native-uuid';
function Posts({ navigation }: ApplicationScreenProps) {
	const [isModalVisible, setModalVisible] = useState(false)
	const postsList = useSelector(selectPostsList)
	const dispatch = useDispatch()

	useLayoutEffect(() => {
		dispatch(loadPostsList())
	}, [])

	const toDetails = (postId: number) => {
		const currentPost = postsList.find(p => p.id === postId)
		navigation.navigate("PostDetailsScreen", {
			id: currentPost?.id,
			title: currentPost?.title,
			body: currentPost?.body
		})
		dispatch(loadCommentsList())
	}
	const deleteCard = (id: number) => {
		dispatch(deletePostByIdActions(id))
	}
	type ItemProps = { id: number, title: string, body: string };

	const Item = ({ title, id, body }: ItemProps) => (
		<View key={id} style={{ width: "100%" }} >
			<Card onSaveEditing={({ id, title, body }) => dispatch(patchPostActions({ id: id, title: title, body: body }))} onCardDelete={(id) => deleteCard(id)} onCardClick={(id) => toDetails(id)} title={title} body={body} id={id} />
		</View>
	);
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.container} >
				<FlatList
					data={postsList}
					renderItem={({ item }) => <Item title={item.title} id={item.id} body={item.body} />}
					keyExtractor={item => item.id}
				/>
			</ScrollView>
			<Modal modalVisible={isModalVisible} setModalVisible={() => setModalVisible(!isModalVisible)} onModalSubmit={(title, description) => dispatch(createNewPostActions({ id: uuid.v4().replace(/[^0-9]/g, ''), title: title, body: description }))} />
			<View style={{ alignItems: "center" }}>
				<Button
					title="Add new post"
					onPress={() => setModalVisible(!isModalVisible)}
					buttonStyle={styles.buttonStyle}
					containerStyle={styles.buttonBlock}
					titleStyle={styles.name}
				/>
			</View>
		</SafeAreaView>
	);
}

export default Posts;

const styles = StyleSheet.create({
	container: {
		flex: 1,


	},
	buttonBlock: {
		height: 40,
		width: 200,
		marginHorizontal: 50,
		marginVertical: 10,
	},
	bodyBlock: {
		height: 100,
		alignItems: "center",
		marginTop: 8
	},
	buttonStyle: {
		backgroundColor: 'rgba(127, 220, 103, 1)'
	},
	name: {
		color: 'white',
		marginHorizontal: 20,
	},
});