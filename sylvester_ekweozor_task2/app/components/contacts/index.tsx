import { Text, View } from "react-native";
import { IconsProps } from "../../../types";
import { Icons } from "../icons";

interface ContactDetailProps {
  userName?: string;
  icon1?: IconsProps;
  icon2?: IconsProps;
  style?: {
    container?: View["props"]["style"];
    leftContainer?: View["props"]["style"];
    rightContainer?: View["props"]["style"];
    text?: Text["props"]["style"];
    iconWrapper?: View["props"]["style"];
  };
}
export function ContactDetail({
  style,
  icon1,
  icon2,
  userName,
}: ContactDetailProps) {
  return (
    <View style={style?.container}>
      <View style={style?.leftContainer}>
        <View style={style?.iconWrapper}>
          <Icons
            color={icon1?.color}
            name={icon1?.name}
            size={icon1?.size}
            source={icon1?.source}
          />
        </View>
        <Text style={style?.text}>{userName}</Text>
      </View>
      <View style={style?.rightContainer}>
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
