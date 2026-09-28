import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, layout } from '../theme';

export type Conversation = {
  id: string;
  name: string;
  activity: string;
  message: string;
  time: string;
  unread?: number;
};

const conversations: Conversation[] = [
  { id: 'linh', name: 'Linh Nguyễn', activity: 'Săn mây Đà Lạt', message: 'Mình sẽ gửi điểm tập trung nhé!', time: '09:24', unread: 2 },
  { id: 'tuan', name: 'Tuấn Kiệt', activity: 'Giao lưu cầu lông', message: 'Tối mai mọi người đến trước 15 phút nha.', time: 'Hôm qua' },
  { id: 'coffee', name: 'Nhóm Cà phê cuối tuần', activity: 'Cà phê cuối tuần', message: 'Minh Anh: Hẹn mọi người sáng thứ Bảy ☕', time: 'T2', unread: 1 },
];

type MessagesScreenProps = {
  onOpenChat: (conversation: Conversation) => void;
};

export function MessagesScreen({ onOpenChat }: MessagesScreenProps) {
  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Tin nhắn</Text>
          <Text style={styles.subtitle}>Trao đổi với host và các thành viên</Text>
        </View>
        <Pressable style={styles.searchButton}>
          <Ionicons color={colors.ink} name="search-outline" size={22} />
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {conversations.map((conversation) => (
          <Pressable key={conversation.id} onPress={() => onOpenChat(conversation)} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{conversation.name.charAt(0)}</Text>
              <View style={styles.onlineDot} />
            </View>
            <View style={styles.copy}>
              <View style={styles.nameRow}>
                <Text numberOfLines={1} style={styles.name}>{conversation.name}</Text>
                <Text style={styles.time}>{conversation.time}</Text>
              </View>
              <Text numberOfLines={1} style={styles.activity}>{conversation.activity}</Text>
              <View style={styles.messageRow}>
                <Text numberOfLines={1} style={[styles.message, Boolean(conversation.unread) && styles.unreadMessage]}>{conversation.message}</Text>
                {Boolean(conversation.unread) && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{conversation.unread}</Text>
                  </View>
                )}
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { alignSelf: 'center', flex: 1, maxWidth: layout.maxWidth, paddingHorizontal: 18, width: '100%' },
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 18, paddingTop: 21 },
  title: { color: colors.ink, fontSize: 27, fontWeight: '900', letterSpacing: -0.6 },
  subtitle: { color: colors.body, fontSize: 12, marginTop: 5 },
  searchButton: { alignItems: 'center', backgroundColor: '#F4F5F9', borderRadius: 17, height: 44, justifyContent: 'center', width: 44 },
  list: { paddingBottom: 24 },
  row: { alignItems: 'center', borderBottomColor: '#EEF0F4', borderBottomWidth: 1, flexDirection: 'row', paddingVertical: 16 },
  pressed: { opacity: 0.65 },
  avatar: { alignItems: 'center', backgroundColor: '#EDEBFF', borderRadius: 23, height: 52, justifyContent: 'center', position: 'relative', width: 52 },
  avatarText: { color: '#5E5CEB', fontSize: 18, fontWeight: '900' },
  onlineDot: { backgroundColor: '#28C78A', borderColor: '#FFFFFF', borderRadius: 6, borderWidth: 2, bottom: 0, height: 12, position: 'absolute', right: 0, width: 12 },
  copy: { flex: 1, marginLeft: 13 },
  nameRow: { alignItems: 'center', flexDirection: 'row' },
  name: { color: colors.ink, flex: 1, fontSize: 14, fontWeight: '800' },
  time: { color: '#9AA3B5', fontSize: 10 },
  activity: { color: '#655BE9', fontSize: 10.5, fontWeight: '700', marginTop: 3 },
  messageRow: { alignItems: 'center', flexDirection: 'row', marginTop: 4 },
  message: { color: '#7A859A', flex: 1, fontSize: 12 },
  unreadMessage: { color: '#4C5870', fontWeight: '700' },
  unreadBadge: { alignItems: 'center', backgroundColor: '#655BEF', borderRadius: 9, height: 18, justifyContent: 'center', marginLeft: 8, minWidth: 18 },
  unreadText: { color: '#FFFFFF', fontSize: 9, fontWeight: '800' },
});
