import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
import { AuthProps, IconsProps } from "../../../types";
import { Icons } from "../icons";

interface InputProps {
  defaultValue?: string;
  validate?: string;
  onChangeText?: any;
  validateMessage?: string;
  placeholder?: string;
  placeholderTextColor?: string;
  style?: {
    container?: View["props"]["style"];
    validationText?: Text["props"]["style"];
    input?: TextInput["props"]["style"];
  };
}
export function Input({
  validate,
  validateMessage,
  placeholder,
  style,
  onChangeText,
  placeholderTextColor = "grey",
  defaultValue = "",
}: InputProps) {
  const handleChange = (value: string) => {
    onChangeText(value);
  };
  return (
    <View style={style?.container}>
      <TextInput
        style={style?.input}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        clearButtonMode="always"
        onChangeText={handleChange}
        autoCapitalize="none"
        defaultValue={defaultValue}
      />
      {!Boolean(validate) && (
        <Text style={style?.validationText}>{validateMessage}</Text>
      )}
    </View>
  );
}

type InputWithIconProps = {
  icon?: IconsProps;
  style?: {
    groupWithIcon?: View["props"]["style"];
  };
} & InputProps;
export function InputWithIcon({
  validate,
  validateMessage,
  placeholder,
  style,
  onChangeText,
  icon,
  placeholderTextColor,
  defaultValue = "",
}: InputWithIconProps) {
  const handleChange = (value: string) => {
    onChangeText(value);
  };
  return (
    <View style={style?.container}>
      <View style={style?.groupWithIcon}>
        <Icons
          color={icon?.color}
          name={icon?.name}
          size={icon?.size}
          source={icon?.source}
        />
        <TextInput
          style={style?.input}
          placeholder={placeholder}
          clearButtonMode="always"
          onChangeText={handleChange}
          placeholderTextColor={placeholderTextColor}
          autoCapitalize="none"
          defaultValue={defaultValue}
        />
      </View>
      {!Boolean(validate) && (
        <Text style={style?.validationText}>{validateMessage}</Text>
      )}
    </View>
  );
}

export function Validation(): {
  status: any;
  checkValidate: (props: AuthProps & any) => any;
} {
  const [status, check] = useState<object>({});

  function checkValidate(props: AuthProps & any) {
    let values = Object.entries(props),
      index = 0,
      list = [];

    // analysing value against key
    while (index < values.length) {
      const keyValue = values[index];
      list.push({
        [keyValue[0]]: (keyValue[1] as string).length > 0,
      });
      index++;
    }

    // convert to single object
    let result = list.reduce((prv: any, cur: any) => {
      return { ...prv, ...cur };
    }, {});

    check(result);
  }
  return {
    status,
    checkValidate,
  };
}
