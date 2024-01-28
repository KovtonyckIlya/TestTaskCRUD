import React, { FunctionComponent, useState } from "react";
import {
  View,
  Platform,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
export interface SenderComponentProps {
  disabled?: boolean;
  onMessageSubmit: (message: string) => void;
}
 const Sender: FunctionComponent<SenderComponentProps> = ({
  disabled = false,
  onMessageSubmit,
}) => {
  const [message, setMessage] = useState("");

  return (
    <View
      style={{
        height: Platform.OS === "ios" ? 70 : 70,
        backgroundColor:"#F5F7FA",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ marginRight: 5 }}>
      </View>
      <View style={style.searchBar__clicked}>
        <TextInput
          style={style.input}
          placeholder={"Your comment..."}
          value={message}
          onChangeText={(text) => setMessage(text)}
          editable={!disabled}
        />
      </View>
      <TouchableOpacity
        style={{ marginLeft: 5 }}
        onPress={() => {
          if (!disabled) {
            onMessageSubmit(message);
            setMessage("");
          }
        }}
      >
        <Icon name="send" size={20} color="#900" />
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  searchBar__clicked: {
    height: 40,
    paddingLeft: 0,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#E9ECF2",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: "Nunito",
    fontWeight: "400",
    width: "90%",
  },
});
export default Sender;