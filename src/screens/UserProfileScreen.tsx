import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, layout } from '../theme';

const avatar = require('../assets/profile-avatar.png');

type UserProfileScreenProps = {
  onEdit: () => void;
  onMyActivities: () => void;
  onNotifications: () => void;
};

export function UserProfileScreen({ onEdit, onMyActivities, onNotifications }: UserProfileScreenProps) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Hồ sơ</Text>
          <Pressable style={styles.settingsButton}><Ionicons color={colors.ink} name="settings-outline" size={22} /></Pressable>
        </View>
        <LinearGradient colors={['#7547FA', '#3C84F4']} style={styles.cover}>
          <View style={styles.coverGlow} />
        </LinearGradient>
        <View style={styles.profileCard}>
          <Image source={avatar} style={styles.avatar} />
          <View style={styles.nameRow}>
            <Text style={styles.name}>Minh Phan</Text>
            <Ionicons color="#4590F4" name="checkmark-circle" size={19} />
          </View>
          <Text style={styles.location}>Ho Chi Minh City • 22 tuổi</Text>
          <Text style={styles.bio}>Coffee, badminton và những chuyến đi ngẫu hứng ✈️</Text>
          <Pressable onPress={onEdit} style={styles.editButton}>
            <Ionicons color="#5E5CEB" name="create-outline" size={17} />
            <Text style={styles.editText}>Chỉnh sửa hồ sơ</Text>
          </Pressable>
          <View style={styles.interests}>
            {['Coffee', 'Travel', 'Running'].map((item) => <View key={item} style={styles.interest}><Text style={styles.interestText}>{item}</Text></View>)}
          </View>
        </View>

        <View style={styles.statsCard}>
          <ProfileStat label="Đã match" value="12" />
          <View style={styles.divider} />
          <ProfileStat label="Đã tham gia" value="8" />
          <View style={styles.divider} />
          <ProfileStat label="Đã tổ chức" value="3" />
        </View>

        <View style={styles.menuCard}>
          <MenuRow icon="calendar-outline" label="Hoạt động của tôi" onPress={onMyActivities} />
          <MenuRow icon="notifications-outline" label="Thông báo" onPress={onNotifications} />
          <MenuRow icon="shield-checkmark-outline" label="An toàn & quyền riêng tư" />
          <MenuRow icon="help-circle-outline" label="Trợ giúp" last />
        </View>
      </View>
    </ScrollView>
  );
}

function ProfileStat({ label, value }: { label: string; value: string }) {
  return <View style={styles.stat}><Text style={styles.statValue}>{value}</Text><Text style={styles.statLabel}>{label}</Text></View>;
}

function MenuRow({ icon, label, onPress, last = false }: { icon: 'calendar-outline' | 'notifications-outline' | 'shield-checkmark-outline' | 'help-circle-outline'; label: string; onPress?: () => void; last?: boolean }) {
  return (
    <Pressable onPress={onPress} style={[styles.menuRow, last && styles.lastRow]}>
      <View style={styles.menuIcon}><Ionicons color="#5E5CEB" name={icon} size={19} /></View>
      <Text style={styles.menuLabel}>{label}</Text>
      <Ionicons color="#929BAE" name="chevron-forward" size={18} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  scrollContent: { paddingBottom: 27 },
  page: { alignSelf: 'center', maxWidth: layout.maxWidth, paddingHorizontal: 18, width: '100%' },
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 14, paddingTop: 20 },
  headerTitle: { color: colors.ink, fontSize: 27, fontWeight: '900' },
  settingsButton: { alignItems: 'center', backgroundColor: '#F4F5F9', borderRadius: 17, height: 42, justifyContent: 'center', width: 42 },
  cover: { borderRadius: 25, height: 126, overflow: 'hidden' },
  coverGlow: { backgroundColor: 'rgba(255,255,255,0.13)', borderRadius: 90, height: 180, position: 'absolute', right: -35, top: -80, width: 180 },
  profileCard: { alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#E8EBF2', borderRadius: 24, borderWidth: 1, marginHorizontal: 12, marginTop: -43, padding: 17, shadowColor: '#20355A', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.08, shadowRadius: 18, elevation: 4 },
  avatar: { borderColor: '#FFFFFF', borderRadius: 38, borderWidth: 4, height: 76, marginTop: -51, width: 76 },
  nameRow: { alignItems: 'center', flexDirection: 'row', gap: 5, marginTop: 7 },
  name: { color: colors.ink, fontSize: 20, fontWeight: '900' },
  location: { color: colors.body, fontSize: 11, marginTop: 4 },
  bio: { color: '#56627A', fontSize: 12, lineHeight: 18, marginTop: 10, textAlign: 'center' },
  editButton: { alignItems: 'center', backgroundColor: '#F0EFFF', borderRadius: 15, flexDirection: 'row', gap: 6, marginTop: 13, paddingHorizontal: 13, paddingVertical: 8 },
  editText: { color: '#5E5CEB', fontSize: 11, fontWeight: '800' },
  interests: { flexDirection: 'row', gap: 7, marginTop: 14 },
  interest: { backgroundColor: '#F6F7FA', borderRadius: 12, paddingHorizontal: 9, paddingVertical: 6 },
  interestText: { color: '#69748A', fontSize: 10, fontWeight: '700' },
  statsCard: { backgroundColor: '#FFFFFF', borderColor: '#E8EBF2', borderRadius: 21, borderWidth: 1, flexDirection: 'row', marginTop: 15, paddingVertical: 16 },
  stat: { alignItems: 'center', flex: 1 },
  statValue: { color: colors.ink, fontSize: 19, fontWeight: '900' },
  statLabel: { color: colors.body, fontSize: 9.5, marginTop: 3 },
  divider: { backgroundColor: '#E8EBF1', height: 29, width: 1 },
  menuCard: { backgroundColor: '#FFFFFF', borderColor: '#E8EBF2', borderRadius: 22, borderWidth: 1, marginTop: 15, overflow: 'hidden', paddingHorizontal: 15 },
  menuRow: { alignItems: 'center', borderBottomColor: '#EEF0F4', borderBottomWidth: 1, flexDirection: 'row', minHeight: 60 },
  lastRow: { borderBottomWidth: 0 },
  menuIcon: { alignItems: 'center', backgroundColor: '#F0EFFF', borderRadius: 13, height: 34, justifyContent: 'center', width: 34 },
  menuLabel: { color: '#4F5B73', flex: 1, fontSize: 13, fontWeight: '700', marginLeft: 11 },
});
