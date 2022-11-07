import { Pressable, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

interface SearchProps {
  onclick?: any;
  onChangeText?: any;
  searchTerm?: string;
  buttonTitle?: string;
  inputPlaceholder?: string;
  style?: {
    container: View["props"]["style"];
    input: TextInput["props"]["style"];
    button?: {
      buttonWrapper?: View["props"]["style"];
      buttonTitle?: Text["props"]["style"];
    };
  };
}
export function Search({
  searchTerm,
  buttonTitle,
  inputPlaceholder,
  style,
  onChangeText,
  onclick,
}: SearchProps) {
  return (
    <View style={style?.container}>
      <TextInput
        onChangeText={onChangeText}
        style={style?.input}
        placeholder={inputPlaceholder}
        value={searchTerm}
      />
      <Pressable style={style?.button?.buttonWrapper} onPress={onclick}>
        <Text style={style?.button?.buttonTitle}>{buttonTitle}</Text>
      </Pressable>
    </View>
  );
}
