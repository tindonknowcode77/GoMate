import { Text } from '../components/LocalizedText';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '../components/ScreenHeader';
import { Activity, activities } from '../data/activities';
import { colors, layout } from '../theme';

export function MyActivitiesScreen({ onBack, onOpenGroup }: { onBack: () => void; onOpenGroup: (activity: Activity) => void }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeader onBack={onBack} title="Hoạt động của tôi" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.page}>
          <View style={styles.tabs}><View style={styles.activeTab}><Text style={styles.activeTabText}>Sắp tới</Text></View><Text style={styles.tabText}>Đang chờ</Text><Text style={styles.tabText}>Đã qua</Text></View>
          {activities.slice(0, 3).map((activity, index) => (
            <Pressable key={activity.id} onPress={() => onOpenGroup(activity)} style={styles.card}>
              <Image source={activity.image} style={styles.image} />
              <View style={styles.copy}>
                <View style={styles.status}><Text style={styles.statusText}>{index === 1 ? 'Đang chờ host' : 'Đã xác nhận'}</Text></View>
                <Text numberOfLines={1} style={styles.title}>{activity.title}</Text>
                <View style={styles.meta}><Ionicons color={colors.textMuted} name="calendar-outline" size={14} /><Text style={styles.metaText}>{activity.time}</Text></View>
                <View style={styles.meta}><Ionicons color={colors.textMuted} name="location-outline" size={14} /><Text numberOfLines={1} style={styles.metaText}>{activity.location}</Text></View>
                {index !== 1 && <Text style={styles.openGroup}>Mở nhóm hoạt động →</Text>}
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.background, flex: 1 },
  scrollContent: { paddingBottom: 25 },
  page: { alignSelf: 'center', maxWidth: layout.maxWidth, padding: 18, width: '100%' },
  tabs: { alignItems: 'center', backgroundColor: colors.surfaceStrong, borderRadius: 17, flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16, padding: 4 },
  activeTab: { backgroundColor: colors.surface, borderRadius: 14, paddingHorizontal: 18, paddingVertical: 9 },
  activeTabText: { color: colors.primary, fontSize: 11, fontWeight: '800' },
  tabText: { color: colors.textMuted, fontSize: 11, fontWeight: '600' },
  card: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 21, borderWidth: 1, flexDirection: 'row', marginBottom: 12, overflow: 'hidden', padding: 10 },
  image: { borderRadius: 15, height: 105, width: 100 },
  copy: { flex: 1, marginLeft: 12, paddingVertical: 2 },
  status: { alignSelf: 'flex-start', backgroundColor: colors.primarySoft, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4 },
  statusText: { color: colors.primary, fontSize: 8.5, fontWeight: '800' },
  title: { color: colors.ink, fontSize: 14, fontWeight: '900', marginTop: 8 },
  meta: { alignItems: 'center', flexDirection: 'row', marginTop: 6 },
  metaText: { color: colors.textSecondary, flex: 1, fontSize: 10, marginLeft: 5 },
  openGroup: { color: colors.primary, fontSize: 10, fontWeight: '800', marginTop: 7 },
});
