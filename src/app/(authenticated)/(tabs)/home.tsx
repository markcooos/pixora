import { Ionicons } from "@expo/vector-icons";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../constants/colors";
import { Fonts } from "../../../constants/fonts";

const POSTS = [
  {
    id: "1",
    username: "maria_beats",
    avatar: "https://i.pravatar.cc/150?img=47",
    text: "On repeat all day. This playlist is everything 🎧",
    image: "https://picsum.photos/seed/music1/800/800",
    likes: 128,
  },
  {
    id: "2",
    username: "djjuan",
    avatar: "https://i.pravatar.cc/150?img=12",
    text: "Friday night set is ready. Who is coming?",
    image: "https://picsum.photos/seed/music2/800/800",
    likes: 342,
  },
  {
    id: "3",
    username: "lea.sings",
    avatar: "https://i.pravatar.cc/150?img=32",
    text: "Finished recording my first cover today!",
    image: "https://picsum.photos/seed/music3/800/800",
    likes: 97,
  },
  {
    id: "4",
    username: "rock_ryan",
    avatar: "https://i.pravatar.cc/150?img=15",
    text: "Vinyl collection is growing 🔥",
    image: "https://picsum.photos/seed/music4/800/800",
    likes: 215,
  },
  {
    id: "5",
    username: "anna_acoustic",
    avatar: "https://i.pravatar.cc/150?img=44",
    text: "Sunset and a guitar. Perfect combo.",
    image: "https://picsum.photos/seed/music5/800/800",
    likes: 410,
  },
];

const STORIES = POSTS.map((p) => ({
  id: p.id,
  username: p.username,
  avatar: p.avatar,
}));

type Post = (typeof POSTS)[number];

function Stories() {
  return (
    <View style={styles.stories}>
      <FlatList
        horizontal
        data={STORIES}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 8 }}
        renderItem={({ item }) => (
          <View style={styles.story}>
            <View style={styles.storyRing}>
              <Image source={{ uri: item.avatar }} style={styles.storyAvatar} />
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
        <Image source={{ uri: post.avatar }} style={styles.avatar} />
        <Text style={styles.username}>{post.username}</Text>
        <Ionicons name="ellipsis-horizontal" size={20} color={Colors.text} />
      </View>

      <Image source={{ uri: post.image }} style={styles.postImage} />

      <View style={styles.actions}>
        <View style={styles.actionsLeft}>
          <Ionicons name="heart-outline" size={28} color={Colors.text} />
          <Ionicons name="chatbubble-outline" size={26} color={Colors.text} />
          <Ionicons name="paper-plane-outline" size={26} color={Colors.text} />
        </View>
        <Ionicons name="bookmark-outline" size={26} color={Colors.text} />
      </View>

      <Text style={styles.likes}>{post.likes} likes</Text>
      <Text style={styles.caption}>
        <Text style={styles.username}>{post.username} </Text>
        {post.text}
      </Text>
    </View>
  );
}

export default function Home() {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.topBar}>
        <Text style={styles.logo}>Pixora</Text>
        <View style={styles.topIcons}>
          <Ionicons name="heart-outline" size={26} color={Colors.text} />
          <Ionicons name="paper-plane-outline" size={25} color={Colors.text} />
        </View>
      </View>

      <FlatList
        data={POSTS}
        ListHeaderComponent={Stories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
        showsVerticalScrollIndicator={false}
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
    paddingVertical: 8,
  },
  logo: {
    color: Colors.text,
    fontFamily: Fonts.logo,
    fontSize: 34,
  },
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

  post: { marginTop: 12, marginBottom: 6 },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingBottom: 10,
  },
  avatar: { width: 34, height: 34, borderRadius: 17, marginRight: 10 },
  username: { color: Colors.text, fontWeight: "700", flex: 1 },
  postImage: { width: "100%", aspectRatio: 1 },
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
    marginTop: 4,
    lineHeight: 20,
  },
});
