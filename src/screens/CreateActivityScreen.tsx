import { Text } from '../components/LocalizedText';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { FormField } from '../components/FormField';
import { GradientButton } from '../components/GradientButton';
import { colors, layout } from '../theme';

const categories = ['Ăn uống', 'Thể thao', 'Du lịch', 'Giải trí'];
const times = ['Hôm nay', 'Ngày mai', 'Cuối tuần'];
const groupSizes = ['2–4', '5–8', '9–15'];

type CreateActivityScreenProps = {
  onCreated: () => void;
};

export function CreateActivityScreen({ onCreated }: CreateActivityScreenProps) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [time, setTime] = useState(times[1]);
  const [groupSize, setGroupSize] = useState(groupSizes[1]);
  const [photoUri, setPhotoUri] = useState<string>();

  const pickPhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      mediaTypes: ['images'],
      quality: 0.85,
    });
    if (!result.canceled) setPhotoUri(result.assets[0].uri);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
      <View style={styles.page}>
        <View style={styles.headingRow}>
          <View>
            <Text style={styles.title}>Tạo hoạt động</Text>
            <Text style={styles.subtitle}>Chia sẻ kế hoạch và tìm đúng đồng đội.</Text>
          </View>
          <View style={styles.headingIcon}>
            <Ionicons color="#5E5CEB" name="add-circle-outline" size={25} />
          </View>
        </View>

        {photoUri ? (
          <View style={styles.selectedPhotoWrap}>
            <Image source={{ uri: photoUri }} style={styles.selectedPhoto} />
            <Pressable accessibilityLabel="Thay ảnh hoạt động" onPress={pickPhoto} style={styles.changePhotoButton}>
              <Ionicons color="#FFFFFF" name="camera" size={18} />
            </Pressable>
          </View>
        ) : (
          <View style={styles.photoPlaceholder}>
            <View style={styles.photoIcon}>
              <Ionicons color="#5D61EC" name="image-outline" size={27} />
            </View>
            <Text style={styles.photoTitle}>Thêm ảnh hoạt động</Text>
            <Text style={styles.photoHint}>Ảnh rõ ràng giúp bài đăng nổi bật hơn.</Text>
            <Pressable onPress={pickPhoto} style={styles.photoButton}>
              <Text style={styles.photoButtonText}>Chọn ảnh</Text>
            </Pressable>
          </View>
        )}

        <View style={styles.formCard}>
          <FormField icon="sparkles-outline" label="Tên hoạt động" onChangeText={setTitle} placeholder="Ví dụ: Cà phê cuối tuần" value={title} />
          <FormField icon="location-outline" label="Địa điểm" onChangeText={setLocation} placeholder="Chọn khu vực hoặc địa chỉ" value={location} />
          <FormField icon="reader-outline" label="Mô tả ngắn" multiline onChangeText={setDescription} placeholder="Hoạt động sẽ diễn ra như thế nào?" value={description} />

          <ChoiceGroup label="Danh mục" options={categories} selected={category} onSelect={setCategory} />
          <ChoiceGroup label="Thời gian" options={times} selected={time} onSelect={setTime} />
          <ChoiceGroup label="Quy mô nhóm" options={groupSizes} selected={groupSize} onSelect={setGroupSize} />
        </View>

        <View style={styles.safetyNote}>
          <Ionicons color="#5E5CEB" name="shield-checkmark-outline" size={20} />
          <Text style={styles.safetyText}>Bạn có thể duyệt thành viên trước khi xác nhận họ tham gia.</Text>
        </View>
        <GradientButton label="Đăng hoạt động" onPress={onCreated} style={styles.publishButton} />
      </View>
    </ScrollView>
  );
}

function ChoiceGroup({ label, options, selected, onSelect }: { label: string; options: string[]; selected: string; onSelect: (value: string) => void }) {
  return (
    <View style={styles.choiceGroup}>
      <Text style={styles.choiceLabel}>{label}</Text>
      <View style={styles.choiceRow}>
        {options.map((option) => (
          <Pressable key={option} onPress={() => onSelect(option)} style={[styles.choice, selected === option && styles.selectedChoice]}>
            <Text style={[styles.choiceText, selected === option && styles.selectedChoiceText]}>{option}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: { paddingBottom: 30 },
  page: { alignSelf: 'center', maxWidth: layout.maxWidth, paddingHorizontal: 18, paddingTop: 21, width: '100%' },
  headingRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  title: { color: colors.ink, fontSize: 27, fontWeight: '900', letterSpacing: -0.6 },
  subtitle: { color: colors.body, fontSize: 13, marginTop: 5 },
  headingIcon: { alignItems: 'center', backgroundColor: '#F0EFFF', borderRadius: 18, height: 44, justifyContent: 'center', width: 44 },
  photoPlaceholder: { alignItems: 'center', backgroundColor: '#F8F8FE', borderColor: '#D9DCEC', borderRadius: 24, borderStyle: 'dashed', borderWidth: 1.3, marginTop: 22, padding: 23 },
  photoIcon: { alignItems: 'center', backgroundColor: '#EFEDFF', borderRadius: 18, height: 46, justifyContent: 'center', width: 46 },
  photoTitle: { color: colors.ink, fontSize: 14, fontWeight: '800', marginTop: 11 },
  photoHint: { color: colors.body, fontSize: 11, marginTop: 4 },
  photoButton: { backgroundColor: '#FFFFFF', borderColor: '#DDE0EB', borderRadius: 14, borderWidth: 1, marginTop: 13, paddingHorizontal: 14, paddingVertical: 8 },
  photoButtonText: { color: '#5D5CEB', fontSize: 11, fontWeight: '800' },
  selectedPhotoWrap: { borderRadius: 24, height: 205, marginTop: 22, overflow: 'hidden', position: 'relative' },
  selectedPhoto: { height: '100%', width: '100%' },
  changePhotoButton: { alignItems: 'center', backgroundColor: 'rgba(17,28,52,0.72)', borderRadius: 18, bottom: 14, height: 40, justifyContent: 'center', position: 'absolute', right: 14, width: 40 },
  formCard: { backgroundColor: '#FFFFFF', borderColor: '#E9EBF2', borderRadius: 24, borderWidth: 1, gap: 15, marginTop: 16, padding: 17 },
  choiceGroup: { gap: 9 },
  choiceLabel: { color: '#52607B', fontSize: 13, fontWeight: '700' },
  choiceRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  choice: { backgroundColor: '#F6F7FA', borderColor: '#EAECF2', borderRadius: 14, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 9 },
  selectedChoice: { backgroundColor: '#EFEDFF', borderColor: '#7161F2' },
  choiceText: { color: '#6C778E', fontSize: 11, fontWeight: '600' },
  selectedChoiceText: { color: '#5E57E8', fontWeight: '800' },
  safetyNote: { alignItems: 'center', backgroundColor: '#F2F1FF', borderRadius: 17, flexDirection: 'row', marginTop: 16, padding: 13 },
  safetyText: { color: '#66718A', flex: 1, fontSize: 11, lineHeight: 16, marginLeft: 9 },
  publishButton: { marginTop: 17 },
});
