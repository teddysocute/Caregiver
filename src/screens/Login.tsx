import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../navigation/AppNavigator";

/* navigation type */
type LoginNavProp = NativeStackNavigationProp<RootStackParamList, "Login">;

export default function LoginScreen() {
  const navigation = useNavigation<LoginNavProp>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  // ✅ MOCK LOGIN (ไม่มี Firebase แล้ว)
  const handleLogin = () => {
    if (!email || !password) {
      alert("กรุณากรอกอีเมลและรหัสผ่าน");
      return;
    }

    // 🔥 login ปลอม
    alert("เข้าสู่ระบบสำเร็จ 🎉");
    navigation.navigate("Homepage");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>เข้าสู่ระบบ</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>เข้าสู่ระบบบัญชีของคุณ</Text>
        <Text style={styles.subtitle}>ยินดีต้อนรับกลับเข้าสู่ระบบ</Text>

        <Text style={styles.label}>อีเมล</Text>
        <TextInput
          style={styles.input}
          placeholder="โปรดระบุอีเมลของคุณ"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <Text style={styles.label}>รหัสผ่าน</Text>
        <View style={styles.passwordBox}>
          <TextInput
            style={{ flex: 1 }}
            placeholder="โปรดระบุรหัสผ่านของคุณ"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.show}>👁</Text>
          </TouchableOpacity>
        </View>

        {/* Checkbox */}
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setRemember(!remember)}
          >
            <View style={[styles.checkbox, remember && styles.checkboxChecked]}>
              {remember && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.rememberText}>จดจำรหัสผ่าน</Text>
          </TouchableOpacity>

          <Text style={styles.forgot}>ลืมรหัสผ่าน</Text>
        </View>

        {/* LOGIN BUTTON */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>เข้าสู่ระบบ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleButton}>
          <Text>G Sign in with Google</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          หากยังไม่มีบัญชี ?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Signup1")}
          >
            ลงทะเบียน
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },

  header: {
    backgroundColor: "#43B7A5",
    paddingTop: 70,
    paddingBottom: 30,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
  },

  back: { fontSize: 22, marginRight: 12 },

  headerTitle: { fontSize: 25, fontWeight: "600" },

  content: { padding: 24 },

  title: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 25,
  },

  subtitle: {
    fontSize: 20,
    color: "#6B7280",
    textAlign: "center",
    marginVertical: 12,
  },

  label: { marginBottom: 10 },

  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 15,
    marginBottom: 16,
  },

  passwordBox: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 15,
    marginBottom: 16,
  },

  show: { fontSize: 18 },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  checkboxRow: { flexDirection: "row", alignItems: "center" },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#43B7A5",
    borderRadius: 4,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  checkboxChecked: { backgroundColor: "#43B7A5" },

  checkmark: { color: "#FFF", fontSize: 12 },

  rememberText: { color: "#374151" },

  forgot: { color: "#43B7A5" },

  loginButton: {
    backgroundColor: "#43B7A5",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },

  loginText: { color: "#FFF", fontWeight: "600" },

  googleButton: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 16,
  },

  footer: { textAlign: "center", color: "#6B7280" },

  link: { color: "#43B7A5", fontWeight: "600" },
});
