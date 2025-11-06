import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const TRANSPORTES = ['A PÉ', 'CARRO', 'METRÔ', 'ÔNIBUS', 'BICICLETA'];
const STATUS = ['EM DESLOCAMENTO', 'PRESENTE', 'AUSENTE'];

export default function CriarRole() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [endereco, setEndereco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [transporte, setTransporte] = useState<'A PÉ' | 'CARRO' | 'METRÔ' | 'ÔNIBUS' | 'BICICLETA'>('CARRO');
  const [eta, setEta] = useState('15 min');
  const [status, setStatus] = useState<'EM DESLOCAMENTO' | 'PRESENTE' | 'AUSENTE'>('EM DESLOCAMENTO');

  const handleCriar = async () => {
    if (!nome.trim() || !tipo.trim() || !endereco.trim()) {
      alert('Preencha os campos obrigatórios!');
      return;
    }

    try {
      const rolesSalvos = await AsyncStorage.getItem('roles');
      const roles = rolesSalvos ? JSON.parse(rolesSalvos) : [];

      const novoRole = {
        id: Date.now().toString(),
        nome: nome.trim(),
        tipo: tipo.trim(),
        endereco: endereco.trim(),
        descricao: descricao.trim(),
        status,
        transporte,
        eta: eta.trim(),
        started: false,
        finished: false,
      };

      await AsyncStorage.setItem('roles', JSON.stringify([novoRole, ...roles]));

      alert('Rolê criado com sucesso!');
      router.push('./home');
    } catch (error) {
      console.log(error);
      alert('Erro ao salvar o rolê!');
    }
  };

  const renderChips = (items: string[], current: string, onChange: (v: any) => void) => (
    <View style={styles.chipsRow}>
      {items.map((it) => {
        const active = it === current;
        return (
          <TouchableOpacity
            key={it}
            style={[styles.chip, active && styles.chipActive]}
            onPress={() => onChange(it as any)}
          >
            <Text style={[styles.chipText, active && styles.chipTextActive]}>{it}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

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
          placeholder="Nome do rolê *"
          placeholderTextColor="#aaa"
          value={nome}
          onChangeText={setNome}
        />
      </View>

      <View style={styles.inputContainer}>
        <Feather name="tag" size={20} color="#d909a4" />
        <TextInput
          style={styles.input}
          placeholder="Tipo (Festa, Show...) *"
          placeholderTextColor="#aaa"
          value={tipo}
          onChangeText={setTipo}
        />
      </View>

      <View style={styles.inputContainer}>
        <Feather name="map-pin" size={20} color="#d909a4" />
        <TextInput
          style={styles.input}
          placeholder="Endereço *"
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

      <Text style={styles.label}>Transporte</Text>
      {renderChips(TRANSPORTES, transporte, setTransporte)}

      <View style={[styles.inputContainer, { marginTop: 8 }]}>
        <Feather name="clock" size={20} color="#d909a4" />
        <TextInput
          style={styles.input}
          placeholder="ETA (ex.: 15 min)"
          placeholderTextColor="#aaa"
          value={eta}
          onChangeText={setEta}
        />
      </View>

      <Text style={styles.label}>Status</Text>
      {renderChips(STATUS, status, setStatus)}

      <TouchableOpacity style={styles.button} onPress={handleCriar}>
        <Text style={styles.buttonText}>Criar Rolê</Text>
      </TouchableOpacity>

      <Text style={styles.helper}>* Campos obrigatórios</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#210b34', padding: 16 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold', textAlign: 'center' },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff1',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  input: { flex: 1, marginLeft: 8, color: '#fff' },

  label: { color: '#fff', fontWeight: '700', marginTop: 6, marginBottom: 8 },

  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
  },
  chipActive: { backgroundColor: '#d909a4', borderColor: '#d909a4' },
  chipText: { color: '#fff', fontWeight: '600' },
  chipTextActive: { color: '#fff', fontWeight: '800' },

  button: {
    backgroundColor: '#d909a4',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  helper: { color: '#fff6', textAlign: 'center', marginTop: 10, fontSize: 12 },
});
