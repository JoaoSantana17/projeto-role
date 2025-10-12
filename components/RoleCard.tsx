import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface RoleCardProps {
  nome: string;
  tipo: string;
  endereco: string;
  status: string;
  eta: string;
  transporte: string;
  onPress: () => void;
}

export default function RoleCard({ nome, tipo, endereco, status, eta, transporte, onPress }: RoleCardProps) {

  const statusColor = () => {
    switch (status.toLowerCase()) {
      case 'em deslocamento': return '#ffd700';
      case 'presente': return '#32cd32';
      case 'ausente': return '#ff4500';
      default: return '#fff';
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.name}>{nome}</Text>
        <View style={[styles.statusBadge, { backgroundColor: statusColor() }]}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>

      <Text style={styles.tipo}>{tipo}</Text>
      <Text style={styles.endereco}>{endereco}</Text>

      <View style={styles.footer}>
        <View style={styles.etaContainer}>
          <Feather name="clock" size={16} color="#fff" />
          <Text style={styles.etaText}>{eta}</Text>
        </View>
        <Text style={styles.transporte}>{transporte}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2a0d4f',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  name: { color: '#fff', fontSize: 18, fontWeight: 'bold', flexShrink: 1 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
  statusText: { color: '#000', fontWeight: 'bold', fontSize: 12 },
  tipo: { color: '#fff6', fontSize: 14, fontWeight: '600', marginBottom: 2 },
  endereco: { color: '#fff6', fontSize: 13, marginBottom: 8 },

  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  etaContainer: { flexDirection: 'row', alignItems: 'center' },
  etaText: { color: '#fff', marginLeft: 4, fontWeight: 'bold' },
  transporte: { color: '#fff6', fontSize: 13, fontWeight: '600' },
});
