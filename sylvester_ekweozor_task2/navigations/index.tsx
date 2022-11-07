import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

import { Icons } from "../app/components/icons";
import { DrawerParamsList } from "../types";
import { store } from "../redux";
import { CustomDrawerContent } from "../app/screens/drawer-content";
import ProfileNavigation from "./profile-stack-navigation";
import { DrawerItemLabel } from "../app/screens/drawer-profile-dropdown";

const Drawer = createDrawerNavigator<DrawerParamsList>();

export default function RootNavigation() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen
            name="Home"
            component={ProfileNavigation}
            options={{
              drawerPosition: "right",
              headerShown: false,
              drawerActiveBackgroundColor: "rgba(0,0,200,0)",
              drawerLabel: DrawerItemLabel,
              drawerIcon: ({ size, color }) => (
                <Icons
                  color={color}
                  size={size}
                  name="lock"
                  source="MaterialIcons"
                />
              ),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
