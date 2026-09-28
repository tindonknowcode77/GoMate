import { Text } from '../components/LocalizedText';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { AppHeader } from '../components/AppHeader';
import { colors, layout } from '../theme';

type MatchHubScreenProps = {
  onDiscover: () => void;
  onPending: () => void;
  onManage: () => void;
};

export function MatchHubScreen({ onDiscover, onPending, onManage }: MatchHubScreenProps) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.page}>
        <AppHeader />
        <Text style={styles.title}>Hoạt động của bạn</Text>
        <Text style={styles.subtitle}>Tìm trải nghiệm mới và quản lý mọi yêu cầu tại một nơi.</Text>

        <Pressable onPress={onDiscover} style={({ pressed }) => [styles.discoverWrap, pressed && styles.pressed]}>
          <LinearGradient colors={['#8C42F5', '#555EF3', '#2D8EF5']} end={{ x: 1, y: 1 }} style={styles.discoverCard}>
            <View style={styles.discoverGlow} />
            <View style={styles.discoverIcon}><Ionicons color="#FFFFFF" name="search" size={24} /></View>
            <Text style={styles.discoverEyebrow}>TÌM HOẠT ĐỘNG</Text>
            <Text style={styles.discoverTitle}>Khám phá từng hoạt động phù hợp với bạn</Text>
            <Text style={styles.discoverText}>Mở chế độ toàn màn hình để vuốt, đọc chi tiết và kết nối với host.</Text>
            <View style={styles.discoverAction}><Text style={styles.discoverActionText}>Bắt đầu tìm</Text><Ionicons color="#5A5CEF" name="arrow-forward" size={18} /></View>
          </LinearGradient>
        </Pressable>

        <Text style={styles.sectionTitle}>Theo dõi & quản lý</Text>
        <HubCard badge="2 đang chờ" icon="time-outline" note="Các hoạt động bạn đã chọn và đang chờ host duyệt." onPress={onPending} title="Yêu cầu tham gia" />
        <HubCard badge="3 yêu cầu mới" icon="shield-checkmark-outline" note="Hoạt động đã đăng, danh sách thành viên và yêu cầu cần duyệt." onPress={onManage} title="Hoạt động tôi tổ chức" />
      </View>
    </ScrollView>
  );
}

function HubCard({ title, note, badge, icon, onPress }: { title: string; note: string; badge: string; icon: 'time-outline' | 'shield-checkmark-outline'; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.hubCard, pressed && styles.pressed]}>
      <View style={styles.hubIcon}><Ionicons color="#5E5CEB" name={icon} size={23} /></View>
      <View style={styles.hubCopy}><Text style={styles.hubTitle}>{title}</Text><Text style={styles.hubNote}>{note}</Text><View style={styles.badge}><Text style={styles.badgeText}>{badge}</Text></View></View>
      <Ionicons color="#8A94A8" name="chevron-forward" size={20} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  scrollContent: { paddingBottom: 28 },
  page: { alignSelf: 'center', maxWidth: layout.maxWidth, paddingHorizontal: 18, width: '100%' },
  title: { color: colors.ink, fontSize: 28, fontWeight: '900', letterSpacing: -0.7, marginTop: 10 },
  subtitle: { color: colors.body, fontSize: 13, lineHeight: 19, marginTop: 6, maxWidth: 340 },
  discoverWrap: { borderRadius: 28, marginTop: 23 },
  discoverCard: { borderRadius: 28, overflow: 'hidden', padding: 21 },
  discoverGlow: { backgroundColor: 'rgba(255,255,255,0.11)', borderRadius: 100, height: 190, position: 'absolute', right: -58, top: -75, width: 190 },
  discoverIcon: { alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.17)', borderRadius: 17, height: 42, justifyContent: 'center', width: 42 },
  discoverEyebrow: { color: 'rgba(255,255,255,0.76)', fontSize: 10, fontWeight: '900', letterSpacing: 1.2, marginTop: 17 },
  discoverTitle: { color: '#FFFFFF', fontSize: 23, fontWeight: '900', letterSpacing: -0.5, lineHeight: 29, marginTop: 6, maxWidth: 330 },
  discoverText: { color: 'rgba(255,255,255,0.82)', fontSize: 12, lineHeight: 18, marginTop: 8, maxWidth: 330 },
  discoverAction: { alignItems: 'center', alignSelf: 'flex-start', backgroundColor: '#FFFFFF', borderRadius: 16, flexDirection: 'row', gap: 8, marginTop: 18, paddingHorizontal: 15, paddingVertical: 10 },
  discoverActionText: { color: '#5A5CEF', fontSize: 12, fontWeight: '900' },
  sectionTitle: { color: colors.ink, fontSize: 18, fontWeight: '900', marginBottom: 12, marginTop: 25 },
  hubCard: { alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#E8EAF1', borderRadius: 22, borderWidth: 1, flexDirection: 'row', marginBottom: 12, padding: 15 },
  hubIcon: { alignItems: 'center', backgroundColor: '#F0EFFF', borderRadius: 17, height: 46, justifyContent: 'center', width: 46 },
  hubCopy: { flex: 1, marginLeft: 12 },
  hubTitle: { color: colors.ink, fontSize: 14, fontWeight: '900' },
  hubNote: { color: colors.body, fontSize: 10.5, lineHeight: 15, marginTop: 4 },
  badge: { alignSelf: 'flex-start', backgroundColor: '#F0EEFF', borderRadius: 10, marginTop: 8, paddingHorizontal: 8, paddingVertical: 4 },
  badgeText: { color: '#5E5CEB', fontSize: 9.5, fontWeight: '800' },
  pressed: { opacity: 0.72, transform: [{ scale: 0.985 }] },
});
