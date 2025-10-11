import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import InputField from "./components/InputField";

export default function Cadastro() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleCadastro = () => {
    if (nome && email && senha) {
      alert("Cadastro realizado!");
      router.push("./login");
    } else {
      alert("Preencha todos os campos!");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      <InputField label="Nome" value={nome} onChangeText={setNome} placeholder="Seu nome" />
      <InputField label="E-mail" value={email} onChangeText={setEmail} placeholder="Seu e-mail" />
      <InputField label="Senha" value={senha} onChangeText={setSenha} placeholder="Sua senha" secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Já tem uma conta?</Text>
        <TouchableOpacity onPress={() => router.push("./login")}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1,
    backgroundColor: "#0b0014",
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#f72585",
    marginBottom: 24,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#f72585",
    paddingVertical: 14,
    borderRadius: 24,
    marginTop: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  loginContainer: { flexDirection: "row", justifyContent: "center", marginTop: 16 },
  loginText: { color: "#fff", marginRight: 4 },
  loginLink: { color: "#f72585", fontWeight: "bold", textDecorationLine: "underline" },
});