import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  Animated,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSignup } from "../context/SignupContext";

export default function Homepage() {
  const { data, setData } = useSignup(); // 🔥 ใช้ setData เก็บรายได้
  const navigation = useNavigation<any>();

  const [activeTab, setActiveTab] = useState("home");

  const [open, setOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-300)).current;

  const [jobList, setJobList] = useState([
    {
      id: 1,
      name: "อดิศักดิ์ สารบรรณ",
      phone: "090-952-2162",
      price: 200,
      from: "มหาวิทยาลัยมหิดล",
      to: "ศูนย์การแพทย์กาญจนบุรี",
      lat: 13.8196,
      lng: 99.8663,
      status: "pending",
    },
    {
      id: 2,
      name: "อริย์ธัช ซุ่นเด็ก",
      phone: "090-952-2162",
      price: 200,
      from: "มหาวิทยาลัยมหิดล",
      to: "ศูนย์การแพทย์กาญจนบุรี",
      lat: 13.8196,
      lng: 99.8663,
      status: "pending",
    },
  ]);

  const toggleProfile = () => {
    Animated.timing(slideAnim, {
      toValue: open ? -300 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setOpen(!open));
  };

  const acceptJob = (id: number) => {
    setJobList((prev) =>
      prev.map((j) => (j.id === id ? { ...j, status: "accepted" } : j))
    );
  };

  const rejectJob = (id: number) => {
    setJobList((prev) => prev.filter((j) => j.id !== id));
  };

  const startJob = (id: number) => {
    setJobList((prev) =>
      prev.map((j) => (j.id === id ? { ...j, status: "started" } : j))
    );
  };

  const openMap = (lat: number, lng: number) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    Linking.openURL(url);
  };

  const endJob = (id: number) => {
    const job = jobList.find((j) => j.id === id);
    if (!job) return;

    setJobList((prev) => prev.filter((j) => j.id !== id));

    setData((prev: any) => ({
      ...prev,
      totalIncome: (prev.totalIncome || 0) + job.price,
    }));
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={toggleProfile}>
            <Image
              source={{
                uri: data.image || "https://i.pravatar.cc/100",
              }}
              style={styles.avatar}
            />
          </TouchableOpacity>

          <View>
            <Text style={styles.greeting}>
              สวัสดี {data.firstName}!
            </Text>
            <Text style={styles.role}>Caregiver</Text>
          </View>

          <View style={styles.rightSection}>
            <Ionicons name="notifications-outline" size={24} color="#fff" />
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.balance}>
                ฿{data.totalIncome || 0}
              </Text>
              <Text style={styles.subText}>รายได้วันนี้</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          <StatBox number="2" label="ออเดอร์วันนี้" />
          <StatBox number="158" label="ออเดอร์ทั้งหมด" />
          <StatBox number="4.5" label="คะแนนเฉลี่ย" />
        </View>
      </View>

      {/* CONTENT */}
      <ScrollView style={{ padding: 16 }}>
        <Text style={styles.sectionTitle}>งาน</Text>

        {jobList.map((job, index) => (
          <View key={job.id} style={styles.jobCard}>
            <View style={styles.jobHeader}>
              <Text style={styles.jobTitle}>รายการที่ {index + 1}</Text>
              <View style={styles.priceTag}>
                <Text style={{ color: "#fff" }}>฿{job.price}</Text>
              </View>
            </View>

            <View style={styles.userRow}>
              <Ionicons name="person" size={18} color="#555" />
              <View>
                <Text>{job.name}</Text>
                <Text style={styles.subTextGray}>{job.phone}</Text>
              </View>
            </View>

            <View style={styles.locationRow}>
              <View style={styles.fromBox}>
                <Text>จุดรับผู้ป่วย</Text>
                <Text style={styles.bold}>{job.from}</Text>
              </View>

              <View style={styles.toBox}>
                <Text>ปลายทาง</Text>
                <Text style={styles.bold}>{job.to}</Text>
              </View>
            </View>

            {job.status === "pending" && (
              <View style={styles.btnRow}>
                <TouchableOpacity
                  style={styles.acceptBtn}
                  onPress={() => acceptJob(job.id)}
                >
                  <Text style={{ color: "#fff" }}>รับงาน</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.rejectBtn}
                  onPress={() => rejectJob(job.id)}
                >
                  <Text>ปฏิเสธ</Text>
                </TouchableOpacity>
              </View>
            )}

            {job.status === "accepted" && (
              <TouchableOpacity
                style={styles.startBtn}
                onPress={() => startJob(job.id)}
              >
                <Text style={{ color: "#fff" }}>เริ่มงาน</Text>
              </TouchableOpacity>
            )}

            {job.status === "started" && (
              <View style={styles.btnRow}>
                <TouchableOpacity
                  style={styles.mapBtn}
                  onPress={() => openMap(job.lat, job.lng)}
                >
                  <Text style={{ color: "#fff" }}>นำทาง</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.endBtn}
                  onPress={() => endJob(job.id)}
                >
                  <Text style={{ color: "#fff" }}>จบงาน</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* OVERLAY */}
      {open && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={toggleProfile}
          activeOpacity={1}
        />
      )}

      {/* PROFILE PANEL */}
      <Animated.View
        style={[
          styles.profilePanel,
          { transform: [{ translateX: slideAnim }] },
        ]}
      >
        <View style={styles.profileHeader}>
          <Image
            source={{
              uri: data.image || "https://i.pravatar.cc/100",
            }}
            style={styles.profileAvatar}
          />
          <Text style={styles.profileName}>
            {data.firstName} {data.lastName}
          </Text>
          <Text style={styles.profileRole}>Caregiver</Text>
        </View>

        <View style={styles.menu}>
          <Text style={styles.menuItem}>การตั้งค่า</Text>
          <Text style={styles.menuItem}>ศูนย์ช่วยเหลือ</Text>
          <Text style={styles.menuItem}>เวอร์ชั่น</Text>
        </View>

        <TouchableOpacity>
          <Text style={styles.logout}>ออกจากระบบ</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* BOTTOM BAR */}
      <View style={styles.bottomBar}>
        <TabItem
          icon="menu"
          activeTab={activeTab}
          onPress={() => {
            setActiveTab("home");
            navigation.navigate("Homepage");
          }}
        />

        <TabItem
          icon="wallet-outline"
          activeTab={activeTab}
          onPress={() => {
            setActiveTab("wallet");
            navigation.navigate("Money");
          }}
        />

        <TabItem
          icon="time-outline"
          activeTab={activeTab}
          onPress={() => {
            setActiveTab("history");
            navigation.navigate("History");
          }}
        />

        <TabItem
          icon="document-text-outline"
          activeTab={activeTab}
          onPress={() => {
            setActiveTab("doc");
            navigation.navigate("Document");
          }}
        />
      </View>
    </View>
  );
}

/* COMPONENT */
const StatBox = ({ number, label }: any) => (
  <View style={styles.statBox}>
    <Text style={styles.statNumber}>{number}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const TabItem = ({ icon, onPress, activeTab }: any) => {
  const isActive =
    (icon === "menu" && activeTab === "home") ||
    (icon === "wallet-outline" && activeTab === "wallet") ||
    (icon === "time-outline" && activeTab === "history") ||
    (icon === "document-text-outline" && activeTab === "doc");

  const color = isActive ? "#43B7A5" : "#9CA3AF";

  return (
    <TouchableOpacity onPress={onPress} style={styles.tabItem}>
      <Ionicons name={icon} size={28} color={color} />
    </TouchableOpacity>
  );
};

/* STYLE */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },

  header: {
    backgroundColor: "#43B7A5",
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },

  headerTop: { flexDirection: "row", alignItems: "center" },

  rightSection: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },

  greeting: { color: "#fff", fontSize: 16, fontWeight: "600" },
  role: { color: "#D1FAE5", fontSize: 12 },
  balance: { color: "#fff", fontSize: 20, fontWeight: "700" },
  subText: { color: "#D1FAE5", fontSize: 12 },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  statBox: {
    backgroundColor: "#5EC4B6",
    width: "30%",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  statNumber: { color: "#fff", fontSize: 18, fontWeight: "700" },
  statLabel: { color: "#E6FFFA", fontSize: 12 },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },

  jobCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },

  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  jobTitle: { fontWeight: "600" },

  priceTag: {
    backgroundColor: "#43B7A5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },

  userRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
    alignItems: "center",
  },

  subTextGray: { color: "#6B7280", fontSize: 12 },

  locationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  fromBox: {
    borderWidth: 1,
    borderColor: "green",
    padding: 8,
    borderRadius: 8,
    width: "48%",
  },

  toBox: {
    borderWidth: 1,
    borderColor: "red",
    padding: 8,
    borderRadius: 8,
    width: "48%",
  },

  bold: { fontWeight: "600" },

  btnRow: {
    flexDirection: "row",
    gap: 10,
  },

  acceptBtn: {
    flex: 1,
    backgroundColor: "#43B7A5",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  rejectBtn: {
    flex: 1,
    backgroundColor: "#E5E7EB",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  startBtn: {
    backgroundColor: "#3B82F6",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  mapBtn: {
    flex: 1,
    backgroundColor: "#10B981",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  endBtn: {
    flex: 1,
    backgroundColor: "#EF4444",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  profilePanel: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 280,
    backgroundColor: "#fff",
  },

  profileHeader: {
    backgroundColor: "#43B7A5",
    padding: 20,
    alignItems: "center",
    paddingTop: 85,
  },

  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },

  profileName: {
    color: "#fff",
    fontWeight: "600",
  },

  profileRole: {
    color: "#D1FAE5",
    fontSize: 12,
  },

  menu: {
    padding: 20,
  },

  menuItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  logout: {
    color: "#43B7A5",
    textAlign: "center",
    marginTop: 20,
    fontWeight: "600",
  },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 90,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },

  tabItem: {
    flex: 1,
    alignItems: "center",
  },
});