import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import { Icons } from "../components/icons";
import { DrawerParamsList, StackParamsList } from "../../types";
import { ProfileExtension } from "./drawer-profile-dropdown";

export function CustomDrawerContent(props: any) {
  const navigation: NavigationProp<StackParamsList & DrawerParamsList> =
      useNavigation(),
    handleNavigation = () => {
      navigation.navigate("Logout");
    };

  return (
    <>
      <View style={styles.iconWrapper}>
        <Icons color="grey" name="feed-person" size={80} source="Octicons" />
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <ProfileExtension
          onPress={() => navigation.navigate("MyProfile", { screenIndex: 2 })}
        />
        <DrawerItem
          label={"Logout"}
          onPress={handleNavigation}
          icon={({ focused, size, color }) => (
            <Icons
              color={color}
              size={size}
              name="power-settings-new"
              source="MaterialIcons"
            />
          )}
        />
      </DrawerContentScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    marginHorizontal: 20,
    borderBottomColor: "#f3f3f3",
  },
});
