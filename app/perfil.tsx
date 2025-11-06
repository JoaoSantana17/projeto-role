import { Feather, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Perfil() {
  const router = useRouter();

  const [nome, setNome] = useState<string>("Carregando...");
  const [username, setUsername] = useState<string>("@usuario.role");
  const [email, setEmail] = useState<string>("");

  const carregar = useCallback(async () => {
    const nomeSalvo = (await AsyncStorage.getItem("userNome")) ?? "";
    const usernameSalvo = (await AsyncStorage.getItem("userUsername")) ?? "";
    const emailSalvo = (await AsyncStorage.getItem("userEmail")) ?? "";

    setNome(nomeSalvo || "Usuário");
    setUsername(usernameSalvo || "@usuario.role");
    setEmail(emailSalvo || "");
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [carregar])
  );

  const iniciais = useMemo(() => {
    const parts = (nome || "").trim().split(" ").filter(Boolean);
    if (!parts.length) return "U";
    const a = parts[0]?.[0] ?? "";
    const b = parts[parts.length - 1]?.[0] ?? "";
    return (a + (b || "")).toUpperCase();
  }, [nome]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center", paddingBottom: 40 }}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarInitials}>{iniciais}</Text>
        </View>
      </View>

      <Text style={styles.name}>{nome}</Text>
      <Text style={styles.username}>{username}</Text>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Feather name="mail" size={20} color="#d909a4" />
          <Text style={styles.infoText}>{email || "sem e-mail"}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.actionButton} onPress={() => router.push("./editar-perfil")}>
        <Feather name="edit" size={20} color="#fff" />
        <Text style={styles.actionText}>Editar Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: "#fff", borderWidth: 1, borderColor: "#d909a4" }]}
        onPress={() => router.push("./home")}
      >
        <MaterialIcons name="logout" size={20} color="#d909a4" />
        <Text style={[styles.actionText, { color: "#d909a4" }]}>Sair</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#210b34", paddingTop: 40 },

  avatarContainer: { backgroundColor: "#d909a4", padding: 4, borderRadius: 100, marginBottom: 16 },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#2a0d4f",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#d909a4",
  },
  avatarInitials: { color: "#fff", fontSize: 40, fontWeight: "800" },

  name: { color: "#fff", fontSize: 24, fontWeight: "bold", marginTop: 8 },
  username: { color: "#fff6", fontSize: 16, marginBottom: 24 },

  infoCard: {
    width: "90%",
    backgroundColor: "#fff1",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  infoText: { color: "#fff", marginLeft: 12, fontSize: 16 },

  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d909a4",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  actionText: { color: "#fff", fontWeight: "bold", fontSize: 16, marginLeft: 8 },
});
