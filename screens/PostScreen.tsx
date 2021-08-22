import * as React from "react";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";

import Colors from "../constants/Colors";
import { Title, Text, Strong } from "../components/Text";
import { IconButton } from "../components/IconButton";
import { RootStackScreenProps } from "../types";
import Toast from "react-native-root-toast";

export default function PostScreen({
  navigation,
}: RootStackScreenProps<"Post">) {
  return (
    <>
      <View style={styles.statusBar} />
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <IconButton
            name="arrow-upward-outline"
            style={styles.backIcon}
            onPress={() => navigation.goBack()}
          />
          <IconButton
            name="share-outline"
            style={styles.shareIcon}
            onPress={() => Toast.show("Sharing post")}
          />
          <Title size={30} style={{ maxWidth: "80%" }}>
            Zijn diepvriesgroenten gezond?
          </Title>
          <Text style={styles.p}>
            Diepvriesgroenten worden na oogst vaak direct ingevroren zodat er
            een minimaal verlies aan mineralen en vitaminen plaatsvindt.
          </Text>
          <Text style={styles.p}>
            Kook je groenten niet te lang. Door groenten te koken verlies je
            doorgaans 20 - 50 % van de vitaminen.
          </Text>
          <IconButton
            name="arrow-forward-outline"
            reverse={true}
            fullWidth={true}
            style={{ marginTop: 16 }}
            size={16}
            padding={16}
            iconTextRatio={1.5}
            onPress={() => Toast.show("Read more")}
          >
            <Strong>Lees meer</Strong>
          </IconButton>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    height: Constants.statusBarHeight + 8,
    backgroundColor: Colors.lightGreen,
  },
  wrapper: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.lightGreen,
  },
  container: {
    padding: 32,
    paddingTop: 128,
  },
  p: {
    marginVertical: 12,
  },
  backIcon: {
    position: "absolute",
    left: 32,
    top: 32,
    borderRadius: 12,
    overflow: "hidden",
  },
  shareIcon: {
    position: "absolute",
    right: 32,
    top: 32,
    borderRadius: 12,
    overflow: "hidden",
  },
});
