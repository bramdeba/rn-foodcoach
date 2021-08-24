import React from "react";
import { Text as RNText, View, StyleProp, TextStyle, Platform } from "react-native";
import { transparentize } from "polished";
import { ViewStyle } from "react-native";
import Colors from "../constants/Colors";

export const Title = function (props: {
  children?: React.ReactNode;
  size?: number | undefined;
  style?: StyleProp<ViewStyle> | undefined;
  color?: string | undefined;
}) {
  const { size = 22 } = props;
  return (
    <RNText
      style={[
        {
          fontSize: size,
          fontFamily: "Manrope_800ExtraBold",
          lineHeight: size * 1.5,
          marginBottom: 16,
          color: props.color || Colors.text,
        },
        props.style,
      ]}
    >
      {props.children}
    </RNText>
  );
};

export const Underline = function (props: {
  children?: React.ReactNode;
  lineColor: string;
  color?: string | undefined;
}) {
  return (
    <View
      style={{
        flexDirection: "column",
        flexWrap: "wrap",
        paddingLeft: 2,
        paddingRight: 2,
      }}
    >
      <RNText
        style={{
          fontSize: 22,
          fontFamily: "Manrope_800ExtraBold",
          zIndex: 3,
          elevation: 3,
          marginBottom: Platform.OS === 'android' ? -5 : -2,
          color: props.color || Colors.text,
        }}
      >
        {props.children}
      </RNText>
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: Platform.OS === 'android' ? -4 : 0,
          backgroundColor: transparentize(0.7, props.lineColor),
          height: 8,
        }}
      ></View>
    </View>
  );
};

export const Strong = function (props: {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle> | undefined;
  color?: string | undefined;
}) {
  return (
    <RNText
      style={[
        {
          fontFamily: "Manrope_700Bold",
          color: props.color || Colors.text,
        },
        props.style,
      ]}
    >
      {props.children}
    </RNText>
  );
};

export const Text = function (props: {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
  color?: string | undefined;
}) {
  return (
    <RNText
      style={[
        {
          fontSize: 16,
          lineHeight: 28,
          fontFamily: "Manrope_400Regular",
          color: props.color || Colors.text,
        },
        props.style,
      ]}
    >
      {props.children}
    </RNText>
  );
};
