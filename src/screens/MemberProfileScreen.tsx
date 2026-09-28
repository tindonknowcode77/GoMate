import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '../components/LocalizedText';
import { ScreenHeader } from '../components/ScreenHeader';
import { PersonProfile } from '../data/people';
import { colors, layout, shadows } from '../theme';

const profileAvatar = require('../assets/profile-avatar.png');
const activityPhotos = [require('../assets/Activity-image/cafe.jpg'), require('../assets/Activity-image/dalat-travel.jpeg'), require('../assets/Activity-image/caulong.jpg')];

type MemberProfileScreenProps = {
  person: PersonProfile;
  onBack: () => void;
  mode?: 'member' | 'own-preview';
  onEdit?: () => void;
};

export function MemberProfileScreen({ person, onBack, mode = 'member', onEdit }: MemberProfileScreenProps) {
  const ownPreview = mode === 'own-preview';
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeader onBack={onBack} title={ownPreview ? 'Xem hồ sơ của tôi' : 'Profile thành viên'} />
      <ScrollView contentContainerStyle={[styles.content, ownPreview && styles.ownContent]} showsVerticalScrollIndicator={false}>
        <View style={styles.page}>
          {ownPreview && (
            <View style={styles.previewNotice}>
              <View style={styles.noticeIcon}><Ionicons color={colors.primary} name="eye" size={22} /></View>
              <Text style={styles.noticeText}>Đây là cách người khác nhìn thấy bạn khi bạn gửi yêu cầu tham gia hoạt động.</Text>
            </View>
          )}

          {ownPreview ? <PublicProfileHero person={person} /> : <MemberProfileCard person={person} />}

          <View style={styles.card}><Text style={styles.sectionTitle}>Giới thiệu</Text><Text style={styles.bio}>{person.bio}</Text></View>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Sở thích</Text>
            <View style={styles.tags}>{person.interests.map((interest) => <View key={interest} style={styles.tag}><Text style={styles.tagText}>{interest}</Text></View>)}</View>
          </View>

          {!ownPreview && <ProfileStats person={person} />}
          {ownPreview && <ActivityGallery />}
          {ownPreview && <CommunityReview />}

          {!ownPreview && (
            <Pressable style={styles.reportRow}><Ionicons color={colors.textMuted} name="flag-outline" size={18} /><Text style={styles.reportText}>Báo cáo profile</Text><Ionicons color={colors.textMuted} name="chevron-forward" size={18} /></Pressable>
          )}
        </View>
      </ScrollView>
      {ownPreview && onEdit && (
        <View style={styles.editFooter}>
          <Pressable onPress={onEdit} style={({ pressed }) => [styles.editButton, pressed && styles.pressed]}>
            <Ionicons color={colors.white} name="create-outline" size={20} />
            <Text style={styles.editButtonText}>Chỉnh sửa hồ sơ</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

function PublicProfileHero({ person }: { person: PersonProfile }) {
  return (
    <View style={styles.publicHero}>
      <Image resizeMode="cover" source={profileAvatar} style={styles.publicImage} />
      <View style={styles.publicInfo}>
        <View style={styles.nameRow}><Text style={styles.publicName}>{person.name}, {person.age}</Text>{person.verified && <Ionicons color={colors.success} name="checkmark-circle" size={21} />}</View>
        <View style={styles.locationRow}><Ionicons color={colors.textMuted} name="location-outline" size={17} /><Text style={styles.location}>{person.location}</Text></View>
        <ProfileStats person={person} compact />
      </View>
    </View>
  );
}

function MemberProfileCard({ person }: { person: PersonProfile }) {
  return (
    <View style={styles.profileCard}>
      <View style={styles.avatar}><Text style={styles.avatarText}>{person.initial}</Text></View>
      <View style={styles.nameRow}><Text style={styles.name}>{person.name}, {person.age}</Text>{person.verified && <Ionicons color={colors.success} name="checkmark-circle" size={20} />}</View>
      <View style={styles.locationRow}><Ionicons color={colors.textMuted} name="location-outline" size={16} /><Text style={styles.location}>{person.location}</Text></View>
      <View style={styles.roleBadge}><Ionicons color={colors.primary} name={person.role === 'host' ? 'shield-checkmark-outline' : 'person-outline'} size={15} /><Text style={styles.roleText}>{person.role === 'host' ? 'Host hoạt động' : 'Thành viên GoMate'}</Text></View>
    </View>
  );
}

function ProfileStats({ person, compact = false }: { person: PersonProfile; compact?: boolean }) {
  return (
    <View style={[styles.statsCard, compact && styles.compactStats]}>
      <View style={styles.stat}><Ionicons color={colors.warning} name="star" size={compact ? 18 : 0} /><Text style={styles.statValue}>{person.rating}</Text><Text style={styles.statLabel}>Đánh giá</Text></View>
      <View style={styles.divider} />
      <View style={styles.stat}><Ionicons color={colors.primary} name="people-outline" size={compact ? 18 : 0} /><Text style={styles.statValue}>{person.activitiesJoined}</Text><Text style={styles.statLabel}>Hoạt động</Text></View>
      <View style={styles.divider} />
      <View style={styles.stat}><Ionicons color={colors.primary} name="checkmark-circle-outline" size={compact ? 18 : 0} /><Text style={styles.statValue}>{person.attendanceRate}%</Text><Text style={styles.statLabel}>Đúng hẹn</Text></View>
    </View>
  );
}

function ActivityGallery() {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Ảnh hoạt động</Text>
      <View style={styles.photoRow}>
        {activityPhotos.map((photo, index) => <Image key={index} resizeMode="cover" source={photo} style={styles.activityPhoto} />)}
        <View style={styles.morePhotos}><Text style={styles.morePhotosText}>+2</Text></View>
      </View>
    </View>
  );
}

function CommunityReview() {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Đánh giá từ cộng đồng</Text>
      <View style={styles.reviewHeader}><View style={styles.reviewerAvatar}><Text style={styles.reviewerInitial}>T</Text></View><View><Text style={styles.reviewerName}>Thảo Vy</Text><Text style={styles.reviewStars}>★★★★★  5.0</Text></View></View>
      <Text style={styles.reviewText}>Minh rất thân thiện và nhiệt tình. Chuyến đi rất vui! Sẽ tham gia cùng bạn lần sau.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.background, flex: 1 },
  content: { paddingBottom: 28 },
  ownContent: { paddingBottom: 106 },
  page: { alignSelf: 'center', maxWidth: layout.maxWidth, padding: 18, width: '100%' },
  previewNotice: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: 19, flexDirection: 'row', marginBottom: 14, padding: 13 },
  noticeIcon: { alignItems: 'center', backgroundColor: colors.white, borderRadius: 18, height: 38, justifyContent: 'center', width: 38 },
  noticeText: { color: colors.textSecondary, flex: 1, fontSize: 11.5, lineHeight: 17, marginLeft: 10 },
  publicHero: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 26, borderWidth: 1, overflow: 'hidden', ...shadows.card },
  publicImage: { backgroundColor: colors.primarySoft, height: 255, width: '100%' },
  publicInfo: { padding: 17 },
  publicName: { color: colors.ink, fontSize: 25, fontWeight: '900', letterSpacing: -0.5 },
  profileCard: { alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 26, borderWidth: 1, padding: 22 },
  avatar: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: 46, height: 92, justifyContent: 'center', width: 92 },
  avatarText: { color: colors.white, fontSize: 32, fontWeight: '900' },
  nameRow: { alignItems: 'center', flexDirection: 'row', gap: 6, marginTop: 14 },
  name: { color: colors.ink, fontSize: 22, fontWeight: '900' },
  locationRow: { alignItems: 'center', flexDirection: 'row', gap: 5, marginTop: 7 },
  location: { color: colors.body, fontSize: 12 },
  roleBadge: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: 13, flexDirection: 'row', gap: 5, marginTop: 13, paddingHorizontal: 10, paddingVertical: 6 },
  roleText: { color: colors.primary, fontSize: 10.5, fontWeight: '800' },
  card: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 21, borderWidth: 1, marginTop: 13, padding: 16 },
  sectionTitle: { color: colors.ink, fontSize: 14, fontWeight: '900' },
  bio: { color: colors.body, fontSize: 12.5, lineHeight: 20, marginTop: 8 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 11 },
  tag: { backgroundColor: colors.primarySoft, borderRadius: 13, paddingHorizontal: 10, paddingVertical: 7 },
  tagText: { color: colors.primary, fontSize: 10.5, fontWeight: '800' },
  statsCard: { alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 21, borderWidth: 1, flexDirection: 'row', marginTop: 13, paddingVertical: 17 },
  compactStats: { backgroundColor: colors.surfaceMuted, borderWidth: 0, marginTop: 15 },
  stat: { alignItems: 'center', flex: 1 },
  statValue: { color: colors.ink, fontSize: 17, fontWeight: '900', marginTop: 2 },
  statLabel: { color: colors.body, fontSize: 9.5, marginTop: 2 },
  divider: { backgroundColor: colors.border, height: 34, width: 1 },
  photoRow: { flexDirection: 'row', gap: 7, marginTop: 12 },
  activityPhoto: { borderRadius: 12, flex: 1, height: 70 },
  morePhotos: { alignItems: 'center', backgroundColor: colors.surfaceStrong, borderRadius: 12, flex: 1, height: 70, justifyContent: 'center' },
  morePhotosText: { color: colors.textSecondary, fontSize: 16, fontWeight: '900' },
  reviewHeader: { alignItems: 'center', flexDirection: 'row', marginTop: 13 },
  reviewerAvatar: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: 20, height: 40, justifyContent: 'center', marginRight: 10, width: 40 },
  reviewerInitial: { color: colors.primary, fontSize: 15, fontWeight: '900' },
  reviewerName: { color: colors.ink, fontSize: 12, fontWeight: '900' },
  reviewStars: { color: colors.primary, fontSize: 11, fontWeight: '800', marginTop: 3 },
  reviewText: { color: colors.body, fontSize: 11.5, lineHeight: 18, marginTop: 10 },
  reportRow: { alignItems: 'center', flexDirection: 'row', marginTop: 16, padding: 13 },
  reportText: { color: colors.textMuted, flex: 1, fontSize: 11.5, marginLeft: 9 },
  editFooter: { backgroundColor: colors.surface, borderTopColor: colors.border, borderTopWidth: 1, bottom: 0, left: 0, paddingBottom: 12, paddingHorizontal: 18, paddingTop: 12, position: 'absolute', right: 0 },
  editButton: { alignItems: 'center', alignSelf: 'center', backgroundColor: colors.primary, borderRadius: 19, flexDirection: 'row', gap: 8, justifyContent: 'center', maxWidth: layout.maxWidth, minHeight: 54, width: '100%', ...shadows.floating },
  editButtonText: { color: colors.white, fontSize: 14, fontWeight: '900' },
  pressed: { opacity: 0.78, transform: [{ scale: 0.99 }] },
});
