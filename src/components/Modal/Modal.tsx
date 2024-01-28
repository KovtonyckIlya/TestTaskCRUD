import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, Modal as ModalRN, Pressable } from 'react-native';
import { Text, Card as UICard, Button, Input } from '@rneui/themed';


type ModalComponentsProps = {
    modalVisible: boolean;
    setModalVisible: () => void;
    onModalSubmit: (title: string, description: string) => void;
};

const Modal: React.FunctionComponent<ModalComponentsProps> = ({ modalVisible, setModalVisible, onModalSubmit }) => {
    const [titleValue, setTitleValue] = useState<string>()
    const [descriptionValue, setDescriptionValue] = useState<string>()
    return (
        <>
            <ModalRN
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible();
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Please enter the following fields! </Text>
                        <View style={{ width: "100%" }}>
                            <Text style={{ textAlign: "center" }}>Card Name:</Text>
                            <Input
                                placeholder="Title"
                                containerStyle={{ width: "100%" }}
                                onChangeText={(value: string) => setTitleValue(value)}
                            />
                        </View>
                        <View style={{ width: "100%" }}>
                            <Text style={{ textAlign: "center" }}>Description:</Text>
                            <Input
                                placeholder="Description"
                                containerStyle={{ width: "100%", height: 64 }}
                                onChangeText={(value: string) => setDescriptionValue(value)}
                            />
                        </View>
                        <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-evenly", marginTop: 16, marginBottom: 16 }}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    onModalSubmit(titleValue, descriptionValue)
                                    setModalVisible()
                                }}>
                                <Text style={styles.textStyle}>Save changes</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible()}>
                                <Text style={styles.textStyle}>Just hide</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ModalRN>
        </>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default Modal;