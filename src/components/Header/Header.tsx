import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal as ModalRN, Pressable } from 'react-native';
import { Header as UIHEADER } from "@rneui/base";
import Icon from 'react-native-vector-icons/AntDesign';
type HeaderComponentsProps = {
    title: string;
    getBack: () => void;
};

const Header: React.FunctionComponent<HeaderComponentsProps> = ({ title, getBack }) => {

    return (
        <>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: 40,marginHorizontal:16 }}>
                <View>
                    <Icon name="arrowleft" size={30} color="#000000" onPress={() => getBack()} />
                </View>
                <View>
                    <Text style={styles.textStyle}>{title}</Text>
                </View>
                <View>
                    <Text> </Text>
                </View>
            </View>
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
        color: '#000000',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize:24,
        lineHeight:26
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default Header;