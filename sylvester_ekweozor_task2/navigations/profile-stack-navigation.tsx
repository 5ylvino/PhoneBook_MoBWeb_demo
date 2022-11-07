import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { DrawerParamsList, StackParamsList } from "../types";
import ProfileScreen from "../app/screens/profile";
import LogoutScreen from "../app/screens/logout";
import LoginScreen from "../app/screens/login";
import HomeScreen from "../app/screens/home";
import { Icons } from "../app/components/icons";
import { Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

const Stack = createStackNavigator<StackParamsList>();

export default function ProfileNavigation() {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamsList>>();

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        cardStyle: { backgroundColor: "#fff" },
      }}
    >
      <Stack.Screen
        name="Dashbord"
        component={HomeScreen}
        options={{
          headerTitle: "",
          headerBackgroundContainerStyle: { backgroundColor: "#3574AA" },
          headerBackground: () => <View></View>,
          headerLeft: () => <></>,
          headerRight: () => (
            <Pressable onPress={() => navigation.toggleDrawer()}>
              <Icons
                color={"#fff"}
                size={30}
                name="menu"
                source="MaterialIcons"
              />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="MyProfile"
        component={ProfileScreen}
        options={{ headerTitle: "Profile" }}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Logout" component={LogoutScreen} />
    </Stack.Navigator>
  );
}
