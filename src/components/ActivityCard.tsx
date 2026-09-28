import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { Activity } from '../data/activities';
import { colors } from '../theme';

type SwipeActivityCardProps = {
  activity: Activity;
  height: number;
  onViewPeople: () => void;
  fullScreen?: boolean;
};

export function SwipeActivityCard({ activity, height, onViewPeople, fullScreen = false }: SwipeActivityCardProps) {
  return (
    <View style={[styles.card, fullScreen && styles.fullScreenCard, { height }]}> 
      <ScrollView
        bounces={false}
        contentContainerStyle={fullScreen && styles.fullScreenScrollContent}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={activity.image}
          style={[styles.hero, fullScreen && { height: Math.max(430, height * 0.68) }]}
          imageStyle={fullScreen ? undefined : styles.heroImage}
        >
          <LinearGradient
            colors={['rgba(8,17,37,0.02)', 'rgba(8,17,37,0.1)', 'rgba(8,17,37,0.86)']}
            locations={[0, 0.55, 1]}
            style={styles.heroGradient}
          >
            <View style={styles.categoryPill}>
              <Text style={styles.categoryText}>{activity.category}</Text>
            </View>
            <View>
              <Text style={styles.title}>{activity.title}</Text>
              <View style={styles.hostLine}>
                <View style={styles.hostAvatar}>
                  <Text style={styles.hostInitial}>{activity.host.charAt(0)}</Text>
                </View>
                <Text style={styles.hostName}>{activity.host}</Text>
                <Ionicons color="#63A5FF" name="checkmark-circle" size={18} />
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>

        <View style={[styles.content, fullScreen && styles.fullScreenContent]}>
          <View style={styles.tagRow}>
            {activity.tags.map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>

          <View style={styles.infoGrid}>
            <InfoItem icon="location-outline" label="Địa điểm" value={activity.location} />
            <InfoItem icon="calendar-outline" label="Thời gian" value={activity.time} />
            <InfoItem icon="people-outline" label="Thành viên" value={activity.members} />
            <InfoItem icon="navigate-outline" label="Khoảng cách" value={activity.distance} />
          </View>

          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>Về hoạt động</Text>
          <Text style={styles.description}>{activity.description}</Text>

          <View style={styles.noteCard}>
            <Ionicons color="#5E5CEB" name="information-circle-outline" size={20} />
            <View style={styles.noteCopy}>
              <Text style={styles.noteTitle}>Phù hợp cho người mới</Text>
              <Text style={styles.noteText}>Host sẽ gửi hướng dẫn chi tiết sau khi xác nhận tham gia.</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Host & thành viên</Text>
          <View style={styles.peoplePreview}>
            {['L', 'M', 'T', 'A'].map((initial, index) => (
              <View key={`${initial}-${index}`} style={[styles.personAvatar, { marginLeft: index === 0 ? 0 : -8 }]}>
                <Text style={styles.personInitial}>{initial}</Text>
              </View>
            ))}
            <Text style={styles.peopleCount}>{activity.members} người đã tham gia</Text>
          </View>
          <Pressable
            onPress={onViewPeople}
            style={({ pressed }) => [styles.peopleButton, pressed && styles.pressed]}
          >
            <Ionicons color="#5E5CEB" name="people-outline" size={19} />
            <Text style={styles.peopleButtonText}>Xem host và thành viên</Text>
            <Ionicons color="#78839A" name="chevron-forward" size={18} />
          </Pressable>

          <View style={styles.scrollHint}>
            <Ionicons color="#9AA3B7" name="chevron-up" size={15} />
            <Text style={styles.scrollHintText}>Vuốt lên để xem thêm</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function InfoItem({ icon, label, value }: { icon: 'location-outline' | 'calendar-outline' | 'people-outline' | 'navigate-outline'; label: string; value: string }) {
  return (
    <View style={styles.infoItem}>
      <View style={styles.infoIcon}>
        <Ionicons color="#5E5CEB" name={icon} size={17} />
      </View>
      <View style={styles.infoCopy}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text numberOfLines={1} style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderColor: '#E5E8F0', borderRadius: 30, borderWidth: 1, overflow: 'hidden', shadowColor: '#1E3359', shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.12, shadowRadius: 24, width: '100%', elevation: 6 },
  fullScreenCard: { borderRadius: 0, borderWidth: 0, elevation: 0, shadowOpacity: 0 },
  fullScreenScrollContent: { backgroundColor: '#FFFFFF' },
  hero: { height: 360 },
  heroImage: { borderTopLeftRadius: 29, borderTopRightRadius: 29 },
  heroGradient: { flex: 1, justifyContent: 'space-between', padding: 18 },
  categoryPill: { alignSelf: 'flex-end', backgroundColor: 'rgba(12,23,47,0.58)', borderRadius: 14, paddingHorizontal: 11, paddingVertical: 7 },
  categoryText: { color: '#FFFFFF', fontSize: 11, fontWeight: '800' },
  title: { color: '#FFFFFF', fontSize: 28, fontWeight: '900', letterSpacing: -0.7, marginBottom: 10 },
  hostLine: { alignItems: 'center', flexDirection: 'row' },
  hostAvatar: { alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 18, height: 36, justifyContent: 'center', width: 36 },
  hostInitial: { color: colors.purple, fontSize: 15, fontWeight: '900' },
  hostName: { color: '#FFFFFF', fontSize: 14, fontWeight: '800', marginLeft: 9, marginRight: 5 },
  content: { padding: 18 },
  fullScreenContent: { paddingBottom: 118, paddingHorizontal: 20, paddingTop: 20 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  tag: { backgroundColor: '#F0EEFF', borderRadius: 13, paddingHorizontal: 10, paddingVertical: 6 },
  tagText: { color: '#5F56EA', fontSize: 11, fontWeight: '700' },
  infoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 16 },
  infoItem: { alignItems: 'center', backgroundColor: '#F8F9FC', borderRadius: 15, flexDirection: 'row', minHeight: 56, padding: 10, width: '48%' },
  infoIcon: { alignItems: 'center', backgroundColor: '#EFEEFF', borderRadius: 11, height: 30, justifyContent: 'center', width: 30 },
  infoCopy: { flex: 1, marginLeft: 8 },
  infoLabel: { color: '#939CAF', fontSize: 9.5, fontWeight: '600' },
  infoValue: { color: colors.ink, fontSize: 11, fontWeight: '700', marginTop: 2 },
  divider: { backgroundColor: '#EDF0F4', height: 1, marginVertical: 18 },
  sectionTitle: { color: colors.ink, fontSize: 15, fontWeight: '900', marginBottom: 8 },
  description: { color: '#667289', fontSize: 13, lineHeight: 20 },
  noteCard: { alignItems: 'flex-start', backgroundColor: '#F4F3FF', borderRadius: 16, flexDirection: 'row', marginVertical: 17, padding: 13 },
  noteCopy: { flex: 1, marginLeft: 9 },
  noteTitle: { color: colors.ink, fontSize: 12, fontWeight: '800' },
  noteText: { color: colors.body, fontSize: 10.5, lineHeight: 16, marginTop: 3 },
  peoplePreview: { alignItems: 'center', flexDirection: 'row', marginTop: 4 },
  personAvatar: { alignItems: 'center', backgroundColor: '#EDEBFF', borderColor: '#FFFFFF', borderRadius: 18, borderWidth: 2, height: 36, justifyContent: 'center', width: 36 },
  personInitial: { color: '#5E5CEB', fontSize: 12, fontWeight: '900' },
  peopleCount: { color: colors.body, fontSize: 11, marginLeft: 10 },
  peopleButton: { alignItems: 'center', borderColor: '#DFE2ED', borderRadius: 16, borderWidth: 1, flexDirection: 'row', marginTop: 13, minHeight: 50, paddingHorizontal: 14 },
  peopleButtonText: { color: '#4F5A72', flex: 1, fontSize: 12, fontWeight: '700', marginLeft: 9 },
  pressed: { opacity: 0.65 },
  scrollHint: { alignItems: 'center', marginTop: 20 },
  scrollHintText: { color: '#9AA3B7', fontSize: 10, marginTop: 2 },
});
