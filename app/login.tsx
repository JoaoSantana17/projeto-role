import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import InputField from './components/InputField';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (email && senha) {
      await AsyncStorage.setItem('userEmail', email);
      router.replace('./home');
    } else {
      alert('Preencha todos os campos!');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <Text style={styles.title}>Login</Text>

      <InputField label="E-mail" placeholder="Seu e-mail" value={email} onChangeText={setEmail} />
      <InputField label="Senha" placeholder="Sua senha" value={senha} onChangeText={setSenha} secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Ainda não tem uma conta?</Text>
        <TouchableOpacity onPress={() => router.push('./cadastro')}>
          <Text style={styles.registerLink}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0b0014',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f72585',
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#f72585',
    paddingVertical: 14,
    borderRadius: 24,
    marginTop: 12,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  registerText: {
    color: '#fff',
    marginRight: 4,
    fontSize: 14,
  },
  registerLink: {
    color: '#f72585',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
});