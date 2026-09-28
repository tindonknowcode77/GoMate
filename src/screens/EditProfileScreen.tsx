import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FormField } from '../components/FormField';
import { GradientButton } from '../components/GradientButton';
import { ScreenHeader } from '../components/ScreenHeader';
import { layout } from '../theme';

const avatar = require('../assets/profile-avatar.png');
const interests = ['Coffee', 'Travel', 'Running', 'Concert', 'Food'];

export function EditProfileScreen({ onBack, onSaved }: { onBack: () => void; onSaved: () => void }) {
  const [name, setName] = useState('Minh Phan');
  const [bio, setBio] = useState('Coffee, badminton và những chuyến đi ngẫu hứng ✈️');
  const [location, setLocation] = useState('Ho Chi Minh City');
  const [selected, setSelected] = useState(() => new Set(['Coffee', 'Travel']));
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeader onBack={onBack} title="Chỉnh sửa hồ sơ" />
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.page}>
          <View style={styles.avatarArea}>
            <Image source={avatar} style={styles.avatar} />
            <Pressable style={styles.changePhoto}><Ionicons color="#FFFFFF" name="camera" size={17} /></Pressable>
            <Text style={styles.changeText}>Thay ảnh đại diện</Text>
          </View>
          <View style={styles.card}>
            <FormField icon="person-outline" label="Họ và tên" onChangeText={setName} value={name} />
            <FormField icon="location-outline" label="Khu vực" onChangeText={setLocation} value={location} />
            <FormField icon="reader-outline" label="Giới thiệu" multiline onChangeText={setBio} value={bio} />
            <View>
              <Text style={styles.interestLabel}>Sở thích</Text>
              <View style={styles.interestRow}>
                {interests.map((interest) => {
                  const active = selected.has(interest);
                  return <Pressable key={interest} onPress={() => setSelected((current) => { const next = new Set(current); if (next.has(interest)) next.delete(interest); else next.add(interest); return next; })} style={[styles.interest, active && styles.activeInterest]}><Text style={[styles.interestText, active && styles.activeInterestText]}>{interest}</Text></Pressable>;
                })}
              </View>
            </View>
          </View>
          <GradientButton label="Lưu thay đổi" onPress={onSaved} style={styles.saveButton} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#F8F9FC', flex: 1 },
  scrollContent: { paddingBottom: 26 },
  page: { alignSelf: 'center', maxWidth: layout.maxWidth, padding: 18, width: '100%' },
  avatarArea: { alignItems: 'center', marginVertical: 8 },
  avatar: { borderRadius: 43, height: 86, width: 86 },
  changePhoto: { alignItems: 'center', backgroundColor: '#5E5CEB', borderColor: '#FFFFFF', borderRadius: 15, borderWidth: 2, bottom: 19, height: 30, justifyContent: 'center', marginBottom: -16, marginLeft: 61, width: 30 },
  changeText: { color: '#5E5CEB', fontSize: 11, fontWeight: '700', marginTop: 5 },
  card: { backgroundColor: '#FFFFFF', borderColor: '#E8EBF2', borderRadius: 24, borderWidth: 1, gap: 15, marginTop: 14, padding: 17 },
  interestLabel: { color: '#53617D', fontSize: 15, fontWeight: '600', marginBottom: 9 },
  interestRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  interest: { backgroundColor: '#F5F6F9', borderColor: '#E7E9EF', borderRadius: 14, borderWidth: 1, paddingHorizontal: 11, paddingVertical: 8 },
  activeInterest: { backgroundColor: '#EFEDFF', borderColor: '#6E60EF' },
  interestText: { color: '#68738A', fontSize: 11, fontWeight: '600' },
  activeInterestText: { color: '#5E57E8', fontWeight: '800' },
  saveButton: { marginTop: 17 },
});
