import { Feather, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Params = {
  id?: string;
  nome?: string;
  tipo?: string;
  endereco?: string;
  status?: string;
  eta?: string;
  transporte?: string;
  descricao?: string;
  started?: string | boolean;
  finished?: string | boolean;
};

export default function DetalhesRole() {
  const router = useRouter();
  const raw = useLocalSearchParams() as Partial<Params>;
  const started = useMemo(
    () => (typeof raw.started === 'string' ? raw.started === 'true' : !!raw.started),
    [raw.started]
  );
  const finished = useMemo(
    () => (typeof raw.finished === 'string' ? raw.finished === 'true' : !!raw.finished),
    [raw.finished]
  );
  const role = useMemo(
    () => ({
      id: raw.id ?? '',
      nome: raw.nome ?? 'Evento',
      tipo: raw.tipo ?? 'Rolê',
      endereco: raw.endereco ?? 'Local a definir',
      status: (raw.status ?? 'EM DESLOCAMENTO').toString(),
      eta: raw.eta ?? '—',
      transporte: raw.transporte ?? 'A PÉ',
      descricao: raw.descricao ?? '',
      started,
      finished,
    }),
    [raw, started, finished]
  );

  const phase = getPhase({ status: role.status, started: role.started, finished: role.finished });
  const phaseColor = getPhaseColor(phase);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Feather name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>

      <LinearGradient
        colors={['#6a1b9a', '#d909a4']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerCard}
      >
        <View style={styles.headerTopRow}>
          <Text style={styles.title} numberOfLines={2}>
            {role.nome}
          </Text>

          <View style={[styles.phaseBadge, { backgroundColor: phaseColor }]}>
            <Feather name="activity" size={12} color="#000" />
            <Text style={styles.phaseText}>{phase}</Text>
          </View>
        </View>

        <Text style={styles.subTitle}>{role.tipo}</Text>

        <View style={styles.chipsRow}>
          <View style={styles.chip}>
            <Feather name="clock" size={14} color="#fff" />
            <Text style={styles.chipText}>{role.eta}</Text>
          </View>

          <View style={styles.chip}>
            <Feather name="navigation" size={14} color="#fff" />
            <Text style={styles.chipText}>{role.transporte}</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.infoCard}>
        <InfoRow icon={<Feather name="map-pin" size={20} color="#d909a4" />} label="Endereço" value={role.endereco} />
        <InfoRow icon={<MaterialIcons name="date-range" size={20} color="#d909a4" />} label="Status" value={phase} />
        {!!role.descricao && (
          <InfoRow icon={<Feather name="file-text" size={20} color="#d909a4" />} label="Descrição" value={role.descricao} />
        )}
      </View>
    </ScrollView>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIcon}>{icon}</View>
      <View style={{ flex: 1 }}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

function getPhase({
  status,
  started,
  finished,
}: {
  status: string;
  started?: boolean;
  finished?: boolean;
}) {
  if (finished) return 'ENCERRADO';
  if (started) return 'ACONTECENDO';
  return status?.toUpperCase?.() || 'N/A';
}

function getPhaseColor(phase: string) {
  const p = phase.toLowerCase();
  if (p.includes('encerr')) return '#ff4500';
  if (p.includes('acontec')) return '#32cd32';
  if (p.includes('desloc')) return '#ffd700';
  if (p.includes('presente')) return '#32cd32';
  if (p.includes('ausente')) return '#ff4500';
  return '#9aa0a6';
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#210b34', padding: 16 },

  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },

  headerCard: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  headerTopRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#fff', flex: 1 },
  subTitle: { fontSize: 15, color: '#ffe4f5', fontWeight: '600', marginTop: 4 },

  phaseBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  phaseText: { color: '#000', fontWeight: '800', fontSize: 12 },

  chipsRow: { flexDirection: 'row', gap: 10, marginTop: 12 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  chipText: { color: '#fff', fontWeight: '700' },

  infoCard: {
    backgroundColor: '#2a0d4f',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
    gap: 14,
  },
  infoRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  infoIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(217,9,164,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  infoLabel: { color: '#fff9', fontSize: 12, fontWeight: '700', marginBottom: 2, letterSpacing: 0.2 },
  infoValue: { color: '#fff', fontSize: 16, lineHeight: 22 },
});
