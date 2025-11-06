import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import InputField from "../components/InputField";

export default function EditarPerfil() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [username, setUsername] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const nomeSalvo = (await AsyncStorage.getItem("userNome")) ?? "";
        const usernameSalvo = (await AsyncStorage.getItem("userUsername")) ?? "";
        setNome(nomeSalvo);
        setUsername(usernameSalvo || "@usuario.role");
      } finally {
        setCarregando(false);
      }
    })();
  }, []);

  const handleSalvar = async () => {
    const nomeOk = nome.trim();
    let usernameOk = username.trim();

    if (!nomeOk) {
      Alert.alert("Atenção", "O nome é obrigatório.");
      return;
    }

    if (usernameOk && !usernameOk.startsWith("@")) {
      usernameOk = `@${usernameOk}`;
    }
    if (!usernameOk) {
      const slug = nomeOk
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/[^a-z0-9]+/g, "")
        .slice(0, 18);
      usernameOk = `@${slug || "usuario"}`;
    }

    try {
      setSalvando(true);
      await AsyncStorage.setItem("userNome", nomeOk);
      await AsyncStorage.setItem("userUsername", usernameOk);
      Alert.alert("Sucesso", "Perfil atualizado!");
      router.back();
    } catch (e) {
      Alert.alert("Erro", "Não foi possível salvar. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center", paddingBottom: 40 }}>
      <View style={styles.avatarContainer}>
        <Image source={require("../assets/profile-placeholder.png")} style={styles.avatar} />
        <TouchableOpacity style={styles.editAvatarButton} disabled>
          <Feather name="camera" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {carregando ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <>
          <InputField label="Nome" value={nome} onChangeText={setNome} placeholder="Seu nome" />
          <InputField label="Username" value={username} onChangeText={setUsername} placeholder="@usuario" />

          <TouchableOpacity
            style={[styles.saveButton, (salvando || !nome.trim()) && { opacity: 0.7 }]}
            onPress={handleSalvar}
            disabled={salvando || !nome.trim()}
          >
            {salvando ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveButtonText}>Salvar Alterações</Text>}
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#210b34", paddingTop: 40, paddingHorizontal: 20 },
  avatarContainer: { position: "relative", marginBottom: 24 },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    borderWidth: 3,
    borderColor: "#d909a4",
  },
  editAvatarButton: { position: "absolute", bottom: 0, right: 0, backgroundColor: "#d909a4", padding: 8, borderRadius: 20 },

  saveButton: {
    marginTop: 24,
    backgroundColor: "#d909a4",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: "center",
  },
  saveButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
