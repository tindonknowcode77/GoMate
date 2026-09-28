import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
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
                <View style={[styles.selection, selected && styles.selectedSelection]}><Ionicons color={selected ? '#FFFFFF' : '#A3ABBA'} name={selected ? 'checkmark' : 'ellipse-outline'} size={15} /></View>
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
                  <View style={styles.personCopy}><View style={styles.nameRow}><Text style={styles.personName}>{person.name}, {person.age}</Text>{person.verified && <Ionicons color="#438FF3" name="checkmark-circle" size={16} />}</View><Text numberOfLines={1} style={styles.personMeta}>{person.location} · {person.activitiesJoined} hoạt động</Text><Text style={styles.viewProfile}>Xem profile</Text></View>
                  <Ionicons color="#929BAE" name="chevron-forward" size={18} />
                </Pressable>
                {decision ? (
                  <View style={[styles.decisionState, decision === 'approved' ? styles.approvedState : styles.rejectedState]}><Ionicons color={decision === 'approved' ? '#238963' : '#B14B60'} name={decision === 'approved' ? 'checkmark-circle' : 'close-circle'} size={17} /><Text style={[styles.decisionText, { color: decision === 'approved' ? '#238963' : '#B14B60' }]}>{decision === 'approved' ? 'Đã duyệt thành viên' : 'Đã từ chối yêu cầu'}</Text></View>
                ) : (
                  <View style={styles.actions}><Pressable onPress={() => setDecisions((current) => ({ ...current, [decisionKey]: 'rejected' }))} style={styles.rejectButton}><Text style={styles.rejectText}>Từ chối</Text></Pressable><Pressable onPress={() => setDecisions((current) => ({ ...current, [decisionKey]: 'approved' }))} style={styles.approveButton}><Ionicons color="#FFFFFF" name="checkmark" size={17} /><Text style={styles.approveText}>Duyệt</Text></Pressable></View>
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
  safeArea: { backgroundColor: '#F8F9FC', flex: 1 }, content: { paddingBottom: 28 }, page: { alignSelf: 'center', maxWidth: layout.maxWidth, padding: 18, width: '100%' },
  listLabel: { color: '#8D96A9', fontSize: 9.5, fontWeight: '900', letterSpacing: 1.1, marginBottom: 9 }, activityCard: { alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#E6E9F0', borderRadius: 22, borderWidth: 1, flexDirection: 'row', marginBottom: 10, padding: 10 }, selectedActivity: { backgroundColor: '#FAF9FF', borderColor: '#7766F3' }, activityImage: { borderRadius: 15, height: 82, width: 88 }, activityCopy: { flex: 1, justifyContent: 'center', marginLeft: 12 }, liveBadge: { alignSelf: 'flex-start', backgroundColor: '#EAF8F2', borderRadius: 9, paddingHorizontal: 7, paddingVertical: 3 }, liveText: { color: '#268866', fontSize: 8, fontWeight: '900' }, activityTitle: { color: colors.ink, fontSize: 14, fontWeight: '900', marginTop: 7 }, meta: { color: colors.body, fontSize: 10, marginTop: 5 }, selection: { alignItems: 'center', borderColor: '#D8DCE5', borderRadius: 12, borderWidth: 1, height: 24, justifyContent: 'center', width: 24 }, selectedSelection: { backgroundColor: '#665DEF', borderColor: '#665DEF' },
  sectionRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, marginTop: 24 }, sectionTitle: { color: colors.ink, fontSize: 18, fontWeight: '900' }, sectionNote: { color: colors.body, fontSize: 10.5, marginTop: 3 }, count: { alignItems: 'center', backgroundColor: '#EFEEFF', borderRadius: 14, height: 30, justifyContent: 'center', width: 30 }, countText: { color: '#5E5CEB', fontSize: 12, fontWeight: '900' },
  requestCard: { backgroundColor: '#FFFFFF', borderColor: '#E7EAF1', borderRadius: 21, borderWidth: 1, marginBottom: 12, padding: 13 }, personRow: { alignItems: 'center', flexDirection: 'row' }, avatar: { alignItems: 'center', backgroundColor: '#ECEAFF', borderRadius: 22, height: 48, justifyContent: 'center', width: 48 }, avatarText: { color: '#5D5CEB', fontSize: 17, fontWeight: '900' }, personCopy: { flex: 1, marginLeft: 11 }, nameRow: { alignItems: 'center', flexDirection: 'row', gap: 5 }, personName: { color: colors.ink, fontSize: 13.5, fontWeight: '900' }, personMeta: { color: colors.body, fontSize: 10, marginTop: 4 }, viewProfile: { color: '#5E5CEB', fontSize: 10, fontWeight: '800', marginTop: 5 },
  actions: { borderTopColor: '#EEF0F4', borderTopWidth: 1, flexDirection: 'row', gap: 9, marginTop: 12, paddingTop: 11 }, rejectButton: { alignItems: 'center', borderColor: '#E2E5EC', borderRadius: 14, borderWidth: 1, flex: 1, justifyContent: 'center', minHeight: 40 }, rejectText: { color: '#68748A', fontSize: 11, fontWeight: '800' }, approveButton: { alignItems: 'center', backgroundColor: '#5E5CEB', borderRadius: 14, flex: 1, flexDirection: 'row', gap: 5, justifyContent: 'center', minHeight: 40 }, approveText: { color: '#FFFFFF', fontSize: 11, fontWeight: '900' },
  decisionState: { alignItems: 'center', borderRadius: 14, flexDirection: 'row', gap: 6, marginTop: 12, padding: 11 }, approvedState: { backgroundColor: '#EBF8F3' }, rejectedState: { backgroundColor: '#FFF0F2' }, decisionText: { fontSize: 11, fontWeight: '800' },
});
