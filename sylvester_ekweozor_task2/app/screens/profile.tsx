import React from "react";
import {
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { UpdateContactForm } from "../components/forms";
import { PhotoPlaceholder } from "../components/images-resource";
import { LabelWithoutIcon } from "../components/labels";
import { useAuth } from "../hooks/use-auth";
import { DatumProps } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";

function ProfileScreen() {
  const [selected, select] = React.useState<number>(0),
    { params } = useRoute(),
    // @ts-ignore
    screenIndex = params?.screenIndex,
    [user, setUser] = React.useState<DatumProps | any>({
      email: "",
      id: 0,
      name: "",
      phone: "",
      username: "",
    }),
    { update, data, register } = useAuth(),
    [serverResponse, setServerResponse] = React.useState<string>(""),
    handleRedirect = async () => {
      setServerResponse("");
    },
    CheckIfUserIsLoggedIn = async () => {
      const jsonValue = await AsyncStorage.getItem("@user");
      let info = jsonValue != null ? JSON.parse(jsonValue) : null;

      if (screenIndex === 2) {
        setUser(info?.data);
      }
    },
    handleSubmit = async () => {
      if (screenIndex === 1) {
        return register({ ...user, password: "p" });
      }
      return update(user);
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

  const formSchemaEnhanced = formSchema.map((item) => {
    return {
      ...item,
      defaultValue:
        item?.name === "name"
          ? user?.name ?? ""
          : item?.name === "email"
          ? user?.email ?? ""
          : item?.name === "phone"
          ? user?.phone ?? ""
          : user?.username ?? "",
    };
  });

  return (
    <View style={styles.container}>
      <PhotoPlaceholder
        icon1={{
          color: "#AEAEAE",
          name: "feed-person",
          size: 150,
          source: "Octicons",
        }}
        icon2={{
          size: 30,
          color: "#fff",
          name: "pen",
          source: "FontAwesome5",
        }}
        style={{
          container: styles.photoIconArea,
          iconWrapper1: styles.photoIconWrapper1,
          iconWrapper2: styles.photoIconWrapper2,
        }}
      />
      <LabelWithoutIcon
        label="Top Badges"
        style={{
          container: styles.badgeFrame,
          text: styles.badgeText,
        }}
      />
      <FlatList
        horizontal
        style={styles.shortMenuList}
        data={shortMenu}
        renderItem={({ item, index }) => (
          <LabelWithoutIcon
            onPress={() => select(index)}
            key={index}
            label={item?.label}
            style={{
              container:
                selected === index
                  ? styles.shortMenuContainerActive
                  : styles.shortMenuContainerInactive,
              text:
                selected === index
                  ? styles.shortMenuTextActive
                  : styles.shortMenuTextInactive,
            }}
          />
        )}
      />
      <Text style={{ color: "green" }}>{serverResponse}</Text>
      <UpdateContactForm
        formValidation={true}
        formSchema={screenIndex === 1 ? formSchema : formSchemaEnhanced}
        onChangeText={(v: any) => setUser({ ...user, [v?.name]: v?.value })}
        onSubmit={handleSubmit}
        style={{
          formContainer: styles.formaArea,
          container: styles.formaInputArea,
          buttonWrapper: styles.formSubmitButtonWrapper,
          validationText: styles.formInputError,
          buttonText: styles.formSubmitButtonText,
          input: styles.formInput,
        }}
      />
    </View>
  );
}

export default ProfileScreen;
const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      margin: 5,
    },

    // badge
    badgeText: { color: "#fff", textAlign: "center", padding: 10 },
    badgeFrame: {
      backgroundColor: "#3573AF",
      borderRadius: 5,
      width: "100%",
      marginHorizontal: 20,
    },

    // shortMenu
    shortMenuList: {
      marginVertical: 30,
      paddingBottom: 20,
      borderBottomColor: "#f3f3f3",
      borderBottomWidth: 1,
      width: "100%",
    },
    shortMenuContainerActive: {
      backgroundColor: "#3573AF",
      borderColor: "#3573AF",
      borderWidth: 1,
      width: Dimensions.get("screen").width * 0.325,
    },
    shortMenuContainerInactive: {
      backgroundColor: "#fff",
      borderColor: "#3573AF",
      borderWidth: 1,
      width: Dimensions.get("screen").width * 0.325,
    },
    shortMenuTextActive: {
      color: "#fff",
      fontSize: 12,
      textAlign: "center",
      padding: 10,
    },
    shortMenuTextInactive: {
      color: "#3573AF",
      fontSize: 12,
      textAlign: "center",
      padding: 10,
    },

    // input
    formaArea: { height: Platform.select({ ios: 290, android: 200 }) },
    formaInputArea: { marginBottom: 10 },
    formInput: {
      width: Dimensions.get("screen").width - 5,
      marginVertical: 10,
      backgroundColor: "#fff",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderBottomWidth: 2,
      borderBottomColor: "#f3f3f3",
      fontSize: 16,
    },
    formInputError: { color: "red", fontSize: 12, paddingHorizontal: 10 },
    formSubmitButtonText: { color: "#fff", textAlign: "center", padding: 10 },
    formSubmitButtonWrapper: {
      backgroundColor: "#3573AF",
      borderRadius: 5,
      width: "100%",
      marginHorizontal: 20,
    },

    // photo Icon
    photoIconArea: { marginTop: 40, marginBottom: 40 },
    photoIconWrapper1: {},
    photoIconWrapper2: {
      backgroundColor: "grey",
      borderRadius: 50,
      width: 50,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: 90,
      right: -10,
    },
  }),
  shortMenu = [
    {
      label: "Profile",
    },
    {
      label: "Social",
    },
    {
      label: "Links",
    },
  ],
  formSchema = [
    {
      defaultValue: "",
      name: "name",
      placeholder: "Full Name",
      validateMessage: "is required",
    },
    {
      defaultValue: "",
      name: "phone",
      placeholder: "Mobile Number",
      validateMessage: "is required",
    },
    {
      defaultValue: "",
      name: "email",
      placeholder: "Email",
      validateMessage: "is required",
    },
    {
      defaultValue: "",
      name: "username",
      placeholder: "Username",
      validateMessage: "is required",
    },
  ];
