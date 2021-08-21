import React from "react";
import {
  GestureResponderEvent,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";

import Colors from "../constants/Colors";
import { transparentize } from 'polished';

export const Badge = function (props: {
  children: React.ReactNode;
  color?: string | undefined;
}) {
  const { children, color = Colors.keyLime } = props;
  return (
    <View
      style={{
        marginTop: 16,
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      <View
        style={{
          backgroundColor: transparentize(0.94, color),
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 6,
        }}
      >
        <Text
          style={{
            fontFamily: "Manrope_600SemiBold",
            fontSize: 11,
            color
          }}
        >
          {props.children}
        </Text>
      </View>
    </View>
  );
};
