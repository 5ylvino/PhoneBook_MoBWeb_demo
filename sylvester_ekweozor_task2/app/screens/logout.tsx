import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import * as Updates from "expo-updates";

import { StackParamsList } from "../../types";
import { LabelWithoutIcon } from "../components/labels";
import { useAuth } from "../hooks/use-auth";

function LogoutScreen() {
  const navigation = useNavigation<NavigationProp<StackParamsList>>(),
    { logout, data } = useAuth(),
    handleSubmit = async (buttonIndex: number) => {
      if (buttonIndex === 2) {
        return navigation.navigate("Dashbord");
      } else {
        const jsonValue = await AsyncStorage.getItem("@user");
        let info = jsonValue != null ? JSON.parse(jsonValue) : null,
          { data } = info;

        console.log("jsonValue", data?.id);
        await logout({ id: data?.id });

        await AsyncStorage.clear();
        Updates.reloadAsync();
      }
    };

  return (
    <View style={styles.container}>
      <LabelWithoutIcon
        label="Proceed Sign-Out?"
        style={{
          container: styles.labelFrame,
          text: styles.labelText,
        }}
      />
      <View style={styles.buttonArea}>
        <LabelWithoutIcon
          onPress={() => handleSubmit(1)}
          label="Yes"
          style={{
            container: styles.buttonFrame,
            text: styles.buttonText,
          }}
        />
        <LabelWithoutIcon
          onPress={() => handleSubmit(2)}
          label="Cancel"
          style={{
            container: styles.buttonFrame,
            text: styles.buttonText,
          }}
        />
      </View>
    </View>
  );
}

export default LogoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  // label
  labelText: {
    color: "#3573AF",
    textAlign: "center",
    padding: 10,
    fontSize: 20,
  },
  labelFrame: {
    borderRadius: 5,
    width: "100%",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  // button
  buttonArea: { flexDirection: "row", justifyContent: "space-evenly" },
  buttonText: { color: "#fff", textAlign: "center", padding: 10 },
  buttonFrame: {
    backgroundColor: "#3573AF",
    borderRadius: 5,
    width: "40%",
    marginHorizontal: 20,
  },
});
