import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import InputField from "../components/InputField";

export default function EditarPerfil() {
  const router = useRouter();

 
  const [nome, setNome] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  
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

  const handleSalvar = async () => {
    if (!nome || !username || !email || !telefone) {
      alert("Preencha todos os campos!");
      return;
    }

    await AsyncStorage.setItem("userNome", nome);
    await AsyncStorage.setItem("userUsername", username);
    await AsyncStorage.setItem("userEmail", email);
    await AsyncStorage.setItem("userTelefone", telefone);

    alert("Perfil atualizado com sucesso!");
    router.push("./perfil");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center", paddingBottom: 40 }}
    >
      <View style={styles.avatarContainer}>
        <Image
          source={require("../assets/profile-placeholder.png")}
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.editAvatarButton}>
          <Feather name="camera" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      
      <InputField label="Nome" value={nome} onChangeText={setNome} placeholder="Seu nome" />
      <InputField label="Username" value={username} onChangeText={setUsername} placeholder="@usuario" />
      <InputField label="Email" value={email} onChangeText={setEmail} placeholder="email@email.com" />
      <InputField label="Telefone" value={telefone} onChangeText={setTelefone} placeholder="(00) 00000-0000" />

      <TouchableOpacity style={styles.saveButton} onPress={handleSalvar}>
        <Text style={styles.saveButtonText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#210b34",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    borderWidth: 3,
    borderColor: "#d909a4",
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#d909a4",
    padding: 8,
    borderRadius: 20,
  },
  saveButton: {
    marginTop: 24,
    backgroundColor: "#d909a4",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
