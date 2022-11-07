import { Pressable, Text, View } from "react-native";
import { IconsProps } from "../../../types";
import { Icons } from "../icons";

interface LabelProps {
  onPress?: any;
  label?: string;
  icon?: IconsProps;
  style?: {
    container?: View["props"]["style"];
    text?: Text["props"]["style"];
    iconWrapper?: View["props"]["style"];
  };
}
export function LabelWithoutIcon({ label, style, onPress }: LabelProps) {
  return (
    <Pressable style={style?.container} onPress={onPress}>
      <Text style={style?.text}>{label}</Text>
    </Pressable>
  );
}
export function LabelWithIcon({ label, icon, style, onPress }: LabelProps) {
  return (
    <Pressable style={style?.container} onPress={onPress}>
      <View style={style?.iconWrapper}>
        <Icons
          color={icon?.color}
          name={icon?.name}
          size={icon?.size}
          source={icon?.source}
        />
      </View>
      <Text style={style?.text}>{label}</Text>
    </Pressable>
  );
}
