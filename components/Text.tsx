import React from "react";
import { Text as RNText, View, StyleProp, TextStyle } from "react-native";
import { transparentize } from "polished";

export const Title = function (props: { children?: React.ReactNode }) {
  return (
    <RNText
      style={{
        fontSize: 22,
        fontFamily: "Manrope_800ExtraBold",
        lineHeight: 34,
        marginBottom: 16,
      }}
    >
      {props.children}
    </RNText>
  );
};

export const Underline = function (props: {
  children?: React.ReactNode;
  color: string;
}) {
  return (
    <View style={{
      flexDirection: "column",
      flexWrap: "wrap",
      paddingLeft: 2,
      paddingRight: 2,
    }}>
      <RNText
        style={{
          fontSize: 22,
          fontFamily: "Manrope_800ExtraBold",
          zIndex: 3,
          elevation: 3,
          marginBottom: -6
        }}
      >
        {props.children}
      </RNText>
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: -4,
          backgroundColor: transparentize(0.7, props.color),
          height: 8
        }}
      ></View>
    </View>
  );
};

export const Strong = function (props: { children?: React.ReactNode }) {
  return (
    <RNText
      style={{
        fontFamily: "Manrope_700Bold",
      }}
    >
      {props.children}
    </RNText>
  );
};

export const Text = function (props: { children?: React.ReactNode, style?: StyleProp<TextStyle> }) {
  return (
    <RNText
      style={[{
        fontSize: 16,
        lineHeight: 28,
        fontFamily: "Manrope_400Regular",
        
      }, props.style]}
    >
      {props.children}
    </RNText>
  );
};
