import { Ionicons } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../constants/colors";
import { Fonts } from "../../../constants/fonts";

type Post = {
  id: string;
  username: string;
  avatar: ImageSourcePropType;
  image: ImageSourcePropType;
  text: string;
  likes: number;
  time: string;
};

const POSTS = [
  {
    id: "1",
    username: "zirayli_dior",
    avatar: require("../../../../assets/images/friend_2.jpg"),
    text: "On repeat all day. This playlist is everything 🎧",
    image: require("../../../../assets/images/post_1.jpg"),
    likes: 128,
    time: "12 HOURS AGO",
  },
  {
    id: "2",
    username: "keialyn.ari",
    avatar: require("../../../../assets/images/friend_1.jpg"),
    text: "Friday night set is ready. Who is coming?",
    image: require("../../../../assets/images/post_2.jpg"),
    likes: 342,
    time: "5 HOURS AGO",
  },
  {
    id: "3",
    username: "chiennalips",
    avatar: require("../../../../assets/images/friend_3.jpg"),
    text: "Finished recording my first cover today!",
    image: require("../../../../assets/images/post_3.jpg"),
    likes: 97,
    time: "2 HOURS AGO",
  },
  {
    id: "4",
    username: "hormozi",
    avatar: require("../../../../assets/images/friend_4.jpg"),
    text: "Vinyl collection is growing 🔥",
    image: require("../../../../assets/images/post_4.jpg"),
    likes: 215,
    time: "7 HOURS AGO",
  },
  {
    id: "5",
    username: "annecurtissmith",
    avatar: require("../../../../assets/images/friend_5.jpg"),
    text: "Sunset and a guitar. Perfect combo.",
    image: require("../../../../assets/images/post_5.jpg"),
    likes: 410,
    time: "1 DAY AGO",
  },
];
// Gets the real width/height of a local image and keeps it within
// Instagram's allowed range (landscape 1.91 to portrait 0.8).
function getRatio(source: ImageSourcePropType) {
  const asset = Image.resolveAssetSource(source as any);
  if (!asset || !asset.width || !asset.height) return 4 / 5;
  const ratio = asset.width / asset.height;
  return Math.min(Math.max(ratio, 0.8), 1.91);
}

function Stories() {
  return (
    <View style={styles.stories}>
      <FlatList
        horizontal
        data={POSTS}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 8 }}
        renderItem={({ item }) => (
          <View style={styles.story}>
            <View style={styles.storyRing}>
              <Image source={item.avatar} style={styles.storyAvatar} />
            </View>
            <Text style={styles.storyName} numberOfLines={1}>
              {item.username}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <View style={styles.post}>
      <View style={styles.postHeader}>
        <View style={styles.smallRing}>
          <Image source={post.avatar} style={styles.avatar} />
        </View>
        <Text style={styles.username}>{post.username}</Text>
        <Ionicons name="ellipsis-horizontal" size={20} color={Colors.text} />
      </View>

      {/* Instagram's portrait ratio: full width, 4:5 height */}
      <Image
        source={post.image}
        style={[styles.postImage, { aspectRatio: getRatio(post.image) }]}
        resizeMode="cover"
      />

      <View style={styles.actions}>
        <View style={styles.actionsLeft}>
          <Ionicons name="heart-outline" size={28} color={Colors.text} />
          <Ionicons name="chatbubble-outline" size={25} color={Colors.text} />
          <Ionicons name="paper-plane-outline" size={25} color={Colors.text} />
        </View>
        <Ionicons name="bookmark-outline" size={26} color={Colors.text} />
      </View>

      <Text style={styles.likes}>{post.likes} likes</Text>
      <Text style={styles.caption}>
        <Text style={styles.captionName}>{post.username} </Text>
        {post.text}
      </Text>
      <Text style={styles.comments}>View all comments</Text>
      <Text style={styles.time}>{post.time}</Text>
    </View>
  );
}

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);

  // Design only: just shows the pull-to-refresh spinner for a moment.
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* Fixed top bar */}
      <View style={styles.topBar}>
        <Text style={styles.logo}>Pixora</Text>
        <View style={styles.topIcons}>
          <Ionicons name="heart-outline" size={26} color={Colors.text} />
          <Ionicons name="paper-plane-outline" size={25} color={Colors.text} />
        </View>
      </View>

      {/* Free scrolling feed: stories scroll away with the posts */}
      <FlatList
        data={POSTS}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={Stories}
        renderItem={({ item }) => <PostCard post={item} />}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        initialNumToRender={3}
        windowSize={5}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  logo: { color: Colors.text, fontFamily: Fonts.logo, fontSize: 34 },
  topIcons: { flexDirection: "row", gap: 18 },

  stories: {
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
  story: { alignItems: "center", width: 78 },
  storyRing: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2.5,
    borderColor: Colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  storyAvatar: { width: 58, height: 58, borderRadius: 29 },
  storyName: { color: Colors.text, fontSize: 12, marginTop: 4 },

  post: { marginBottom: 14 },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  smallRing: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: Colors.accent,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  avatar: { width: 31, height: 31, borderRadius: 16 },
  username: { color: Colors.text, fontWeight: "700", flex: 1 },

  postImage: { width: "100%" },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  actionsLeft: { flexDirection: "row", gap: 16 },
  likes: {
    color: Colors.text,
    fontWeight: "700",
    paddingHorizontal: 12,
    marginTop: 8,
  },
  caption: {
    color: Colors.text,
    paddingHorizontal: 12,
    marginTop: 3,
    lineHeight: 19,
  },
  captionName: { fontWeight: "700" },
  comments: {
    color: Colors.textMuted,
    paddingHorizontal: 12,
    marginTop: 4,
  },
  time: {
    color: Colors.textMuted,
    fontSize: 11,
    paddingHorizontal: 12,
    marginTop: 4,
  },
});
