import { Text } from '../components/LocalizedText';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { AppHeader } from '../components/AppHeader';
import { colors, layout } from '../theme';

type HomeScreenProps = {
  onMatchPress: () => void;
  onMyActivitiesPress: () => void;
  onNotificationsPress: () => void;
};

export function HomeScreen({
  onMatchPress,
  onMyActivitiesPress,
  onNotificationsPress,
}: HomeScreenProps) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.page}>
        <AppHeader onNotificationPress={onNotificationsPress} showNotification />
        <View style={styles.welcomeRow}>
          <View>
            <Text style={styles.greeting}>Chào Minh 👋</Text>
            <Text style={styles.question}>Sẵn sàng cho một trải nghiệm mới?</Text>
          </View>
          <LinearGradient colors={['#7449FA', '#3588F4']} style={styles.avatar}>
            <Text style={styles.avatarText}>M</Text>
          </LinearGradient>
        </View>

        <LinearGradient
          colors={['#7345F8', '#5261F3', '#2B90F5']}
          end={{ x: 1, y: 1 }}
          start={{ x: 0, y: 0 }}
          style={styles.matchHero}
        >
          <View style={styles.heroGlow} />
          <View style={styles.heroIcon}>
            <Ionicons color="#FFFFFF" name="layers" size={25} />
          </View>
          <Text style={styles.heroEyebrow}>GOMATE MATCH</Text>
          <Text style={styles.heroTitle}>Tìm hoạt động hợp với bạn</Text>
          <Text style={styles.heroCopy}>
            Vuốt qua từng gợi ý, xem chi tiết và tham gia khi bạn thấy phù hợp.
          </Text>
          <Pressable onPress={onMatchPress} style={({ pressed }) => [styles.heroButton, pressed && styles.pressed]}>
            <Text style={styles.heroButtonText}>Bắt đầu match</Text>
            <Ionicons color="#5D5CEF" name="arrow-forward" size={18} />
          </Pressable>
        </LinearGradient>

        <Text style={styles.sectionTitle}>Truy cập nhanh</Text>
        <View style={styles.quickGrid}>
          <QuickAction
            icon="calendar-outline"
            label="Hoạt động của tôi"
            note="3 sắp tới"
            onPress={onMyActivitiesPress}
          />
          <QuickAction
            icon="notifications-outline"
            label="Thông báo"
            note="2 thông báo mới"
            onPress={onNotificationsPress}
          />
        </View>

        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View>
              <Text style={styles.statusTitle}>Tuần này của bạn</Text>
              <Text style={styles.statusSubtitle}>Tiếp tục kết nối và trải nghiệm</Text>
            </View>
            <View style={styles.weekBadge}>
              <Ionicons color="#5E5BEB" name="sparkles" size={17} />
            </View>
          </View>
          <View style={styles.statsRow}>
            <Stat value="4" label="Đã match" />
            <View style={styles.statDivider} />
            <Stat value="2" label="Đã tham gia" />
            <View style={styles.statDivider} />
            <Stat value="6" label="Kết nối mới" />
          </View>
        </View>

        <View style={styles.completionCard}>
          <View style={styles.completionIcon}>
            <Ionicons color="#5D62ED" name="shield-checkmark-outline" size={22} />
          </View>
          <View style={styles.completionCopy}>
            <Text style={styles.completionTitle}>Hồ sơ đã hoàn thiện 80%</Text>
            <Text style={styles.completionText}>Thêm một vài thông tin để tăng độ tin cậy.</Text>
          </View>
          <Ionicons color="#8A94A8" name="chevron-forward" size={20} />
        </View>
      </View>
    </ScrollView>
  );
}

function QuickAction({ icon, label, note, onPress }: { icon: 'calendar-outline' | 'notifications-outline'; label: string; note: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.quickCard, pressed && styles.pressed]}>
      <View style={styles.quickIcon}>
        <Ionicons color="#5F5BEA" name={icon} size={21} />
      </View>
      <Text style={styles.quickLabel}>{label}</Text>
      <Text style={styles.quickNote}>{note}</Text>
    </Pressable>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: { paddingBottom: 28 },
  page: { alignSelf: 'center', maxWidth: layout.maxWidth, paddingHorizontal: 18, width: '100%' },
  welcomeRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  greeting: { color: colors.ink, fontSize: 27, fontWeight: '900', letterSpacing: -0.7 },
  question: { color: colors.body, fontSize: 14, marginTop: 5 },
  avatar: { alignItems: 'center', borderRadius: 21, height: 42, justifyContent: 'center', width: 42 },
  avatarText: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },
  matchHero: { borderRadius: 28, marginTop: 24, overflow: 'hidden', padding: 21, position: 'relative' },
  heroGlow: { backgroundColor: 'rgba(255,255,255,0.11)', borderRadius: 100, height: 200, position: 'absolute', right: -75, top: -80, width: 200 },
  heroIcon: { alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.16)', borderRadius: 18, height: 42, justifyContent: 'center', width: 42 },
  heroEyebrow: { color: 'rgba(255,255,255,0.8)', fontSize: 10, fontWeight: '900', letterSpacing: 1.3, marginTop: 17 },
  heroTitle: { color: '#FFFFFF', fontSize: 25, fontWeight: '900', letterSpacing: -0.6, marginTop: 6, maxWidth: 310 },
  heroCopy: { color: 'rgba(255,255,255,0.84)', fontSize: 13, lineHeight: 19, marginTop: 8, maxWidth: 340 },
  heroButton: { alignItems: 'center', alignSelf: 'flex-start', backgroundColor: '#FFFFFF', borderRadius: 17, flexDirection: 'row', gap: 8, marginTop: 20, paddingHorizontal: 16, paddingVertical: 11 },
  heroButtonText: { color: '#5D5CEF', fontSize: 13, fontWeight: '800' },
  pressed: { opacity: 0.7, transform: [{ scale: 0.98 }] },
  sectionTitle: { color: colors.ink, fontSize: 19, fontWeight: '900', letterSpacing: -0.3, marginBottom: 13, marginTop: 25 },
  quickGrid: { flexDirection: 'row', gap: 12 },
  quickCard: { backgroundColor: '#FFFFFF', borderColor: '#E9ECF3', borderRadius: 21, borderWidth: 1, flex: 1, padding: 15, shadowColor: '#233A63', shadowOffset: { width: 0, height: 7 }, shadowOpacity: 0.045, shadowRadius: 14, elevation: 2 },
  quickIcon: { alignItems: 'center', backgroundColor: '#F0EFFF', borderRadius: 14, height: 36, justifyContent: 'center', width: 36 },
  quickLabel: { color: colors.ink, fontSize: 13, fontWeight: '800', marginTop: 13 },
  quickNote: { color: colors.body, fontSize: 11, marginTop: 4 },
  statusCard: { backgroundColor: '#FFFFFF', borderColor: '#E9ECF3', borderRadius: 24, borderWidth: 1, marginTop: 16, padding: 18 },
  statusHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  statusTitle: { color: colors.ink, fontSize: 16, fontWeight: '900' },
  statusSubtitle: { color: colors.body, fontSize: 11, marginTop: 3 },
  weekBadge: { alignItems: 'center', backgroundColor: '#F0EFFF', borderRadius: 15, height: 34, justifyContent: 'center', width: 34 },
  statsRow: { alignItems: 'center', flexDirection: 'row', marginTop: 20 },
  stat: { alignItems: 'center', flex: 1 },
  statValue: { color: colors.ink, fontSize: 21, fontWeight: '900' },
  statLabel: { color: colors.body, fontSize: 10, marginTop: 3 },
  statDivider: { backgroundColor: '#E9ECF2', height: 32, width: 1 },
  completionCard: { alignItems: 'center', backgroundColor: '#F4F3FF', borderRadius: 20, flexDirection: 'row', marginTop: 16, padding: 15 },
  completionIcon: { alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 15, height: 40, justifyContent: 'center', width: 40 },
  completionCopy: { flex: 1, marginLeft: 12 },
  completionTitle: { color: colors.ink, fontSize: 13, fontWeight: '800' },
  completionText: { color: colors.body, fontSize: 10.5, marginTop: 3 },
});
