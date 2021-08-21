import React from "react";
import {
  GestureResponderEvent,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";

import Colors from "../constants/Colors";

export const Button = function (props: {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  children: React.ReactNode;
  backgroundColor?: string | undefined;
  textColor?: string | undefined;
}) {
  const {
    onPress,
    children,
    backgroundColor = Colors.background,
    textColor = Colors.text,
  } = props;
  return (
    <View
      style={{
        marginTop: 16,
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple(Colors.ripple, false)}
      >
        <View
          style={{
            backgroundColor: backgroundColor,
            padding: 16,
            borderRadius: 6,
          }}
        >
          <Text
            style={{
              fontFamily: "Manrope_700Bold",
              fontSize: 14,
            }}
          >
            {props.children}
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};
