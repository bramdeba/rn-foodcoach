import * as React from "react";
import { Share, StyleSheet, View, ScrollView } from "react-native";
import Image from "react-native-scalable-image";
import Constants from "expo-constants";
import Toast from "react-native-root-toast";
import { useEffect, useState } from "react";
import { Skeleton } from "@motify/skeleton";

import Colors from "../constants/Colors";
import { Title, Text, Strong } from "../components/Text";
import { IconButton } from "../components/IconButton";
import { RootStackScreenProps } from "../types";
import { fetchPost, Post } from "../utils/airtable";
import Layout from "../constants/Layout";

export default function PostScreen({
  navigation,
  route,
}: RootStackScreenProps<"Post">) {
  const [postId, setPostId] = useState<string | undefined>(route.params.postId);
  const [post, setPost] = useState<Post | undefined>();

  const handleShare = async () => {
    try {
      await Share.share({
        title: post?.fields.Title,
        message: post?.fields.Permalink || post?.fields.Content,
        url: post?.fields.Permalink || "https://www.bothrs.com/",
      });
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (postId) fetchPost(postId).then((post) => setPost(post));
  }, []);

  return (
    <>
      <View style={styles.wrapper}>
        <ScrollView>
          <View style={{ height: Constants.statusBarHeight }} />
          <Image
            source={require("../assets/images/veggies/post.png")}
            width={Layout.window.width}
            resizeMode={"contain"}
            style={{ position: "absolute", top: 0, left: 0, right: 0 }}
          />
          <View style={styles.container}>
            <IconButton
              name="arrow-upward-outline"
              style={styles.backIcon}
              onPress={() => navigation.goBack()}
            />
            <IconButton
              name="share-outline"
              borderRadius={12}
              style={[styles.shareIcon, styles.iconShadow]}
              onPress={handleShare}
            />
            <Skeleton
              show={!post}
              colors={[Colors.skeletonLight, Colors.skeletonDark]}
            >
              <Title style={{ maxWidth: "95%" }} size={30}>
                {post?.fields.Title}
              </Title>
            </Skeleton>
            {!post && <BodySkeleton />}
            {post && (
              <>
                {post?.fields.Content.split("\n\n").map((p, i) => (
                  <Text key={i} style={styles.p}>
                    {p}
                  </Text>
                ))}
              </>
            )}
            {post && (
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
                <Strong>{post?.fields.CTA}</Strong>
              </IconButton>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
}

function BodySkeleton() {
  return (
    <View style={{ paddingVertical: 24 }}>
      <Skeleton
        width={"100%"}
        height={28}
        colors={[Colors.skeletonLight, Colors.skeletonDark]}
      />
      <View style={{ height: 8 }} />
      <Skeleton
        width={"100%"}
        height={28}
        colors={[Colors.skeletonLight, Colors.skeletonDark]}
      />
      <View style={{ height: 8 }} />
      <Skeleton
        width={"100%"}
        height={28}
        colors={[Colors.skeletonLight, Colors.skeletonDark]}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.lightGreen,
  },
  container: {
    padding: 32,
    paddingTop: "65%",
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
  },
  iconShadow: {
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: Colors.darkBlue,
    shadowOpacity: 0.20,
    elevation: 20,
  },
});
