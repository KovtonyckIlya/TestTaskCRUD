import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, Card as UICard, Button, Input } from '@rneui/themed';


type CardsComponentsProps = {
    id: number;
    title: string;
    body: string;
    onCardDelete: ({
        id,
    }: {
        id: number;
    }) => void;
    onCardClick: ({
        id,
    }: {
        id: number;
    }) => void;
    onSaveEditing: ({
        id,
        title,
        body
    }: {
        id: number;
        title: string;
        body: string;
    }) => void;
};

const Card: React.FunctionComponent<CardsComponentsProps> = ({ id, title, body, onCardClick, onCardDelete, onSaveEditing }) => {
    const [titleValue, setTitleValue] = useState<string>(title)
    const [bodyValue, setBodyValue] = useState<string>(body)
    const [isEditableCard, setEditableCard] = useState<boolean>(false)
    return (
        <>
            <View style={styles.container} key={id}>
                <UICard containerStyle={styles.container}>
                    <TouchableOpacity onPress={() => onCardClick(id)}>
                        {isEditableCard ? (
                            <View style={{ height: 40 }}>
                                <Input
                                    placeholder='Change title'
                                    value={titleValue}
                                    containerStyle={{ height: 10 }}
                                    inputStyle={{ textAlign: "center" }}
                                    onChangeText={value => setTitleValue(value)}
                                    onSubmitEditing={() => onSaveEditing({
                                        id: id,
                                        title: titleValue,
                                        body: bodyValue
                                    })}
                                />
                            </View>
                        ) : (
                            <>

                                <UICard.Title>{title}</UICard.Title>
                                <UICard.Divider />
                            </>
                        )}

                        {isEditableCard ? (
                            <View style={{ height: 100, marginTop: 8 }}>
                                <Input
                                    multiline={true}
                                    numberOfLines={4}
                                    placeholder='Change body'
                                    value={bodyValue}
                                    inputStyle={{ fontSize: 14 }}
                                    containerStyle={{ height: 100 }}
                                    onChangeText={value => setBodyValue(value)}
                                    onSubmitEditing={() => onSaveEditing({
                                        id: id,
                                        title: titleValue,
                                        body: bodyValue
                                    })}
                                />
                            </View>
                        ) : (
                            <View style={styles.bodyBlock}>
                                <Text ellipsizeMode="tail" numberOfLines={5}>{body}</Text>
                            </View>
                        )}

                    </TouchableOpacity>
                    <UICard.Divider />
                    <View style={styles.buttonBlock}>
                        {isEditableCard ? (
                            <>
                                <View>
                                    <TouchableOpacity onPress={() => {
                                        onSaveEditing({
                                            id: id,
                                            title: titleValue,
                                            body: bodyValue
                                        })
                                        setEditableCard(!isEditableCard)
                                    }}>
                                        <Text>Save</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <TouchableOpacity onPress={() => setEditableCard(!isEditableCard)}>
                                        <Text>Undo</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        ) : (
                            <>
                                <View>
                                    <TouchableOpacity onPress={() => onCardDelete(id)}>
                                        <Text>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <TouchableOpacity onPress={() => setEditableCard(!isEditableCard)}>
                                        <Text>Edit</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )

                        }
                    </View >
                </UICard >
            </View >
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
        height: "auto",


    },
    buttonBlock: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    bodyBlock: {
        height: 100,
        alignItems: "center",
        marginTop: 8
    },
    image: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    name: {
        fontSize: 16,
        marginTop: 5,
    },
});

export default Card;