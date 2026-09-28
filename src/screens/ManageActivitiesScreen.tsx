import { Text } from '../components/LocalizedText';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '../components/ScreenHeader';
import { activities } from '../data/activities';
import { communityMembers, PersonProfile } from '../data/people';
import { colors, layout } from '../theme';

export function ManageActivitiesScreen({ onBack, onViewProfile }: { onBack: () => void; onViewProfile: (person: PersonProfile) => void }) {
  const [decisions, setDecisions] = useState<Record<string, 'approved' | 'rejected'>>({});
  const hostedActivities = activities.slice(1, 3);
  const [selectedActivityId, setSelectedActivityId] = useState(hostedActivities[0].id);
  const activity = hostedActivities.find((item) => item.id === selectedActivityId) ?? hostedActivities[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeader onBack={onBack} subtitle="Hoạt động bạn đã đăng" title="Quản lý hoạt động" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.page}>
          <Text style={styles.listLabel}>HOẠT ĐỘNG ĐÃ ĐĂNG</Text>
          {hostedActivities.map((item) => {
            const selected = item.id === selectedActivityId;
            return (
              <Pressable key={item.id} onPress={() => setSelectedActivityId(item.id)} style={[styles.activityCard, selected && styles.selectedActivity]}>
                <Image source={item.image} style={styles.activityImage} />
                <View style={styles.activityCopy}><View style={styles.liveBadge}><Text style={styles.liveText}>ĐANG MỞ</Text></View><Text style={styles.activityTitle}>{item.title}</Text><Text style={styles.meta}>{item.time} · {item.members} thành viên</Text></View>
                <View style={[styles.selection, selected && styles.selectedSelection]}><Ionicons color={selected ? colors.white : colors.textMuted} name={selected ? 'checkmark' : 'ellipse-outline'} size={15} /></View>
              </Pressable>
            );
          })}

          <View style={styles.sectionRow}><View><Text style={styles.sectionTitle}>Yêu cầu tham gia</Text><Text style={styles.sectionNote}>Xem profile trước khi đưa ra quyết định.</Text></View><View style={styles.count}><Text style={styles.countText}>{communityMembers.length}</Text></View></View>

          {communityMembers.map((person) => {
            const decisionKey = `${activity.id}:${person.id}`;
            const decision = decisions[decisionKey];
            return (
              <View key={person.id} style={styles.requestCard}>
                <Pressable onPress={() => onViewProfile(person)} style={styles.personRow}>
                  <View style={styles.avatar}><Text style={styles.avatarText}>{person.initial}</Text></View>
                  <View style={styles.personCopy}><View style={styles.nameRow}><Text style={styles.personName}>{person.name}, {person.age}</Text>{person.verified && <Ionicons color={colors.success} name="checkmark-circle" size={16} />}</View><Text numberOfLines={1} style={styles.personMeta}>{person.location} · {person.activitiesJoined} hoạt động</Text><Text style={styles.viewProfile}>Xem profile</Text></View>
                  <Ionicons color={colors.textMuted} name="chevron-forward" size={18} />
                </Pressable>
                {decision ? (
                  <View style={[styles.decisionState, decision === 'approved' ? styles.approvedState : styles.rejectedState]}><Ionicons color={decision === 'approved' ? colors.successText : colors.matchText} name={decision === 'approved' ? 'checkmark-circle' : 'close-circle'} size={17} /><Text style={[styles.decisionText, { color: decision === 'approved' ? colors.successText : colors.matchText }]}>{decision === 'approved' ? 'Đã duyệt thành viên' : 'Đã từ chối yêu cầu'}</Text></View>
                ) : (
                  <View style={styles.actions}><Pressable onPress={() => setDecisions((current) => ({ ...current, [decisionKey]: 'rejected' }))} style={styles.rejectButton}><Text style={styles.rejectText}>Từ chối</Text></Pressable><Pressable onPress={() => setDecisions((current) => ({ ...current, [decisionKey]: 'approved' }))} style={styles.approveButton}><Ionicons color={colors.white} name="checkmark" size={17} /><Text style={styles.approveText}>Duyệt</Text></Pressable></View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.background, flex: 1 }, content: { paddingBottom: 28 }, page: { alignSelf: 'center', maxWidth: layout.maxWidth, padding: 18, width: '100%' },
  listLabel: { color: colors.textMuted, fontSize: 9.5, fontWeight: '900', letterSpacing: 1.1, marginBottom: 9 }, activityCard: { alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 22, borderWidth: 1, flexDirection: 'row', marginBottom: 10, padding: 10 }, selectedActivity: { backgroundColor: colors.primarySoft, borderColor: colors.primary }, activityImage: { borderRadius: 15, height: 82, width: 88 }, activityCopy: { flex: 1, justifyContent: 'center', marginLeft: 12 }, liveBadge: { alignSelf: 'flex-start', backgroundColor: colors.successSoft, borderRadius: 9, paddingHorizontal: 7, paddingVertical: 3 }, liveText: { color: colors.successText, fontSize: 8, fontWeight: '900' }, activityTitle: { color: colors.ink, fontSize: 14, fontWeight: '900', marginTop: 7 }, meta: { color: colors.body, fontSize: 10, marginTop: 5 }, selection: { alignItems: 'center', borderColor: colors.border, borderRadius: 12, borderWidth: 1, height: 24, justifyContent: 'center', width: 24 }, selectedSelection: { backgroundColor: colors.primary, borderColor: colors.primary },
  sectionRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, marginTop: 24 }, sectionTitle: { color: colors.ink, fontSize: 18, fontWeight: '900' }, sectionNote: { color: colors.body, fontSize: 10.5, marginTop: 3 }, count: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: 14, height: 30, justifyContent: 'center', width: 30 }, countText: { color: colors.primary, fontSize: 12, fontWeight: '900' },
  requestCard: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 21, borderWidth: 1, marginBottom: 12, padding: 13 }, personRow: { alignItems: 'center', flexDirection: 'row' }, avatar: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: 22, height: 48, justifyContent: 'center', width: 48 }, avatarText: { color: colors.primary, fontSize: 17, fontWeight: '900' }, personCopy: { flex: 1, marginLeft: 11 }, nameRow: { alignItems: 'center', flexDirection: 'row', gap: 5 }, personName: { color: colors.ink, fontSize: 13.5, fontWeight: '900' }, personMeta: { color: colors.body, fontSize: 10, marginTop: 4 }, viewProfile: { color: colors.primary, fontSize: 10, fontWeight: '800', marginTop: 5 },
  actions: { borderTopColor: colors.border, borderTopWidth: 1, flexDirection: 'row', gap: 9, marginTop: 12, paddingTop: 11 }, rejectButton: { alignItems: 'center', borderColor: colors.border, borderRadius: 14, borderWidth: 1, flex: 1, justifyContent: 'center', minHeight: 40 }, rejectText: { color: colors.textSecondary, fontSize: 11, fontWeight: '800' }, approveButton: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: 14, flex: 1, flexDirection: 'row', gap: 5, justifyContent: 'center', minHeight: 40 }, approveText: { color: colors.white, fontSize: 11, fontWeight: '900' },
  decisionState: { alignItems: 'center', borderRadius: 14, flexDirection: 'row', gap: 6, marginTop: 12, padding: 11 }, approvedState: { backgroundColor: colors.successSoft }, rejectedState: { backgroundColor: colors.matchSoft }, decisionText: { fontSize: 11, fontWeight: '800' },
});
