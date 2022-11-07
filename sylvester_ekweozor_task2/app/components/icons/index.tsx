import {
  AntDesign,
  EvilIcons,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { IconsProps } from "../../../types";

export function Icons({
  color = "#000",
  size = 30,
  source = "MaterialIcons",
  name = "",
}: IconsProps) {
  if (name.length < 0) {
    return <></>;
  }

  switch (source) {
    case "MaterialCommunityIcons":
      return <MaterialCommunityIcons name={name} size={size} color={color} />;

    case "Octicons":
      return <Octicons name={name} size={size} color={color} />;

    case "Ionicons":
      return <Ionicons name={name} size={size} color={color} />;

    case "EvilIcons":
      return <EvilIcons name={name} size={size} color={color} />;

    case "AntDesign":
      return <AntDesign name={name} size={size} color={color} />;

    case "FontAwesome5":
      return <FontAwesome5 name={name} size={size} color={color} />;

    default:
      return <MaterialIcons name={name} size={size} color={color} />;
  }
}
