import * as React from "react";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import Toast from "react-native-root-toast";

import { RootTabScreenProps } from "../types";
import Colors from "../constants/Colors";
import { Title, Text, Strong, Underline } from "../components/Text";
import { Button } from "../components/Button";
import { ScrollView } from "react-native-gesture-handler";
import { ActionCard, Card, CardWrapper, TeaserCard } from "../components/Card";

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  return (
    <>
      <View style={styles.statusBar} />
      <ScrollView style={styles.wrapper}>
        <View style={[styles.header, styles.container]}>
          <Title>
            Hi <Underline lineColor={Colors.lightBlue}>Josephine</Underline>,
          </Title>
          <Text>
            <Strong>Plan</Strong> je week en laat je inspireren door slimme
            voorstellen.
          </Text>
          <Button
            style={{ marginTop: 16 }}
            onPress={() => Toast.show("Start planning")}
          >
            Begin met plannen
          </Button>
        </View>
        <SectionHeading>
          Lekker &amp; <Underline lineColor={Colors.keyLime}>gezond</Underline>
        </SectionHeading>
        <CardWrapper>
          <Card
            onPress={() => Toast.show("Card pressed")}
            onAddToList={() => Toast.show("Card added to list")}
          />
          <Card
            onPress={() => Toast.show("Card pressed")}
            onAddToList={() => Toast.show("Card added to list")}
          />
          <Card
            onPress={() => Toast.show("Card pressed")}
            onAddToList={() => Toast.show("Card added to list")}
          />
          <Card
            onPress={() => Toast.show("Card pressed")}
            onAddToList={() => Toast.show("Card added to list")}
          />
        </CardWrapper>
        <TeaserCard
          backgroundColor={Colors.lightGreen}
          onPress={() => navigation.navigate("Post")}
        >
          Zijn diepvriesgroenten gezond?
        </TeaserCard>
        <SectionHeading>
          Niet veel <Underline lineColor={Colors.keyLime}>tijd?</Underline>
        </SectionHeading>
        <CardWrapper>
          <Card
            onPress={() => Toast.show("Card pressed")}
            onAddToList={() => Toast.show("Card added to list")}
          />
          <Card
            onPress={() => Toast.show("Card pressed")}
            onAddToList={() => Toast.show("Card added to list")}
          />
          <Card
            onPress={() => Toast.show("Card pressed")}
            onAddToList={() => Toast.show("Card added to list")}
          />
          <Card
            onPress={() => Toast.show("Card pressed")}
            onAddToList={() => Toast.show("Card added to list")}
          />
        </CardWrapper>
        <ActionCard onPress={() => Toast.show("Go to recipe list")}>
          Eigen recepten toevoegen
        </ActionCard>
        <SectionHeading>
          Niet veel <Underline lineColor={Colors.keyLime}>tijd?</Underline>
        </SectionHeading>
        <CardWrapper>
          <Card
            onPress={() => Toast.show("Card pressed")}
            onAddToList={() => Toast.show("Card added to list")}
          />
          <Card
            onPress={() => Toast.show("Card pressed")}
            onAddToList={() => Toast.show("Card added to list")}
          />
          <Card
            onPress={() => Toast.show("Card pressed")}
            onAddToList={() => Toast.show("Card added to list")}
          />
          <Card
            onPress={() => Toast.show("Card pressed")}
            onAddToList={() => Toast.show("Card added to list")}
          />
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
    height: 88,
  },
  header: {
    backgroundColor: "#E8F5FF",
    paddingTop: 32,
    paddingRight: "20%",
    marginBottom: 16,
  },
  wrapper: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.background,
  },
  container: {
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
