import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Icons } from "../components/icons";

interface ProfileExtensionProps {
  onPress: any;
}
export function ProfileExtension({ onPress }: ProfileExtensionProps) {
  return (
    <Pressable onPress={onPress} style={styles.customLabel2}>
      <Icons
        color={"#000"}
        size={20}
        name="view-module"
        source="MaterialCommunityIcons"
      />
      <Text style={styles.customLabel3}>{"My Profile"}</Text>
    </Pressable>
  );
}

export function DrawerItemLabel(props: any) {
  const [toggled, toggle] = React.useState<boolean>(false),
    { color } = props;
  return (
    <View style={styles.customItemGroup}>
      <Text style={{ color, ...styles.customLabel }}>{"Profile"}</Text>
      <Pressable onPress={() => toggle(!toggled)}>
        {toggled ? (
          <Icons color="#000" size={15} name="up" source="AntDesign" />
        ) : (
          <Icons color="#000" size={20} name="down" source="AntDesign" />
        )}
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  customLabel2: {
    paddingLeft: 70,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  customLabel3: {
    paddingLeft: 5,
  },
  customItemGroup: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  customLabel: {
    width: "90%",
  },
});
