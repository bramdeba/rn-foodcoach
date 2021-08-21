import * as React from "react";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";

import { RootTabScreenProps } from "../types";
import Colors from "../constants/Colors";
import { Title, Text, Strong, Underline } from "../components/Text";
import { Button } from "../components/Button";
import { ScrollView } from "react-native-gesture-handler";
import { Card, CardWrapper } from "../components/Card";

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  return (
    <>
      <View style={styles.statusBar} />
      <ScrollView style={styles.wrapper}>
        <View style={[styles.header, styles.container]}>
          <Title>
            Hi <Underline color={Colors.lightBlue}>Josephine</Underline>,
          </Title>
          <Text>
            <Strong>Plan</Strong> je week en laat je inspireren door slimme
            voorstellen.
          </Text>
          <Button onPress={() => {}}>Begin met plannen</Button>
        </View>
        <SectionHeading>
          Lekker &amp; <Underline color={Colors.keyLime}>gezond</Underline>
        </SectionHeading>
        <CardWrapper>
          <Card />
          <Card />
          <Card />
          <Card />
        </CardWrapper>
        <SectionHeading>
          Niet veel <Underline color={Colors.keyLime}>tijd?</Underline>
        </SectionHeading>
        <CardWrapper>
          <Card />
          <Card />
          <Card />
          <Card />
        </CardWrapper>
        <SectionHeading>
          Niet veel <Underline color={Colors.keyLime}>tijd?</Underline>
        </SectionHeading>
        <CardWrapper>
          <Card />
          <Card />
          <Card />
          <Card />
        </CardWrapper>
        <View style={styles.tabBar} />
      </ScrollView>
    </>
  );
}

function SectionHeading(props: { children: React.ReactNode }) {
  return (
    <View style={styles.container}>
      <Title>{props.children}</Title>
    </View>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    height: Constants.statusBarHeight + 8,
    backgroundColor: "#E8F5FF",
  },
  tabBar: {
    height: 80
  },
  header: {
    backgroundColor: "#E8F5FF",
    paddingTop: 16,
    paddingRight: "25%",
  },
  wrapper: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.background,
  },
  container: {
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
