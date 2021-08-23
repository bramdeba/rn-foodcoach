import * as React from "react";
import { useEffect, useState } from "react";
import { RefreshControl, StyleSheet, View, ScrollView } from "react-native";
import Constants from "expo-constants";
import Toast from "react-native-root-toast";

import { RootTabScreenProps } from "../types";
import Colors from "../constants/Colors";
import { Title, Text, Strong, Underline } from "../components/Text";
import { Button } from "../components/Button";
import {
  ActionCard,
  Card,
  CardWrapper,
  SkeletonCard,
  TeaserCard,
} from "../components/Card";
import { fetchRandomPost, fetchRecipes, Post, Recipe } from "../utils/airtable";

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  const [refreshing, setRefreshing] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [post, setPost] = useState<Post>();

  const onRefresh = React.useCallback(() => {
    setRecipes([]);
    setPost(undefined);
  }, []);

  useEffect(() => {
    if (!recipes.length) {
      fetchRecipes(5).then((recipes) => setRecipes(recipes));
    }

    if (!post) {
      fetchRandomPost().then((post) => setPost(post));
    }

    if (recipes.length && post) {
      setRefreshing(false);
    }
  }, [recipes, post, refreshing]);

  const recipeCards =
    recipes.length > 0 ? (
      recipes
        .sort(
          (a, b) =>
            new Date(b.createdTime).getTime() -
            new Date(a.createdTime).getTime()
        )
        .map((recipe) => (
          <Card
            key={recipe.id}
            recipe={recipe}
            onPress={() => Toast.show("Card pressed")}
            onAddToList={() => Toast.show("Card added to list")}
          />
        ))
    ) : (
      <>
        <SkeletonCard />
        <SkeletonCard />
      </>
    );

  return (
    <>
      <View style={styles.statusBar} />
      <ScrollView
        style={styles.wrapper}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
          {recipeCards}
        </CardWrapper>
        <TeaserCard
          backgroundColor={Colors.lightGreen}
          onPress={() => navigation.navigate("Post", { postId: post?.id })}
          cta={post?.fields.CTA}
        >
          {post?.fields.Title}
        </TeaserCard>
        <SectionHeading>
          Niet veel <Underline lineColor={Colors.keyLime}>tijd?</Underline>
        </SectionHeading>
        <CardWrapper>
          {recipeCards}
        </CardWrapper>
        <ActionCard onPress={() => Toast.show("Go to recipe list")}>
          Eigen recepten toevoegen
        </ActionCard>
        <SectionHeading>
          Niet veel <Underline lineColor={Colors.keyLime}>tijd?</Underline>
        </SectionHeading>
        <CardWrapper>
          {recipeCards}
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
