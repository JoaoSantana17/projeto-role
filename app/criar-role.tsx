import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CriarRole() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [endereco, setEndereco] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleCriar = async () => {
    if (nome && tipo && endereco) {
      try {
        const rolesSalvos = await AsyncStorage.getItem("roles");
        const roles = rolesSalvos ? JSON.parse(rolesSalvos) : [];

        const novoRole = {
          id: Date.now().toString(),
          nome,
          tipo,
          endereco,
          descricao,
          status: "EM DESLOCAMENTO",
          transporte: "CARRO",
          eta: "15 min",
        };

        await AsyncStorage.setItem("roles", JSON.stringify([...roles, novoRole]));

        alert("Rolê criado com sucesso!");
        router.push("./home");
      } catch (error) {
        console.log(error);
        alert("Erro ao salvar o rolê!");
      }
    } else {
      alert("Preencha os campos obrigatórios!");
    }
  };

  return (
    <ScrollView style={styles.container}>
     
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Criar Rolê</Text>
        <View style={{ width: 24 }} /> 
      </View>

     
      <View style={styles.inputContainer}>
        <Feather name="edit-3" size={20} color="#d909a4" />
        <TextInput
          style={styles.input}
          placeholder="Nome do rolê"
          placeholderTextColor="#aaa"
          value={nome}
          onChangeText={setNome}
        />
      </View>

      <View style={styles.inputContainer}>
        <Feather name="tag" size={20} color="#d909a4" />
        <TextInput
          style={styles.input}
          placeholder="Tipo de evento (Festa, Show...)"
          placeholderTextColor="#aaa"
          value={tipo}
          onChangeText={setTipo}
        />
      </View>

      <View style={styles.inputContainer}>
        <Feather name="map-pin" size={20} color="#d909a4" />
        <TextInput
          style={styles.input}
          placeholder="Endereço"
          placeholderTextColor="#aaa"
          value={endereco}
          onChangeText={setEndereco}
        />
      </View>

      <View style={styles.inputContainer}>
        <Feather name="file-text" size={20} color="#d909a4" />
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Descrição (opcional)"
          placeholderTextColor="#aaa"
          value={descricao}
          onChangeText={setDescricao}
          multiline
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCriar}>
        <Text style={styles.buttonText}>Criar Rolê</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#210b34",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff1",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    color: "#fff",
  },
  button: {
    backgroundColor: "#d909a4",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
