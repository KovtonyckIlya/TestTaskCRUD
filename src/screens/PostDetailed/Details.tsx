
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
    View,
    ActivityIndicator,
    Text,
    TouchableOpacity,
    ScrollView,
    FlatList,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import type { ApplicationScreenProps } from '@/types/navigations';
import { Header, Comment, Sender } from "../../components"
import { useSelector, useDispatch } from 'react-redux';
import { selectPostComments } from "../../redux/selectors"
import { Button, Input } from '@rneui/themed';
import { deleteCommentByIdActions, patchCommentActions, createNewCommentActions } from "@/redux/actions/actions"
import uuid from 'react-native-uuid';
function PostDetails({ navigation, route }: ApplicationScreenProps) {
    const commentsList = useSelector(selectPostComments)
    const { id, title, body } = route.params
    const [commentText, setCommentText] = useState<string>()
    const dispatch = useDispatch()
    type ItemProps = { id: number, text: string, postId: number };

    const Item = ({ text, id, postId }: ItemProps) => (
        <View key={id}  >
            <Comment text={text} onSaveEditing={(modifiedText) => dispatch(patchCommentActions({
                id: id,
                text: modifiedText,
                postId: postId
            }))} removeComment={() => dispatch(deleteCommentByIdActions(id))} />
        </View>
    );
    return (
        <View style={{ flex: 1 }}>
            <Header title={title} getBack={() => navigation.goBack()} />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={30}
                style={{ flex: 1 }}
            >
                <SafeAreaView style={{ flex: 1 }}>
                    <View >
                        <View style={{ marginTop: 32 }}>
                            <Text style={{ fontSize: 22, lineHeight: 24, textAlign: "center" }}>{body}</Text>
                        </View>
                        <View>
                            <View style={{ marginHorizontal: 16 }}>
                                <Text style={{ fontFamily: "Roboto", fontSize: 18, lineHeight: 22 }}>Comments: </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1, marginHorizontal: 16,position: "relative" }}>
                        <View >

                            <FlatList
                                inverted={true}
                                data={commentsList}
                                renderItem={({ item }) => <Item text={item.text} id={item.id} postId={item.postId} />}
                                keyExtractor={item => item.id}
                            />

                        </View>

                    </View>

                    {/* Component used to send the message */}
                    <View style={{ position: "relative" }}>


                        <Sender
                            disabled={false}
                            onMessageSubmit={(message) => {
                                setCommentText(message)
                                dispatch(createNewCommentActions({
                                    id: uuid.v4().replace(/[^0-9]/g, ''),
                                    text: message,
                                    postId: id
                                }))
                            }
                            }
                        />
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </View>
    );
}

export default PostDetails;
