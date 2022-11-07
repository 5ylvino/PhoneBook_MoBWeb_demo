import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { DatumProps, IconsProps, StackParamsList } from "../../types";
import { ContactDetail } from "../components/contacts";
import { Icons } from "../components/icons";
import { LabelWithIcon, LabelWithoutIcon } from "../components/labels";
import { Search } from "../components/search";
import { useUser } from "../hooks/use-user";

function HomeScreen() {
  const navigation = useNavigation<NavigationProp<StackParamsList>>(),
    { data, error, getUsers } = useUser(),
    [searchResult, setSearchResult] = useState<DatumProps[]>([]),
    [searchTerm, setSearchTerm] = useState<string>(""),
    listed = searchResult.length > 0 ? searchResult : data?.data,
    listedContact = listed?.map((contact: DatumProps) => ({
      ...contact,
      icon: contactIcon1,
    })),
    handleSearch = (props: any) => {
      const result = data?.data?.filter((user: DatumProps) => {
        let matchedUser = Object.values(user)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        return matchedUser;
      });
      return setSearchResult(result);
    };

  React.useEffect(() => {
    getUsers();
  }, []);

  return (
    <View style={styles.container}>
      <LabelWithoutIcon
        label="Add Contacts"
        style={{
          container: styles.titleContainer,
          text: styles.titleText,
        }}
      />
      <FlatList
        horizontal
        style={styles.shortMenuList}
        data={shortMenu}
        renderItem={({ item, index }) => (
          <LabelWithIcon
            onPress={() =>
              item.label === "New" &&
              navigation.navigate("MyProfile", { screenIndex: 1 })
            }
            key={index}
            icon={item?.icon}
            label={item?.label}
            style={{
              container: styles.shortMenuContainer,
              text: styles.shortMenuText,
              iconWrapper: styles.shortMenuIconWrapper,
            }}
          />
        )}
      />
      <Search
        onclick={handleSearch}
        searchTerm={searchTerm}
        onChangeText={(v: string) => handleSearch(setSearchTerm(v))}
        buttonTitle="Search"
        inputPlaceholder="Search Contact"
        style={{
          container: styles.searchContainer,
          input: styles.searchInput,
          button: {
            buttonTitle: styles.searchText,
            buttonWrapper: styles.searchFrame,
          },
        }}
      />
      <FlatList
        refreshing={false}
        onRefresh={() => getUsers()}
        style={styles.contactList}
        data={listedContact}
        renderItem={({ item, index }) => (
          <ContactDetail
            key={index}
            icon1={item?.icon}
            icon2={contactIcon2}
            userName={item?.name}
            style={{
              leftContainer: styles.contactLeftIconWrapper,
              container: styles.contactContainer,
              text: styles.contactText,
              iconWrapper: styles.contactIconWrapper,
            }}
          />
        )}
      />
      <RefreshContactSection
        label="Refresh Contact"
        icon={refreshContactIcon}
        style={{
          container: styles.RefreshContactContainer,
          text: styles.RefreshContactText,
          iconWrapper: styles.RefreshContactIconWrapper,
        }}
      />
    </View>
  );
}
interface RefreshContactSectionProps {
  icon?: IconsProps;
  label?: string;
  style?: {
    container: View["props"]["style"];
    text: Text["props"]["style"];
    iconWrapper?: View["props"]["style"];
  };
}
function RefreshContactSection({
  style,
  icon,
  label,
}: RefreshContactSectionProps) {
  return (
    <View style={style?.container}>
      <View style={style?.iconWrapper}>
        <Icons
          color={icon?.color}
          name={icon?.name}
          size={icon?.size}
          source={icon?.source}
        />
      </View>
      <Text style={style?.text}>{label}</Text>
    </View>
  );
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
    },

    //title
    titleContainer: {
      marginTop: 30,
      paddingBottom: 15,
    },
    titleText: {
      color: "#A7BFCB",
      fontSize: 25,
      textAlign: "center",
      textTransform: "capitalize",
    },

    // shortMenu
    shortMenuList: {
      marginVertical: 30,
      paddingBottom: 20,
      borderBottomColor: "#f3f3f3",
      borderBottomWidth: 1,
    },
    shortMenuContainer: {
      margin: 10,
    },
    shortMenuText: {
      color: "#000",
      fontSize: 12,
      textAlign: "center",
      padding: 10,
    },
    shortMenuIconWrapper: {
      backgroundColor: "#3573AB",
      borderRadius: 50,
      width: 100,
      height: 100,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },

    // search
    searchContainer: {
      width: "100%",
      paddingHorizontal: 30,
      paddingBottom: 10,
    },
    searchInput: {
      borderRadius: 5,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: "#f3f3f3",
      marginBottom: 10,
    },
    searchText: { color: "#fff", textAlign: "center", padding: 10 },
    searchFrame: {
      backgroundColor: "#3573AF",
      borderRadius: 5,
    },

    // contactList
    contactList: {
      minHeight: Platform.select({ ios: "29.5%", android: "20%" }),
      maxHeight: "30%",
      width: "100%",
      paddingHorizontal: 20,
      marginBottom: 40,
    },
    contactContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10,

      marginVertical: 5,
      borderBottomColor: "#f3f3f3",
      borderBottomWidth: 1,
    },
    contactLeftIconWrapper: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    contactIconWrapper: { paddingRight: 10 },
    contactText: { color: "#000", textAlign: "center" },

    //RefreshContactSection
    RefreshContactContainer: {
      backgroundColor: "#3574AA",
      width: "100%",
      height: 120,
      paddingTop: 5,
      paddingLeft: 15,
    },
    RefreshContactText: {
      color: "#fff",
      fontSize: 10,
    },
    RefreshContactIconWrapper: {
      borderRadius: 50,
      backgroundColor: "#fff",
      width: 40,
      height: 40,
      margin: 10,
      justifyContent: "center",
      alignItems: "center",
    },
  }),
  contactIcon1 = {
    size: 40,
    color: "lightgrey",
    name: "feed-person",
    source: "Octicons",
  },
  contactIcon2 = {
    size: 15,
    color: "grey",
    name: "right",
    source: "AntDesign",
  },
  refreshContactIcon = {
    size: 30,
    color: "lightgrey",
    name: "person-outline",
    source: "Ionicons",
  },
  shortMenu = [
    {
      label: "New",
      icon: {
        size: 55,
        color: "#fff",
        name: "plus-box-multiple-outline",
        source: "MaterialCommunityIcons",
      },
    },
    {
      label: "Phone book",
      icon: {
        size: 55,
        color: "#fff",
        name: "contacts",
        source: "AntDesign",
      },
    },
    {
      label: "Email",
      icon: {
        size: 55,
        color: "#fff",
        name: "email-outline",
        source: "MaterialCommunityIcons",
      },
    },
  ];
