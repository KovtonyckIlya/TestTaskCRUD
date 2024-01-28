import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal as ModalRN, Pressable } from 'react-native';
import { Header as UIHEADER, Input } from "@rneui/base";
import Icon from 'react-native-vector-icons/AntDesign';
type CommentComponentsProps = {
    text: string;
    onSaveEditing: ({
        text,
    }: {
        text: string;
    }) => void;
    removeComment: () => void;
};

const Comment: React.FunctionComponent<CommentComponentsProps> = ({ text, removeComment, onSaveEditing }) => {
    const [commentValue, setCommentValue] = useState<string>(text)
    const [isEditableCard, setEditableCard] = useState<boolean>(false)
    return (
        <>
            <View style={styles.centeredViewBlock} >
                <View style={styles.centeredView}>
                    <View style={{ alignItems: "center" }}>
                        <Text>Comment:</Text>
                    </View>
                    <View>
                        {isEditableCard ? (
                            <View style={{ height: 40, marginTop: 16 }}>
                                <Input
                                    placeholder='Change title'
                                    value={commentValue}
                                    containerStyle={{ height: 10 }}
                                    inputStyle={{ textAlign: "center" }}
                                    onChangeText={value => setCommentValue(value)}
                                    // onSubmitEditing={() => onSaveEditing(commentValue)}
                                />
                            </View>
                        ) : (
                            <View style={styles.textStylesBlock}><Text style={styles.textStyle}>{commentValue}</Text></View>

                        )}
                    </View>
                    <View style={styles.secondBlock}>
                        <View>
                            {isEditableCard ? (
                                <TouchableOpacity onPress={() => {
                                    onSaveEditing(commentValue)
                                    setEditableCard(!isEditableCard)
                                }}>
                                    <Text>Save</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={() => setEditableCard(!isEditableCard)}>
                                    <Text>Edit</Text>
                                </TouchableOpacity>
                            )}

                        </View>
                        <View>
                            <TouchableOpacity onPress={() => removeComment()}>
                                <Text>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        width: "100%",
        flexDirection: "column",
        borderWidth: 1,
        height: 100,
        justifyContent: "space-around"
    },
    centeredViewBlock: {
        marginVertical: 16,
         height: 120,
    },
    secondBlock: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 32,
        marginTop:16
    },
    textStylesBlock: {
        height: 40,
        marginTop: 16
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 18,
        lineHeight: 22
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default Comment;