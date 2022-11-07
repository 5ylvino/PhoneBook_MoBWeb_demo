import React from "react";
import { View } from "react-native";
import { IconsProps } from "../../../types";
import { Icons } from "../icons";

interface PhotoPlaceholderProps {
  icon1?: IconsProps;
  icon2?: IconsProps;
  style?: {
    container: View["props"]["style"];
    iconWrapper1?: View["props"]["style"];
    iconWrapper2?: View["props"]["style"];
  };
}
export function PhotoPlaceholder({
  icon1,
  icon2,
  style,
}: PhotoPlaceholderProps) {
  return (
    <View style={style?.container}>
      <View style={style?.iconWrapper1}>
        <Icons
          color={icon1?.color}
          name={icon1?.name}
          size={icon1?.size}
          source={icon1?.source}
        />
      </View>
      <View style={style?.iconWrapper2}>
        <Icons
          color={icon2?.color}
          name={icon2?.name}
          size={icon2?.size}
          source={icon2?.source}
        />
      </View>
    </View>
  );
}
