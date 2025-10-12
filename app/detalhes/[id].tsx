import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DetalhesRole() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const id = params.id;

  const roleDetalhes: Record<string, any> = {
    '1': {
      nome: 'Festa da Júlia',
      tipo: 'Churrasco',
      endereco: 'Rua das Flores, 123',
      data: '25/10/2025',
      horario: '20:00',
      status: 'EM DESLOCAMENTO',
      transporte: 'CARRO',
      eta: '15 min',
      organizador: 'Júlia Souza',
      convidados: 12,
      observacoes: 'Levar bebidas e petiscos',
    },
    '2': {
      nome: 'Show da Banda X',
      tipo: 'Show',
      endereco: 'Arena SP',
      data: '28/10/2025',
      horario: '21:00',
      status: 'PRESENTE',
      transporte: 'METRÔ',
      eta: '0 min',
      organizador: 'Banda X',
      convidados: 200,
      observacoes: 'Ingressos obrigatórios',
    },
    '3': {
      nome: 'Happy Hour Amigos',
      tipo: 'Bar',
      endereco: 'Av. Paulista, 500',
      data: '26/10/2025',
      horario: '18:30',
      status: 'AUSENTE',
      transporte: 'A PÉ',
      eta: 'N/A',
      organizador: 'Carlos',
      convidados: 8,
      observacoes: 'Reservar mesa 5',
    },
  };

  const role = id ? roleDetalhes[id] : undefined;

  if (!role) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFoundText}>Rolê não encontrado!</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Feather name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.headerCard}>
        <Text style={styles.title}>{role.nome}</Text>
        <Text style={styles.subTitle}>{role.tipo}</Text>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Feather name="map-pin" size={20} color="#d909a4" />
          <Text style={styles.infoText}>{role.endereco}</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="date-range" size={20} color="#d909a4" />
          <Text style={styles.infoText}>{role.data} - {role.horario}</Text>
        </View>
        <View style={styles.infoRow}>
          <Feather name="user" size={20} color="#d909a4" />
          <Text style={styles.infoText}>Organizador: {role.organizador}</Text>
        </View>
        <View style={styles.infoRow}>
          <Feather name="users" size={20} color="#d909a4" />
          <Text style={styles.infoText}>Convidados: {role.convidados}</Text>
        </View>
        <View style={styles.infoRow}>
          <Feather name="info" size={20} color="#d909a4" />
          <Text style={styles.infoText}>Status: {role.status}</Text>
        </View>
        <View style={styles.infoRow}>
          <Feather name="clock" size={20} color="#d909a4" />
          <Text style={styles.infoText}>ETA: {role.eta}</Text>
        </View>
        <View style={styles.infoRow}>
          <Feather name="alert-circle" size={20} color="#d909a4" />
          <Text style={styles.infoText}>Observações: {role.observacoes}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#210b34',
    padding: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
  notFoundText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
  },
  headerCard: {
    backgroundColor: '#2a0d4f',
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  subTitle: {
    fontSize: 16,
    color: '#fff6',
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: '#2a0d4f',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
});
