import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../constants/colors";

const GRID = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => ({
  id: String(n),
  uri: `https://picsum.photos/seed/grid${n}/400/400`,
}));

export default function Profile() {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.topBar}>
        <Text style={styles.topUsername}>markcooos</Text>
        <Ionicons name="menu" size={28} color={Colors.text} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Avatar + stats */}
        <View style={styles.headerRow}>
          <Image
            source={require("../../../../assets/images/profile.jpg")}
            style={styles.avatar}
          />
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>9</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>1.2M</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>80</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
        </View>

        {/* Name + bio */}
        <View style={styles.bio}>
          <Text style={styles.name}>Mark Lester Baculio</Text>
          <Text style={styles.bioText}>Music lover 🎶 | BSIT | God First </Text>
        </View>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editText}>Edit Profile</Text>
        </TouchableOpacity>

        {/* Personal details */}
        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Ionicons name="mail-outline" size={20} color={Colors.text} />
            <Text style={styles.detailText}>email@example.com</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="call-outline" size={20} color={Colors.text} />
            <Text style={styles.detailText}>+63 912 345 6789</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={20} color={Colors.text} />
            <Text style={styles.detailText}>Opol, Misamis Oriental</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons
              name="musical-notes-outline"
              size={20}
              color={Colors.text}
            />
            <Text style={styles.detailText}>Favorite genre: OPM</Text>
          </View>
        </View>

        {/* Photo grid */}
        <View style={styles.grid}>
          {GRID.map((item) => (
            <Image
              key={item.id}
              source={{ uri: item.uri }}
              style={styles.gridImage}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  topUsername: { color: Colors.text, fontSize: 20, fontWeight: "700" },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 6,
  },
  avatar: { width: 86, height: 86, borderRadius: 43 },
  stats: { flex: 1, flexDirection: "row", justifyContent: "space-around" },
  stat: { alignItems: "center" },
  statNumber: { color: Colors.text, fontSize: 18, fontWeight: "700" },
  statLabel: { color: Colors.text, fontSize: 13 },

  bio: { paddingHorizontal: 16, marginTop: 12 },
  name: { color: Colors.text, fontWeight: "700" },
  bioText: { color: Colors.text, marginTop: 2 },

  editButton: {
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 14,
  },
  editText: { color: Colors.text, fontWeight: "700" },

  details: {
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 4,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
  },
  detailRow: { flexDirection: "row", alignItems: "center", paddingVertical: 8 },
  detailText: { color: Colors.text, marginLeft: 12 },

  grid: { flexDirection: "row", flexWrap: "wrap", marginTop: 12 },
  gridImage: {
    width: "33.333%",
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: "#FFF",
  },
});
