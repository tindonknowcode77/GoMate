import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '../components/ScreenHeader';
import { Activity } from '../data/activities';
import { communityMembers, createHostProfile, PersonProfile } from '../data/people';
import { colors, layout } from '../theme';

export function HostMembersScreen({ activity, onBack, onViewProfile }: { activity: Activity; onBack: () => void; onViewProfile: (person: PersonProfile) => void }) {
  const host = createHostProfile(activity.host);
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeader onBack={onBack} subtitle={activity.title} title="Host & thành viên" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.page}>
          <Text style={styles.sectionLabel}>HOST</Text>
          <Pressable onPress={() => onViewProfile(host)} style={({ pressed }) => [styles.hostCard, pressed && styles.pressed]}>
            <View style={styles.hostAvatar}><Text style={styles.hostInitial}>{activity.host.charAt(0)}</Text></View>
            <View style={styles.copy}><View style={styles.nameLine}><Text style={styles.hostName}>{activity.host}</Text><Ionicons color="#438FF3" name="checkmark-circle" size={18} /></View><Text style={styles.note}>Host uy tín • Đã tổ chức 18 hoạt động</Text><Text style={styles.viewProfile}>Xem profile</Text></View>
            <Ionicons color="#939CAE" name="chevron-forward" size={18} />
          </Pressable>
          <View style={styles.trustCard}><Ionicons color="#29AE80" name="shield-checkmark" size={20} /><Text style={styles.trustText}>Danh tính host đã được GoMate xác minh.</Text></View>
          <Text style={styles.sectionLabel}>THÀNH VIÊN ĐÃ THAM GIA</Text>
          {communityMembers.map((member) => (
            <Pressable key={member.id} onPress={() => onViewProfile(member)} style={({ pressed }) => [styles.memberRow, pressed && styles.pressed]}>
              <View style={styles.memberAvatar}><Text style={styles.memberInitial}>{member.initial}</Text></View>
              <View style={styles.copy}><View style={styles.nameLine}><Text style={styles.memberName}>{member.name}</Text>{member.verified && <Ionicons color="#438FF3" name="checkmark-circle" size={15} />}</View><Text style={styles.note}>{member.location} • {member.activitiesJoined} hoạt động</Text><Text style={styles.viewProfile}>Xem profile</Text></View>
              <Ionicons color="#939CAE" name="chevron-forward" size={18} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#F8F9FC', flex: 1 },
  content: { paddingBottom: 24 },
  page: { alignSelf: 'center', maxWidth: layout.maxWidth, padding: 18, width: '100%' },
  sectionLabel: { color: '#8D96A9', fontSize: 9.5, fontWeight: '900', letterSpacing: 1.1, marginBottom: 9, marginTop: 10 },
  hostCard: { alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#E6E9F1', borderRadius: 21, borderWidth: 1, flexDirection: 'row', padding: 14 },
  hostAvatar: { alignItems: 'center', backgroundColor: '#EDEBFF', borderRadius: 23, height: 52, justifyContent: 'center', width: 52 },
  hostInitial: { color: '#5E5CEB', fontSize: 18, fontWeight: '900' },
  copy: { flex: 1, marginLeft: 11 },
  nameLine: { alignItems: 'center', flexDirection: 'row', gap: 5 },
  hostName: { color: colors.ink, fontSize: 15, fontWeight: '900' },
  note: { color: colors.body, fontSize: 10.5, marginTop: 4 },
  viewProfile: { color: '#5E5CEB', fontSize: 9.5, fontWeight: '800', marginTop: 5 },
  trustCard: { alignItems: 'center', backgroundColor: '#ECF9F4', borderRadius: 15, flexDirection: 'row', marginTop: 10, padding: 12 },
  trustText: { color: '#4A7869', fontSize: 10.5, marginLeft: 8 },
  memberRow: { alignItems: 'center', backgroundColor: '#FFFFFF', borderBottomColor: '#EEF0F4', borderBottomWidth: 1, flexDirection: 'row', padding: 14 },
  memberAvatar: { alignItems: 'center', backgroundColor: '#F0EFFF', borderRadius: 20, height: 42, justifyContent: 'center', width: 42 },
  memberInitial: { color: '#5E5CEB', fontSize: 14, fontWeight: '900' },
  memberName: { color: colors.ink, fontSize: 13, fontWeight: '800' },
  pressed: { opacity: 0.68 },
});
