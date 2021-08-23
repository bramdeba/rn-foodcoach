import React from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableNativeFeedback,
  Image
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { darken } from "polished";
import { GestureResponderEvent } from "react-native";
import { Icon } from "@ui-kitten/components";

import Colors from "../constants/Colors";
import { Strong, Text, Title } from "./Text";
import { Badge } from "./Badge";
import { IconButton } from "./IconButton";
import { Recipe } from "../utils/airtable";

export const Card = function (props: {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  onAddToList?: ((event: GestureResponderEvent) => void) | undefined;
  recipe: Recipe;
}) {
  const { onPress, onAddToList, recipe } = props;

  const card = (
    <View style={{ padding: 16 }}>
      <View>
        <Image
          width={Dimensions.get("window").width * 0.7 - 32}
          source={{ uri: recipe.fields.Image[0]?.thumbnails.large.url }}
          style={styles.image}
        />
        <IconButton name="plus" style={styles.addIcon} onPress={onAddToList} />
        <IconButton
          name="clock-outline"
          size={11}
          padding={6}
          backgroundOpacity={0.88}
          borderRadius={4}
          style={styles.time}
        >
          {recipe.fields.Duration / 60} min
        </IconButton>
      </View>
      <Badge color={[Colors.lightBlue, Colors.red][Math.round(Math.random())]}>
        {recipe.fields.Tags[0]}
      </Badge>
      <Text style={styles.title}>{recipe.fields.Name}</Text>
    </View>
  );
  return (
    <>
      {onPress ? (
        <View style={[styles.card, styles.cardShadow]}>
          <TouchableNativeFeedback
            onPress={onPress}
            background={TouchableNativeFeedback.Ripple(
              darken(0.1, Colors.background),
              false
            )}
          >
            {card}
          </TouchableNativeFeedback>
        </View>
      ) : (
        <View style={[styles.card, styles.cardShadow]}>{card}</View>
      )}
    </>
  );
};

export const CardWrapper = function (props: { children: React.ReactNode }) {
  return (
    <View style={styles.cardWrapper}>
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

export const TeaserCard = function (props: {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  children?: React.ReactNode | undefined;
  backgroundColor?: string | undefined;
  cta: string | undefined;
}) {
  const { onPress, children, backgroundColor = Colors.keyLime, cta } = props;

  const card = (
    <View style={{ paddingVertical: 32, paddingHorizontal: 36 }}>
      <Title>{children}</Title>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}
      >
        <Strong>{cta}</Strong>
        <Icon
          fill={Colors.text}
          name="arrow-forward-outline"
          style={{ width: 24, height: 24, marginLeft: 8 }}
        />
      </View>
    </View>
  );
  return (
    <>
      {onPress ? (
        <View style={[styles.teaserCard, { backgroundColor }]}>
          <TouchableNativeFeedback
            onPress={onPress}
            background={TouchableNativeFeedback.Ripple(
              darken(0.1, backgroundColor),
              false
            )}
          >
            {card}
          </TouchableNativeFeedback>
        </View>
      ) : (
        <View style={[styles.teaserCard, { backgroundColor }]}>{card}</View>
      )}
    </>
  );
};

export const ActionCard = function (props: {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  children?: React.ReactNode | undefined;
}) {
  const { onPress, children } = props;

  const card = (
    <View style={{ padding: 28 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <IconButton
          size={20}
          padding={14}
          borderRadius={34}
          style={styles.iconShadow}
          name="clipboard-outline"
        />
        <Title color={Colors.text} style={{ flex: 1, paddingHorizontal: 24 }}>
          {children}
        </Title>
        <Icon
          fill={Colors.text}
          name="arrow-forward-outline"
          style={{ width: 24, height: 24, paddingHorizontal: 8 }}
        />
      </View>
    </View>
  );
  return (
    <>
      {onPress ? (
        <View style={[styles.actionCard, styles.cardShadow]}>
          <TouchableNativeFeedback
            onPress={onPress}
            background={TouchableNativeFeedback.Ripple(
              darken(0.1, Colors.background),
              false
            )}
            style={{ padding: 16 }}
          >
            {card}
          </TouchableNativeFeedback>
        </View>
      ) : (
        <View style={[styles.actionCard, styles.cardShadow]}>{card}</View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    backgroundColor: Colors.background,
    marginLeft: 16,
    borderRadius: 20,
    width: Dimensions.get("window").width * 0.7,
  },
  teaserCard: {
    overflow: "hidden",
    marginTop: 32,
    marginLeft: 32,
    marginBottom: 16,
    borderRadius: 20,
    width: Dimensions.get("window").width - 64,
  },
  actionCard: {
    overflow: "hidden",
    backgroundColor: Colors.background,
    marginTop: 32,
    marginLeft: 32,
    marginBottom: 16,
    borderRadius: 20,
    width: Dimensions.get("window").width - 64,
  },
  cardShadow: {
    shadowRadius: 44,
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowColor: Colors.darkBlue,
    shadowOpacity: 0.13,
    elevation: 20,
  },
  iconShadow: {
    shadowRadius: 44,
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowColor: Colors.darkBlue,
    shadowOpacity: 0.13,
    elevation: 5,
  },
  image: {
    borderRadius: 10,
    aspectRatio: 3/2
  },
  title: {
    fontFamily: "Manrope_700Bold",
    marginTop: 8,
    marginBottom: 16,
  },
  addIcon: {
    position: "absolute",
    right: 10,
    bottom: 10,
    borderRadius: 12,
    overflow: "hidden",
  },
  time: {
    position: "absolute",
    left: 10,
    top: 10,
  },
  cardWrapper: {
    marginTop: -72,
    marginBottom: -24,
    marginLeft: -8,
  },
});
