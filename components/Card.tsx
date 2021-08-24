import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Pressable,
  Platform,
} from "react-native";
import Layout from "./../constants/Layout";
import ScalableImage from "react-native-scalable-image";
import { ScrollView } from "react-native-gesture-handler";
import { darken, transparentize } from "polished";
import { GestureResponderEvent } from "react-native";
import { Icon } from "@ui-kitten/components";

import Colors from "../constants/Colors";
import { Strong, Text, Title } from "./Text";
import { Badge } from "./Badge";
import { IconButton } from "./IconButton";
import { Recipe } from "../utils/airtable";
import { Skeleton } from "@motify/skeleton";

export const Card = function (props: {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  onAddToList?: ((event: GestureResponderEvent) => void) | undefined;
  recipe: Recipe;
}) {
  const { onPress, onAddToList, recipe } = props;

  const card = (
    <View style={{ padding: Layout.card.padding }}>
      <View>
        <Image
          width={Layout.window.width * 0.7 - Layout.card.padding * 2}
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
          <View style={[styles.hideOverflow]}>
            <Pressable
              onPress={onPress}
              android_ripple={{
                color: darken(0.1, Colors.background),
                borderless: false,
              }}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed && Platform.OS === 'ios'
                  ? transparentize(0.7, darken(0.1, Colors.background))
                  : undefined,
                },
              ]}
            >
              {card}
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={[styles.card, styles.cardShadow]}>
          {" "}
          <View style={[styles.hideOverflow]}>{card}</View>
        </View>
      )}
    </>
  );
};

export const SkeletonCard = function () {
  const card = (
    <View style={{ padding: Layout.card.padding }}>
      <View>
        <Skeleton
          height={
            ((Layout.window.width * 0.7 - Layout.card.padding * 2) / 3) * 2
          }
          width={Layout.window.width * 0.7 - Layout.card.padding * 2}
          colors={[Colors.skeletonLight, Colors.skeletonDark]}
        />
      </View>
      <View style={{ height: 8 }} />
      <Skeleton
        height={24}
        width={100}
        show={true}
        colors={[Colors.skeletonLight, Colors.skeletonDark]}
      />
      <View style={{ height: 13 }} />
      <Skeleton
        show={true}
        colors={[Colors.skeletonLight, Colors.skeletonDark]}
      >
        <Text style={styles.title} />
      </Skeleton>
    </View>
  );
  return (
    <View style={[styles.card, styles.cardShadow]}>
      <View style={[styles.hideOverflow]}>{card}</View>
    </View>
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
  cta: string | undefined;
}) {
  const { onPress, children, backgroundColor = Colors.keyLime, cta } = props;

  const card = (
    <View style={{ paddingVertical: 32, paddingHorizontal: 36 }}>
      <Skeleton
        show={!children}
        colors={[Colors.skeletonLight, Colors.skeletonDark]}
      >
        <Title>{children}</Title>
      </Skeleton>
      {!cta && (
        <>
          <View style={{ height: 16 }} />
          <Skeleton
            width={120}
            height={28}
            colors={[Colors.skeletonLight, Colors.skeletonDark]}
          />
        </>
      )}
      {cta && (
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
      )}
    </View>
  );
  return (
    <>
      {onPress ? (
        <View style={[styles.teaserCard, { backgroundColor }]}>
          <View style={[styles.hideOverflow]}>
            <ScalableImage
              width={Layout.container.width}
              style={styles.teaserImageBackground}
              source={require("./../assets/images/veggies/teaser.png")}
            />
            <Pressable
              onPress={onPress}
              android_ripple={{
                color: darken(0.1, backgroundColor),
                borderless: false,
              }}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed && Platform.OS === 'ios'
                  ? transparentize(0.7, darken(0.1, backgroundColor))
                  : undefined,
                },
              ]}
            >
              <View>{card}</View>
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={[styles.teaserCard, { backgroundColor }]}>
          <View style={[styles.hideOverflow]}>
            <ScalableImage
              style={styles.teaserImageBackground}
              source={require("./../assets/images/veggies/teaser.png")}
            />
            {card}
          </View>
        </View>
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
          <View style={[styles.hideOverflow]}>
            <ScalableImage
              source={require("./../assets/images/veggies/action.png")}
              style={{ position: "absolute", left: 0, top: 0 }}
            />
            <ScalableImage
              source={require("./../assets/images/veggies/action2.png")}
              style={{ position: "absolute", right: 0, bottom: 0 }}
            />
            <Pressable
              onPress={onPress}
              android_ripple={{
                color: darken(0.1, Colors.background),
                borderless: false,
              }}
              style={({ pressed }) => [
                {
                  padding: 16,
                  backgroundColor: pressed && Platform.OS === 'ios'
                    ? transparentize(0.7, darken(0.1, Colors.background))
                    : undefined,
                },
              ]}
            >
              {card}
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={[styles.actionCard, styles.cardShadow]}>
          <View style={[styles.hideOverflow]}>{card}</View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  hideOverflow: {
    overflow: "hidden",
    borderRadius: 20,
  },
  card: {
    borderRadius: 20,
    backgroundColor: Colors.background,
    marginLeft: 16,
    width: Layout.window.width * 0.7,
  },
  teaserCard: {
    borderRadius: 20,
    marginTop: 32,
    marginLeft: 32,
    marginBottom: 16,
    width: Layout.container.width,
  },
  teaserImageBackground: {
    position: "absolute",
    width: "100%",
    left: 0,
    right: 0,
    top: 0,
  },
  actionCard: {
    borderRadius: 20,
    backgroundColor: Colors.background,
    marginTop: 32,
    marginLeft: 32,
    marginBottom: 16,
    width: Layout.container.width,
  },
  cardShadow: {
    shadowColor: Colors.darkBlue,
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowOpacity: 0.13,
    shadowRadius: 22,
    elevation: 20,
  },
  iconShadow: {
    shadowColor: Colors.darkBlue,
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowOpacity: 0.13,
    shadowRadius: 22,
    elevation: 5,
  },
  image: {
    borderRadius: 10,
    aspectRatio: 3 / 2,
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
