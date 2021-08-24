import React from "react";
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  ViewStyle,
} from "react-native";
import { Icon } from "@ui-kitten/components";

import Colors from "../constants/Colors";
import { transparentize, darken } from "polished";

export const IconButton = function (props: {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  backgroundColor?: string | undefined;
  backgroundOpacity?: number | undefined;
  iconColor?: string | undefined;
  style?: StyleProp<ViewStyle> | undefined;
  name: string;
  children?: React.ReactNode | undefined;
  size?: number | undefined;
  iconTextRatio?: number | undefined;
  padding?: number | undefined;
  borderRadius?: number | undefined;
  reverse?: boolean | undefined;
  fullWidth?: boolean | undefined;
}) {
  const {
    onPress,
    backgroundColor = Colors.background,
    backgroundOpacity = 1,
    iconColor = Colors.text,
    name,
    style,
    children,
    padding = 11,
    size = 18,
    iconTextRatio = 1,
    borderRadius = 11,
    reverse = false,
    fullWidth = false,
  } = props;

  const iconButton = (
    <View
      style={[
        {
          flexDirection: reverse ? "row-reverse" : "row",
          backgroundColor: transparentize(
            1 - backgroundOpacity,
            backgroundColor
          ),
          padding,
          borderRadius,
        },
        fullWidth ? styles.fullWidth : {},
      ]}
    >
      <Icon
        style={{ width: size * iconTextRatio, height: size * iconTextRatio }}
        fill={iconColor}
        name={name}
      />
      {children && (
        <Text
          style={{
            fontSize: size,
            lineHeight: size * 1.1,
            color: iconColor,
            marginLeft: size * 0.25,
          }}
        >
          {children}
        </Text>
      )}
    </View>
  );

  return (
    <View
      style={[{ borderRadius }, fullWidth ? {} : styles.matchContent, style]}
    >
      <View
        style={{
          overflow: "hidden",
          borderRadius,
        }}
      >
        {onPress ? (
          <TouchableNativeFeedback
            onPress={onPress}
            background={TouchableNativeFeedback.Ripple(
              darken(0.1, backgroundColor),
              false
            )}
          >
            {iconButton}
          </TouchableNativeFeedback>
        ) : (
          <>{iconButton}</>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  matchContent: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  fullWidth: {
    alignItems: "center",
    justifyContent: "space-between",
  },
});
