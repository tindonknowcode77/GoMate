import { Text } from '../components/LocalizedText';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '../components/ScreenHeader';
import { colors, layout } from '../theme';

const items = [
  { icon: 'checkmark-circle' as const, color: '#29B783', bg: '#E9F9F3', title: 'Yêu cầu đã được xác nhận', text: 'Bạn đã tham gia “Giao lưu cầu lông”.', time: '5 phút trước', unread: true },
  { icon: 'chatbubble' as const, color: '#5E5CEB', bg: '#EFEEFF', title: 'Tin nhắn mới từ Linh', text: 'Host đã gửi điểm tập trung cho chuyến đi.', time: '24 phút trước', unread: true },
  { icon: 'calendar' as const, color: '#2F8DF3', bg: '#EAF4FF', title: 'Hoạt động sắp diễn ra', text: 'Cà phê cuối tuần bắt đầu sau 1 ngày.', time: 'Hôm qua' },
];

export function NotificationsScreen({ onBack }: { onBack: () => void }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeader onBack={onBack} title="Thông báo" />
      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        <Text style={styles.day}>Mới</Text>
        {items.map((item) => (
          <View key={item.title} style={[styles.item, item.unread && styles.unreadItem]}>
            <View style={[styles.icon, { backgroundColor: item.bg }]}><Ionicons color={item.color} name={item.icon} size={20} /></View>
            <View style={styles.copy}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.text}>{item.text}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
            {item.unread && <View style={styles.dot} />}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#FFFFFF', flex: 1 },
  list: { alignSelf: 'center', maxWidth: layout.maxWidth, padding: 18, width: '100%' },
  day: { color: colors.ink, fontSize: 14, fontWeight: '900', marginBottom: 9 },
  item: { alignItems: 'flex-start', borderBottomColor: '#EEF0F4', borderBottomWidth: 1, flexDirection: 'row', paddingVertical: 15 },
  unreadItem: { backgroundColor: '#FBFAFF', borderRadius: 17, borderBottomWidth: 0, marginBottom: 5, paddingHorizontal: 12 },
  icon: { alignItems: 'center', borderRadius: 16, height: 40, justifyContent: 'center', width: 40 },
  copy: { flex: 1, marginLeft: 11 },
  title: { color: colors.ink, fontSize: 13, fontWeight: '800' },
  text: { color: '#69748A', fontSize: 11.5, lineHeight: 17, marginTop: 4 },
  time: { color: '#9AA3B5', fontSize: 9.5, marginTop: 6 },
  dot: { backgroundColor: '#655BEF', borderRadius: 4, height: 8, marginLeft: 7, marginTop: 5, width: 8 },
});
