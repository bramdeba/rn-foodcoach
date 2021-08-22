import React from "react";
import {
  GestureResponderEvent,
  StyleProp,
  Text,
  TouchableNativeFeedback,
  View,
  ViewStyle,
} from "react-native";

import Colors from "../constants/Colors";
import { darken } from 'polished';

export const Button = function (props: {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  children: React.ReactNode;
  backgroundColor?: string | undefined;
  textColor?: string | undefined;
  style?: StyleProp<ViewStyle> | undefined;
}) {
  const {
    onPress,
    children,
    backgroundColor = Colors.background,
    textColor = Colors.text,
    style
  } = props;
  return (
    <View
      style={[{
        flexDirection: "row",
        flexWrap: "wrap",
      }, style]}
    >
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple(darken(0.1, backgroundColor), false)}
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
              color: textColor
            }}
          >
            {children}
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};
