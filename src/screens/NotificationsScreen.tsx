import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '../components/LocalizedText';
import { ScreenHeader } from '../components/ScreenHeader';
import { colors, layout } from '../theme';

const items = [
  { icon: 'person-add' as const, color: colors.primary, bg: colors.primarySoft, title: 'Yêu cầu tham gia mới', text: 'Lan Anh muốn tham gia “Cà phê cuối tuần”.', time: '2 phút trước', unread: true },
  { icon: 'chatbubble' as const, color: colors.google, bg: '#EAF3FF', title: 'Tin nhắn mới từ Linh', text: '“Mình sẽ gửi điểm tập trung cho cả nhóm nhé!”', time: '5 phút trước', unread: true },
  { icon: 'checkmark-circle' as const, color: colors.success, bg: colors.successSoft, title: 'Yêu cầu đã được xác nhận', text: 'Bạn đã tham gia “Giao lưu cầu lông”.', time: '24 phút trước', unread: true },
  { icon: 'location' as const, color: colors.warning, bg: colors.warningSoft, title: 'Địa điểm đã thay đổi', text: 'Host đã cập nhật điểm tập trung cho chuyến đi Đà Lạt.', time: '1 giờ trước' },
  { icon: 'alarm' as const, color: colors.primary, bg: colors.primarySoft, title: 'Hoạt động sắp diễn ra', text: 'Pickleball sau giờ làm bắt đầu vào 18:30 hôm nay.', time: 'Hôm qua' },
  { icon: 'star' as const, color: colors.match, bg: colors.matchSoft, title: 'Chia sẻ trải nghiệm của bạn', text: 'Đánh giá hoạt động và những người bạn đã gặp.', time: 'Hôm qua' },
];

export function NotificationsScreen({ onBack }: { onBack: () => void }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeader
        onBack={onBack}
        right={<Pressable hitSlop={8}><Ionicons color={colors.text} name="ellipsis-horizontal" size={21} /></Pressable>}
        title="Thông báo"
      />
      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeader}><Text style={styles.day}>MỚI</Text><Pressable><Text style={styles.markRead}>Đánh dấu đã đọc</Text></Pressable></View>
        {items.slice(0, 3).map((item) => <NotificationRow item={item} key={item.title} />)}
        <Text style={styles.earlier}>TRƯỚC ĐÓ</Text>
        {items.slice(3).map((item) => <NotificationRow item={item} key={item.title} />)}
      </ScrollView>
    </SafeAreaView>
  );
}

function NotificationRow({ item }: { item: (typeof items)[number] }) {
  return (
    <Pressable style={styles.item}>
      <View style={[styles.icon, { backgroundColor: item.bg }]}><Ionicons color={item.color} name={item.icon} size={20} /></View>
      <View style={styles.copy}><Text style={styles.title}>{item.title}</Text><Text style={styles.text}>{item.text}</Text><Text style={styles.time}>{item.time}</Text></View>
      {item.unread && <View style={styles.dot} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.background, flex: 1 },
  list: { alignSelf: 'center', maxWidth: layout.maxWidth, paddingBottom: 28, paddingHorizontal: 18, width: '100%' },
  sectionHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5, marginTop: 15 },
  day: { color: colors.textMuted, fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  markRead: { color: colors.primary, fontSize: 12, fontWeight: '600' },
  earlier: { color: colors.textMuted, fontSize: 11, fontWeight: '700', letterSpacing: 0.5, marginBottom: 5, marginTop: 24 },
  item: { alignItems: 'flex-start', borderBottomColor: colors.border, borderBottomWidth: 1, flexDirection: 'row', minHeight: 86, paddingVertical: 14 },
  icon: { alignItems: 'center', borderRadius: 15, height: 42, justifyContent: 'center', width: 42 },
  copy: { flex: 1, marginLeft: 12 },
  title: { color: colors.text, fontSize: 13.5, fontWeight: '700' },
  text: { color: colors.textSecondary, fontSize: 12, lineHeight: 18, marginTop: 3 },
  time: { color: colors.textMuted, fontSize: 10.5, marginTop: 5 },
  dot: { backgroundColor: colors.primary, borderRadius: 4, height: 8, marginLeft: 8, marginTop: 5, width: 8 },
});
