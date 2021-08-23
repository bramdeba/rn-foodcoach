import * as React from "react";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import Toast from "react-native-root-toast";
import { useEffect, useState } from "react";
import { Skeleton } from "@motify/skeleton";

import Colors from "../constants/Colors";
import { Title, Text, Strong } from "../components/Text";
import { IconButton } from "../components/IconButton";
import { RootStackScreenProps } from "../types";
import { fetchPost, Post } from "../utils/airtable";

export default function PostScreen({
  navigation,
  route,
}: RootStackScreenProps<"Post">) {
  const [postId, setPostId] = useState<string | undefined>(route.params.postId);
  const [post, setPost] = useState<Post | undefined>();
  useEffect(() => {
    if (postId) fetchPost(postId).then((post) => setPost(post));
  }, []);

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
          <Skeleton
            show={!post}
            colors={[Colors.skeletonLight, Colors.skeletonDark]}
          >
            <Title size={30}>{post?.fields.Title}</Title>
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
          {post && <IconButton
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
          </IconButton>}
        </View>
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
