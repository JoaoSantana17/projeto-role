import { Feather, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Perfil() {
  const router = useRouter();

  
  const [nome, setNome] = useState("João Vitor");
  const [username, setUsername] = useState("@usuario.role");
  const [email, setEmail] = useState("joao@email.com");
  const [telefone, setTelefone] = useState("(11) 99999-9999");

  
  useEffect(() => {
    const carregarDados = async () => {
      const nomeSalvo = await AsyncStorage.getItem("userNome");
      const usernameSalvo = await AsyncStorage.getItem("userUsername");
      const emailSalvo = await AsyncStorage.getItem("userEmail");
      const telefoneSalvo = await AsyncStorage.getItem("userTelefone");

      if (nomeSalvo) setNome(nomeSalvo);
      if (usernameSalvo) setUsername(usernameSalvo);
      if (emailSalvo) setEmail(emailSalvo);
      if (telefoneSalvo) setTelefone(telefoneSalvo);
    };

    carregarDados();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center", paddingBottom: 40 }}
    >
      <View style={styles.avatarContainer}>
        <Image source={require("../assets/profile-placeholder.png")} style={styles.avatar} />
      </View>

      <Text style={styles.name}>{nome}</Text>
      <Text style={styles.username}>{username}</Text>

      
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Feather name="mail" size={20} color="#d909a4" />
          <Text style={styles.infoText}>{email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Feather name="phone" size={20} color="#d909a4" />
          <Text style={styles.infoText}>{telefone}</Text>
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
  container: {
    flex: 1,
    backgroundColor: "#210b34",
    paddingTop: 40,
  },
  avatarContainer: {
    backgroundColor: "#d909a4",
    padding: 4,
    borderRadius: 100,
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  username: {
    color: "#fff6",
    fontSize: 16,
    marginBottom: 24,
  },
  infoCard: {
    width: "90%",
    backgroundColor: "#fff1",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoText: {
    color: "#fff",
    marginLeft: 12,
    fontSize: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d909a4",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
});
