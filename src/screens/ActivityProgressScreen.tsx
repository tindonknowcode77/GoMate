import { ComponentProps, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '../components/LocalizedText';
import { ScreenHeader } from '../components/ScreenHeader';
import { Activity } from '../data/activities';
import { colors, layout, radii } from '../theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

const actions: { icon: IconName; label: string; note: string }[] = [
  { icon: 'time-outline', label: 'Cập nhật thời gian', note: 'Thông báo cho cả nhóm' },
  { icon: 'location-outline', label: 'Cập nhật địa điểm', note: 'Đổi điểm hẹn hiện tại' },
  { icon: 'wallet-outline', label: 'Thêm chi phí', note: 'Chia chi phí với thành viên' },
  { icon: 'people-outline', label: 'Cập nhật thành viên', note: 'Điểm danh nhóm' },
  { icon: 'images-outline', label: 'Thêm ảnh kỷ niệm', note: 'Lưu lại khoảnh khắc' },
];

export function ActivityProgressScreen({ activity, onBack, onEnd }: { activity: Activity; onBack: () => void; onEnd: () => void }) {
  const [updates, setUpdates] = useState(['Host đã bắt đầu hoạt động', 'Điểm tập trung đã được xác nhận']);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeader onBack={onBack} subtitle={activity.title} title="Đang diễn ra" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.page}>
          <View style={styles.liveCard}><View style={styles.liveDot} /><View style={styles.liveCopy}><Text style={styles.liveLabel}>ACTIVITY IN PROGRESS</Text><Text style={styles.liveTitle}>{activity.title}</Text><Text style={styles.liveMeta}>{activity.time} · {activity.location}</Text></View><Ionicons color={colors.white} name="pulse" size={25} /></View>

          <Text style={styles.sectionTitle}>Cập nhật nhanh</Text>
          <View style={styles.actionGrid}>{actions.map((action) => <Pressable key={action.label} onPress={() => setUpdates((current) => [`${action.label} vừa được ghi nhận`, ...current])} style={styles.action}><View style={styles.actionIcon}><Ionicons color={colors.primary} name={action.icon} size={20} /></View><Text style={styles.actionLabel}>{action.label}</Text><Text style={styles.actionNote}>{action.note}</Text></Pressable>)}</View>

          <Text style={styles.sectionTitle}>Updates</Text>
          <View style={styles.updatesCard}>{updates.map((update, index) => <View key={`${update}-${index}`} style={styles.updateRow}><View style={styles.updateDot} /><View style={styles.updateCopy}><Text style={styles.updateText}>{update}</Text><Text style={styles.updateTime}>{index === 0 ? 'Vừa xong' : '10 phút trước'}</Text></View></View>)}</View>

          <Pressable onPress={onEnd} style={styles.endButton}><Ionicons color={colors.danger} name="stop-circle-outline" size={20} /><Text style={styles.endText}>Kết thúc hoạt động</Text></Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.background, flex: 1 },
  content: { paddingBottom: 28 },
  page: { alignSelf: 'center', maxWidth: layout.maxWidth, padding: 18, width: '100%' },
  liveCard: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: radii.largeCard, flexDirection: 'row', padding: 18 },
  liveDot: { backgroundColor: colors.success, borderColor: colors.white, borderRadius: 7, borderWidth: 3, height: 14, marginRight: 12, width: 14 },
  liveCopy: { flex: 1 },
  liveLabel: { color: 'rgba(255,255,255,0.72)', fontSize: 9.5, fontWeight: '900', letterSpacing: 1.1 },
  liveTitle: { color: colors.white, fontSize: 19, fontWeight: '900', marginTop: 6 },
  liveMeta: { color: 'rgba(255,255,255,0.78)', fontSize: 10.5, marginTop: 5 },
  sectionTitle: { color: colors.text, fontSize: 17, fontWeight: '900', marginBottom: 11, marginTop: 22 },
  actionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  action: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radii.card, borderWidth: 1, padding: 14, width: '48.5%' },
  actionIcon: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: 13, height: 36, justifyContent: 'center', width: 36 },
  actionLabel: { color: colors.text, fontSize: 12.5, fontWeight: '800', marginTop: 11 },
  actionNote: { color: colors.textMuted, fontSize: 9.5, lineHeight: 14, marginTop: 4 },
  updatesCard: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radii.card, borderWidth: 1, padding: 15 },
  updateRow: { flexDirection: 'row', marginBottom: 13 },
  updateDot: { backgroundColor: colors.success, borderRadius: 5, height: 10, marginTop: 3, width: 10 },
  updateCopy: { flex: 1, marginLeft: 10 },
  updateText: { color: colors.text, fontSize: 12.5, fontWeight: '700' },
  updateTime: { color: colors.textMuted, fontSize: 9.5, marginTop: 4 },
  endButton: { alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.danger, borderRadius: radii.button, borderWidth: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 20, minHeight: 52 },
  endText: { color: colors.danger, fontSize: 13.5, fontWeight: '800', marginLeft: 7 },
});
