import React from "react";
import { View, Dimensions } from "react-native";
import Image from "react-native-scalable-image";

import Colors from "../constants/Colors";
import { GestureResponderEvent } from "react-native";
import { Text } from "./Text";
import { ScrollView } from "react-native-gesture-handler";
import { Badge } from './Badge';

export const Card = function (props: {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}) {
  const { onPress } = props;
  return (
    <View
      style={{
        marginLeft: 16,
        backgroundColor: Colors.background,
        padding: 16,
        borderRadius: 20,
        width: Dimensions.get("window").width * 0.75,
        shadowRadius: 44,
        shadowOffset: {
          width: 0,
          height: 16,
        },
        shadowColor: "rgba(8, 23, 62)",
        shadowOpacity: 0.13,
        elevation: 20,
      }}
    >
      <Image
        width={Dimensions.get("window").width * 0.75 - 32}
        source={require("./../assets/images/dish.png")}
        style={{
          borderRadius: 10,
        }}
      />
      <Badge color={[Colors.lightBlue, Colors.red][Math.round(Math.random())]}>
        Glucosevrij
      </Badge>
      <Text
        style={{
          fontFamily: "Manrope_700Bold",
          marginTop: 8,
          marginBottom: 16,
        }}
      >
        Omelette met groenten
      </Text>
    </View>
  );
};

export const CardWrapper = function (props: { children: React.ReactNode }) {
  return (
    <View
      style={{
        marginTop: -72,
        marginBottom: -24,
        marginLeft: -16,
      }}
    >
      <ScrollView
        horizontal={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 48,
        }}
      >
        {props.children}
      </ScrollView>
    </View>
  );
};
