import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import { AuthProps, InputProps, StackParamsList } from "../../types";

import { UpdateContactForm } from "../components/forms";
import { Validation } from "../components/inputs";
import { useAuth } from "../hooks/use-auth";

function LoginScreen() {
  const navigation = useNavigation<NavigationProp<StackParamsList>>(),
    { login, data } = useAuth(),
    { checkValidate, status } = Validation(),
    [serverResponse, setServerResponse] = React.useState<string>(""),
    [inputValue, setInput] = React.useState<AuthProps>({
      email: "",
      password: "",
    }),
    handleSubmit = (props: any) => {
      login(inputValue);
    },
    handleRedirect = async () => {
      setServerResponse("");
      data?.status === true && navigation.navigate("Dashbord");
    },
    CheckIfUserIsLoggedIn = async () => {
      const jsonValue = await AsyncStorage.getItem("@user");
      let info = jsonValue != null ? JSON.parse(jsonValue) : null;

      info?.status === true && navigation.navigate("Dashbord");
    };

  React.useEffect(() => {
    setServerResponse(data?.message);

    let timer = setTimeout(() => {
      handleRedirect();
    }, 1200);

    return () => {
      clearTimeout(timer);
    };
  }, [data]);

  React.useEffect(() => {
    CheckIfUserIsLoggedIn();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ color: "green" }}>{serverResponse}</Text>

      <UpdateContactForm
        formValidation={status}
        formSchema={formSchema}
        onChangeText={(v: InputProps) => {
          setInput({
            email: v?.name === "email" ? v?.value : inputValue.email,
            password: v?.name === "password" ? v?.value : inputValue.password,
          });
        }}
        onSubmit={(v: any) => handleSubmit(checkValidate(inputValue))}
        style={{
          groupWithIcon: styles.formaGroupInputWithIcon,
          formContainer: styles.formaArea,
          container: styles.formaInputArea,
          buttonWrapper: styles.formSubmitButtonWrapper,
          validationText: styles.formInputError,
          buttonText: styles.formSubmitButtonText,
          input: styles.formInput,
        }}
        SubmitButtonLabel="LOGIN"
        showInputIcon={true}
      />
    </View>
  );
}

export default LoginScreen;

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
    buttonText: {
      color: "#fff",
      textAlign: "center",
      padding: 10,
    },
    buttonFrame: {
      backgroundColor: "#3573AF",
      borderRadius: 5,
      width: "100%",
      marginHorizontal: 20,
    },

    // input
    formaArea: { maxHeight: 170 },
    formaInputArea: {},
    formaGroupInputWithIcon: {
      marginBottom: 10,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderBottomWidth: 2,
      borderBottomColor: "#f3f3f3",
      marginVertical: 10,
    },
    formInput: {
      width: Dimensions.get("screen").width - 40,
      marginVertical: 5,
      backgroundColor: "#fff",
      paddingHorizontal: 8,
      paddingVertical: 5,
      fontSize: 16,
    },
    formInputError: { color: "red", fontSize: 12, paddingHorizontal: 10 },
    formSubmitButtonText: { color: "#fff", textAlign: "center", padding: 10 },
    formSubmitButtonWrapper: {
      backgroundColor: "#3573AF",
      borderRadius: 5,
      width: "100%",
      marginBottom: 20,
      marginTop: Platform.select({ ios: 20, android: 30 }),
    },
  }),
  formSchema = [
    {
      defaultValue: "",
      name: "email",
      placeholder: "Email",
      validateMessage: "is required",
      icon: {
        size: 15,
        color: "lightgrey",
        name: "person",
        source: "Ionicons",
      },
      placeholderTextColor: "rgba(53, 116, 170,0.4)",
    },
    {
      defaultValue: "",
      name: "password",
      placeholder: "Password",
      validateMessage: "is required",
      icon: {
        size: 15,
        color: "lightgrey",
        name: "lock",
        source: "MaterialIcons",
      },
      placeholderTextColor: "rgba(53, 116, 170,0.4)",
    },
  ];
