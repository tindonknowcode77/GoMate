import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '../components/ScreenHeader';
import { Activity, activities } from '../data/activities';
import { colors, layout } from '../theme';

export function PendingActivitiesScreen({ onBack, onOpen }: { onBack: () => void; onOpen: (activity: Activity) => void }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeader onBack={onBack} subtitle="Đã chọn và đang chờ duyệt" title="Yêu cầu tham gia" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.page}>
          <View style={styles.infoCard}><Ionicons color="#A96D0A" name="time-outline" size={21} /><Text style={styles.infoText}>Host thường phản hồi trong vòng 24 giờ. Bạn có thể xem lại thông tin và profile nhóm trong lúc chờ.</Text></View>
          {activities.slice(0, 2).map((activity, index) => (
            <Pressable key={activity.id} onPress={() => onOpen(activity)} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
              <Image source={activity.image} style={styles.image} />
              <View style={styles.copy}>
                <View style={styles.status}><View style={styles.statusDot} /><Text style={styles.statusText}>{index === 0 ? 'Đang chờ host duyệt' : 'Host đang xem yêu cầu'}</Text></View>
                <Text numberOfLines={1} style={styles.title}>{activity.title}</Text>
                <Text numberOfLines={1} style={styles.meta}>{activity.time}</Text>
                <View style={styles.hostLine}><Text style={styles.host}>Host: {activity.host}</Text><Ionicons color="#438FF3" name="checkmark-circle" size={15} /></View>
              </View>
              <Ionicons color="#8F98AA" name="chevron-forward" size={18} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#F8F9FC', flex: 1 },
  content: { paddingBottom: 28 },
  page: { alignSelf: 'center', maxWidth: layout.maxWidth, padding: 18, width: '100%' },
  infoCard: { alignItems: 'flex-start', backgroundColor: '#FFF7E8', borderRadius: 18, flexDirection: 'row', marginBottom: 16, padding: 14 },
  infoText: { color: '#806840', flex: 1, fontSize: 11, lineHeight: 17, marginLeft: 9 },
  card: { alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#E7EAF1', borderRadius: 21, borderWidth: 1, flexDirection: 'row', marginBottom: 12, padding: 10 },
  image: { borderRadius: 15, height: 100, width: 94 },
  copy: { flex: 1, marginLeft: 12 },
  status: { alignItems: 'center', flexDirection: 'row' },
  statusDot: { backgroundColor: '#F2A93B', borderRadius: 4, height: 7, marginRight: 5, width: 7 },
  statusText: { color: '#A26B13', fontSize: 9.5, fontWeight: '800' },
  title: { color: colors.ink, fontSize: 14, fontWeight: '900', marginTop: 7 },
  meta: { color: colors.body, fontSize: 10.5, marginTop: 5 },
  hostLine: { alignItems: 'center', flexDirection: 'row', gap: 4, marginTop: 7 },
  host: { color: '#59657D', fontSize: 10.5, fontWeight: '700' },
  pressed: { opacity: 0.68 },
});
