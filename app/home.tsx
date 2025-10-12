import { Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../components/Header';
import RoleCard from '../components/RoleCard';


const rolesData = [
  { id: '1', nome: 'Festa da Júlia', tipo: 'Churrasco', endereco: 'Rua das Flores, 123', status: 'EM DESLOCAMENTO', transporte: 'CARRO', eta: '15 min', descricao: 'Festa com churrasco, música e piscina. Todos convidados!' },
  { id: '2', nome: 'Show da Banda X', tipo: 'Show', endereco: 'Arena SP', status: 'PRESENTE', transporte: 'METRÔ', eta: '0 min', descricao: 'Show da banda X com abertura de DJ local. Início às 20h.' },
  { id: '3', nome: 'Happy Hour Amigos', tipo: 'Bar', endereco: 'Av. Paulista, 500', status: 'AUSENTE', transporte: 'A PÉ', eta: 'N/A', descricao: 'Encontro casual com amigos no bar central. Promoção de bebidas até 22h.' },
];


const filtros = ['Todos', 'Churrasco', 'Show', 'Bar', 'Reunião'];

export default function Home() {
  const router = useRouter();
  const [filtroSelecionado, setFiltroSelecionado] = useState('Todos');


  const rolesFiltrados = filtroSelecionado === 'Todos'
    ? rolesData
    : rolesData.filter(role => role.tipo.toLowerCase() === filtroSelecionado.toLowerCase());

  return (
    <View style={styles.container}>
      <Header title="Rolês Ativos" />


      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={{ paddingHorizontal: 8 }}
      >
        {filtros.map((filtro) => (
          <TouchableOpacity
            key={filtro}
            style={[
              styles.filterButton,
              filtroSelecionado === filtro && styles.filterButtonActive
            ]}
            onPress={() => setFiltroSelecionado(filtro)}
          >
            <Text
              style={[
                styles.filterText,
                filtroSelecionado === filtro && styles.filterTextActive
              ]}
            >
              {filtro}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => router.push('./criar-role')}>
          <Feather name="plus-circle" size={24} color="#fff" />
          <Text style={styles.actionText}>Criar Rolê</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={() => router.push('./perfil')}>
          <MaterialIcons name="person" size={24} color="#fff" />
          <Text style={styles.actionText}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={() => router.push('./procurar-role')}>
          <FontAwesome5 name="search" size={20} color="#fff" />
          <Text style={styles.actionText}>Procurar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {rolesFiltrados.map((role) => (
          <RoleCard
            key={role.id}
            nome={role.nome}
            tipo={role.tipo}
            endereco={role.endereco}
            status={role.status as any}
            eta={role.eta}
            transporte={role.transporte}
            onPress={() => router.push({
              pathname: './detalhes/[id]',
              params: { id: role.id, nome: role.nome, tipo: role.tipo, endereco: role.endereco, status: role.status, eta: role.eta, transporte: role.transporte, descricao: role.descricao }
            })}
          />
        ))}
        {rolesFiltrados.length === 0 && (
          <Text style={styles.noRolesText}>Nenhum rolê encontrado para este filtro.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#210b34' },

  filterScroll: { marginVertical: 12 },
  filterButton: {
    marginHorizontal: 6,
    backgroundColor: '#2a0d4f',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  filterButtonActive: {
    backgroundColor: '#d909a4',
  },
  filterText: {
    color: '#fff6',
    fontWeight: '600',
    fontSize: 14,
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d909a4',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  actionText: { color: '#fff', fontWeight: 'bold', marginLeft: 6 },


  scroll: { padding: 16, paddingBottom: 50 },
  noRolesText: {
    color: '#fff6',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});
