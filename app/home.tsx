import { Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Header from '../components/Header';
import RoleCard from '../components/RoleCard';

type Role = {
  id: string;
  nome: string;
  tipo: string;
  endereco: string;
  status: string;
  transporte: string;
  eta: string;
  descricao?: string;
  started?: boolean;
  finished?: boolean;
};

const filtros = ['Todos', 'Churrasco', 'Show', 'Bar', 'Reunião', 'Cinema', 'Game Night', 'Esporte'];

async function fetchTicketmasterAsRoles(city = 'São Paulo', countryCode = 'BR'): Promise<Role[]> {
  const apikey = process.env.EXPO_PUBLIC_TICKETMASTER_KEY;
  if (!apikey) return [];
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apikey}&countryCode=${countryCode}&city=${encodeURIComponent(
    city
  )}&size=25`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`Ticketmaster HTTP ${res.status}`);
  const data = await res.json();
  const events = data?._embedded?.events ?? [];
  return events.map((e: any): Role => {
    const v = e?._embedded?.venues?.[0] ?? {};
    const endereco = [v?.name, v?.address?.line1, v?.city?.name].filter(Boolean).join(' · ') || 'Local a definir';
    const startDate = e?.dates?.start?.localDate ?? '';
    const startTime = e?.dates?.start?.localTime ?? '';
    return {
      id: String(e.id),
      nome: e?.name ?? 'Evento',
      tipo: 'Show',
      endereco,
      status: 'PRESENTE',
      transporte: Platform.OS === 'ios' ? 'METRÔ' : 'A PÉ',
      eta: '0 min',
      descricao: [startDate, startTime].filter(Boolean).join(' '),
      started: false,
      finished: false,
    };
  });
}
function SkeletonCard() {
  const shimmer = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 1, duration: 900, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(shimmer, { toValue: 0, duration: 900, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [shimmer]);
  const opacity = shimmer.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0.7] });
  return (
    <View style={styles.cardSkeleton}>
      <Animated.View style={[styles.skelLine, { width: '55%', opacity }]} />
      <Animated.View style={[styles.skelLine, { width: '35%', opacity, marginTop: 8 }]} />
      <Animated.View style={[styles.skelLine, { width: '80%', opacity, marginTop: 16 }]} />
    </View>
  );
}

export default function Home() {
  const router = useRouter();
  const [filtroSelecionado, setFiltroSelecionado] = useState('Todos');

  const [locais, setLocais] = useState<Role[]>([]);
  const [remotos, setRemotos] = useState<Role[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    try {
      setCarregando(true);
      setErro(null);
      const raw = await AsyncStorage.getItem('roles');
      const parsed: Role[] = raw ? JSON.parse(raw) : [];
      setLocais(parsed);
      const tm = await fetchTicketmasterAsRoles('São Paulo', 'BR');
      setRemotos(tm);
    } catch {
      setErro('Não conseguimos carregar os eventos públicos agora. Seus rolês locais continuam visíveis.');
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await carregar();
    setRefreshing(false);
  }, [carregar]);

  const roles: Role[] = useMemo(() => [...locais, ...remotos], [locais, remotos]);

  const rolesFiltrados = useMemo(() => {
    if (filtroSelecionado === 'Todos') return roles;
    return roles.filter((r) => r.tipo?.toLowerCase() === filtroSelecionado.toLowerCase());
  }, [roles, filtroSelecionado]);

  return (
    <View style={styles.flex}>
      <LinearGradient colors={['#1a0f2b', '#210b34', '#2e114d']} style={styles.bg} />

      <Header title="Rolês Ativos" />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      >
        {filtros.map((filtro) => {
          const active = filtroSelecionado === filtro;
          return (
            <TouchableOpacity
              key={filtro}
              activeOpacity={0.85}
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => setFiltroSelecionado(filtro)}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{filtro}</Text>
              {active && <View style={styles.chipDot} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionMini} onPress={() => router.push('./perfil')}>
          <MaterialIcons name="person" size={20} color="#fff" />
          <Text style={styles.actionMiniText}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionMini} onPress={() => router.push('./procurar-role')}>
          <FontAwesome5 name="search" size={16} color="#fff" />
          <Text style={styles.actionMiniText}>Procurar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />}
      >
        {carregando && (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}

        {erro && !carregando && <Text style={styles.helperText}>{erro}</Text>}

        {!carregando &&
          rolesFiltrados.map((role) => {
            const displayedStatus =
              role.finished ? 'FINALIZADO' :
              role.started ? 'EM ANDAMENTO' :
              role.status;

            return (
              <View key={role.id} style={styles.cardWrapper}>
                <LinearGradient colors={['#2a0d4fAA', '#2a0d4f99']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.cardGradient}>
                  <RoleCard
                    nome={role.nome}
                    tipo={role.tipo}
                    endereco={role.endereco}
                    status={displayedStatus as any}
                    eta={role.eta}
                    transporte={role.transporte}
                    onPress={() =>
                      router.push({
                        pathname: './detalhes/[id]',
                        params: {
                          id: role.id,
                          nome: role.nome,
                          tipo: role.tipo,
                          endereco: role.endereco,
                          status: role.status,
                          eta: role.eta,
                          transporte: role.transporte,
                          descricao: role.descricao ?? '',
                          started: String(role.started ?? false),
                          finished: String(role.finished ?? false),
                        },
                      })
                    }
                  />
                </LinearGradient>
              </View>
            );
          })}

        {!carregando && rolesFiltrados.length === 0 && (
          <View style={styles.emptyBox}>
            <Feather name="calendar" size={24} color="#fff6" />
            <Text style={styles.emptyTitle}>Nenhum rolê nesse filtro</Text>
            <Text style={styles.emptySubtitle}>Tente outro filtro ou crie um novo rolê.</Text>
          </View>
        )}
      </ScrollView>
      <TouchableOpacity style={styles.fab} onPress={() => router.push('./criar-role')} activeOpacity={0.9}>
        <Feather name="plus" size={24} color="#fff" />
        <Text style={styles.fabText}>Criar rolê</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  bg: { ...StyleSheet.absoluteFillObject },

  filterScroll: { marginTop: 8, marginBottom: 4 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  chipActive: {
    backgroundColor: '#d909a4',
    borderColor: '#d909a4',
  },
  chipText: { color: '#fff9', fontWeight: '600' },
  chipTextActive: { color: '#fff', fontWeight: '800' },
  chipDot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: '#fff',
    marginLeft: 8,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 2,
  },
  actionMini: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  actionMiniText: { color: '#fff', marginLeft: 6, fontWeight: '700' },

  scroll: { padding: 16, paddingBottom: 110 },

  cardWrapper: {
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6,
  },
  cardGradient: {
    borderRadius: 18,
  },

  helperText: {
    color: '#fff8',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 8,
  },

  emptyBox: {
    marginTop: 24,
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  emptyTitle: { color: '#fff', fontWeight: '800', fontSize: 16, marginTop: 8 },
  emptySubtitle: { color: '#fff8', marginTop: 4 },

  fab: {
    position: 'absolute',
    right: 18,
    bottom: 22,
    backgroundColor: '#d909a4',
    borderRadius: 28,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#d909a4',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  fabText: { color: '#fff', fontWeight: '800' },
  cardSkeleton: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },
  skelLine: {
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
});
