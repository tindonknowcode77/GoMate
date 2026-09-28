import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '../components/ScreenHeader';
import { PersonProfile } from '../data/people';
import { colors, layout } from '../theme';

export function MemberProfileScreen({ person, onBack }: { person: PersonProfile; onBack: () => void }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeader onBack={onBack} title="Profile thành viên" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.page}>
          <View style={styles.profileCard}>
            <LinearGradient colors={['#A43CF4', '#4E65F3', '#2C8EF5']} style={styles.avatar}><Text style={styles.avatarText}>{person.initial}</Text></LinearGradient>
            <View style={styles.nameRow}><Text style={styles.name}>{person.name}, {person.age}</Text>{person.verified && <Ionicons color="#438FF3" name="checkmark-circle" size={20} />}</View>
            <View style={styles.locationRow}><Ionicons color="#7D879B" name="location-outline" size={16} /><Text style={styles.location}>{person.location}</Text></View>
            <View style={styles.roleBadge}><Ionicons color="#5E5CEB" name={person.role === 'host' ? 'shield-checkmark-outline' : 'person-outline'} size={15} /><Text style={styles.roleText}>{person.role === 'host' ? 'Host hoạt động' : 'Thành viên GoMate'}</Text></View>
          </View>

          <View style={styles.card}><Text style={styles.sectionTitle}>Giới thiệu</Text><Text style={styles.bio}>{person.bio}</Text></View>
          <View style={styles.card}><Text style={styles.sectionTitle}>Sở thích</Text><View style={styles.tags}>{person.interests.map((interest) => <View key={interest} style={styles.tag}><Text style={styles.tagText}>{interest}</Text></View>)}</View></View>
          <View style={styles.statsCard}><View style={styles.stat}><Text style={styles.statValue}>{person.activitiesJoined}</Text><Text style={styles.statLabel}>Đã tham gia</Text></View><View style={styles.divider} /><View style={styles.stat}><Text style={styles.statValue}>{person.role === 'host' ? '18' : '4.9'}</Text><Text style={styles.statLabel}>{person.role === 'host' ? 'Đã tổ chức' : 'Đánh giá'}</Text></View><View style={styles.divider} /><View style={styles.stat}><Ionicons color="#2AA77D" name="shield-checkmark" size={23} /><Text style={styles.statLabel}>Đáng tin cậy</Text></View></View>
          <Pressable style={styles.reportRow}><Ionicons color="#8892A5" name="flag-outline" size={18} /><Text style={styles.reportText}>Báo cáo profile</Text><Ionicons color="#9AA3B4" name="chevron-forward" size={18} /></Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#F8F9FC', flex: 1 }, content: { paddingBottom: 28 }, page: { alignSelf: 'center', maxWidth: layout.maxWidth, padding: 18, width: '100%' },
  profileCard: { alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#E7EAF1', borderRadius: 26, borderWidth: 1, padding: 22 }, avatar: { alignItems: 'center', borderRadius: 46, height: 92, justifyContent: 'center', width: 92 }, avatarText: { color: '#FFFFFF', fontSize: 32, fontWeight: '900' }, nameRow: { alignItems: 'center', flexDirection: 'row', gap: 6, marginTop: 14 }, name: { color: colors.ink, fontSize: 22, fontWeight: '900' }, locationRow: { alignItems: 'center', flexDirection: 'row', gap: 5, marginTop: 7 }, location: { color: colors.body, fontSize: 12 }, roleBadge: { alignItems: 'center', backgroundColor: '#F0EEFF', borderRadius: 13, flexDirection: 'row', gap: 5, marginTop: 13, paddingHorizontal: 10, paddingVertical: 6 }, roleText: { color: '#5E5CEB', fontSize: 10.5, fontWeight: '800' },
  card: { backgroundColor: '#FFFFFF', borderColor: '#E7EAF1', borderRadius: 21, borderWidth: 1, marginTop: 13, padding: 16 }, sectionTitle: { color: colors.ink, fontSize: 14, fontWeight: '900' }, bio: { color: colors.body, fontSize: 12.5, lineHeight: 20, marginTop: 8 }, tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 11 }, tag: { backgroundColor: '#F0EEFF', borderRadius: 13, paddingHorizontal: 10, paddingVertical: 7 }, tagText: { color: '#5E5CEB', fontSize: 10.5, fontWeight: '800' },
  statsCard: { alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#E7EAF1', borderRadius: 21, borderWidth: 1, flexDirection: 'row', marginTop: 13, paddingVertical: 17 }, stat: { alignItems: 'center', flex: 1 }, statValue: { color: colors.ink, fontSize: 19, fontWeight: '900' }, statLabel: { color: colors.body, fontSize: 9.5, marginTop: 4 }, divider: { backgroundColor: '#EAEDF2', height: 34, width: 1 }, reportRow: { alignItems: 'center', flexDirection: 'row', marginTop: 16, padding: 13 }, reportText: { color: '#7D879A', flex: 1, fontSize: 11.5, marginLeft: 9 },
});
