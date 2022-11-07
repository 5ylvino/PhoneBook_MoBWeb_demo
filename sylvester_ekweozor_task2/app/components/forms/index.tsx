import React from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import { Input, InputWithIcon } from "../inputs";
import { LabelWithoutIcon } from "../labels";

interface UpdateContactFormProps {
  formValidation: any;
  formSchema: any[];
  onSubmit: any;
  onChangeText?: any;
  style?: {
    formContainer?: FlatList["props"]["style"];
    container?: View["props"]["style"];
    groupWithIcon?: View["props"]["style"];
    buttonWrapper?: View["props"]["style"];
    validationText?: Text["props"]["style"];
    buttonText?: Text["props"]["style"];
    input?: TextInput["props"]["style"];
  };
  SubmitButtonLabel?: string;
  showInputIcon?: boolean;
}
export function UpdateContactForm({
  formValidation,
  onChangeText,
  onSubmit,
  style,
  formSchema,
  SubmitButtonLabel = "Save",
  showInputIcon = false,
}: UpdateContactFormProps) {
  return (
    <>
      <FlatList
        style={style?.formContainer}
        data={formSchema}
        renderItem={({ item, index }) => (
          <>
            {showInputIcon ? (
              <InputWithIcon
                key={index}
                style={{
                  groupWithIcon: style?.groupWithIcon,
                  container: style?.container,
                  input: style?.input,
                  validationText: style?.validationText,
                }}
                placeholder={item?.placeholder}
                validateMessage={item?.validateMessage}
                onChangeText={(v: string) =>
                  onChangeText({ name: item?.name, value: v })
                }
                icon={item?.icon}
                placeholderTextColor={item?.placeholderTextColor}
                validate={formValidation[item?.name]}
                defaultValue={item?.defaultValue}
              />
            ) : (
              <Input
                key={index}
                style={{
                  container: style?.container,
                  input: style?.input,
                  validationText: style?.validationText,
                }}
                placeholder={item?.placeholder}
                validateMessage={item?.validateMessage}
                onChangeText={(v: string) =>
                  onChangeText({ name: item?.name, value: v })
                }
                placeholderTextColor={item?.placeholderTextColor}
                validate={formValidation[item?.name]}
                defaultValue={item?.defaultValue}
              />
            )}
          </>
        )}
      />
      <LabelWithoutIcon
        onPress={onSubmit}
        label={SubmitButtonLabel}
        style={{
          container: style?.buttonWrapper,
          text: style?.buttonText,
        }}
      />
    </>
  );
}
