import { Text } from '../components/LocalizedText';
import { Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native';
import { ComponentProps, ReactNode, useMemo, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, layout } from '../theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

export type ActivityFilters = {
  distance: number;
  time: string;
  categories: string[];
  budget: string;
  level: string;
  groupSize: string;
  availableOnly: boolean;
};

export const defaultActivityFilters: ActivityFilters = {
  distance: 25,
  time: 'Bất kỳ',
  categories: [],
  budget: 'Bất kỳ',
  level: 'Mọi trình độ',
  groupSize: 'Bất kỳ',
  availableOnly: true,
};

type FilterScreenProps = {
  initialFilters?: ActivityFilters;
  onApply: (filters: ActivityFilters) => void;
  onClose: () => void;
};

const distanceOptions = [5, 10, 25, 50];
const timeOptions = ['Bất kỳ', 'Hôm nay', 'Ngày mai', 'Cuối tuần'];
const categoryOptions: { icon: IconName; label: string }[] = [
  { icon: 'cafe-outline', label: 'Ăn uống' },
  { icon: 'fitness-outline', label: 'Thể thao' },
  { icon: 'airplane-outline', label: 'Du lịch' },
  { icon: 'game-controller-outline', label: 'Giải trí' },
  { icon: 'book-outline', label: 'Học hỏi' },
  { icon: 'ribbon-outline', label: 'Tình nguyện' },
];
const levelOptions = ['Mọi trình độ', 'Mới bắt đầu', 'Đã có kinh nghiệm'];
const groupOptions = ['Bất kỳ', '2–5 người', '6–10 người', '10+ người'];
const budgetOptions = ['Bất kỳ', 'Miễn phí', 'Dưới 100K', '100K–300K'];

export function FilterScreen({ initialFilters = defaultActivityFilters, onApply, onClose }: FilterScreenProps) {
  const [filters, setFilters] = useState<ActivityFilters>(initialFilters);
  const activeCount = useMemo(() => {
    let count = filters.categories.length;
    if (filters.distance !== defaultActivityFilters.distance) count += 1;
    if (filters.time !== defaultActivityFilters.time) count += 1;
    if (filters.budget !== defaultActivityFilters.budget) count += 1;
    if (filters.level !== defaultActivityFilters.level) count += 1;
    if (filters.groupSize !== defaultActivityFilters.groupSize) count += 1;
    if (!filters.availableOnly) count += 1;
    return count;
  }, [filters]);

  const toggleCategory = (category: string) => {
    setFilters((current) => ({
      ...current,
      categories: current.categories.includes(category)
        ? current.categories.filter((item) => item !== category)
        : [...current.categories, category],
    }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable accessibilityLabel="Đóng bộ lọc" onPress={onClose} style={styles.headerAction}>
          <Ionicons color={colors.ink} name="close" size={25} />
        </Pressable>
        <View style={styles.headerCopy}>
          <Text style={styles.headerTitle}>Bộ lọc Match</Text>
          <Text style={styles.headerSubtitle}>Chọn hoạt động phù hợp nhất</Text>
        </View>
        <Pressable onPress={() => setFilters(defaultActivityFilters)} style={styles.resetButton}>
          <Text style={styles.resetText}>Đặt lại</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.page}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryIcon}><Ionicons color="#5D5CED" name="options" size={19} /></View>
            <View style={styles.summaryCopy}>
              <Text style={styles.summaryTitle}>{activeCount || 'Chưa có'} bộ lọc tuỳ chỉnh</Text>
              <Text style={styles.summaryText}>Kết quả Match sẽ ưu tiên theo lựa chọn bên dưới.</Text>
            </View>
          </View>

          <FilterSection icon="navigate-outline" title="Khoảng cách">
            <View style={styles.sectionValueRow}>
              <Text style={styles.helperText}>Bán kính tìm kiếm</Text>
              <Text style={styles.valueText}>Tối đa {filters.distance} km</Text>
            </View>
            <View style={styles.optionRow}>
              {distanceOptions.map((distance) => <ChoiceChip key={distance} label={`${distance} km`} onPress={() => setFilters((current) => ({ ...current, distance }))} selected={filters.distance === distance} />)}
            </View>
          </FilterSection>

          <FilterSection icon="calendar-outline" title="Thời gian">
            <View style={styles.optionRow}>
              {timeOptions.map((time) => <ChoiceChip key={time} label={time} onPress={() => setFilters((current) => ({ ...current, time }))} selected={filters.time === time} />)}
            </View>
          </FilterSection>

          <FilterSection icon="grid-outline" title="Loại hoạt động">
            <View style={styles.optionRow}>
              {categoryOptions.map((category) => {
                const selected = filters.categories.includes(category.label);
                return (
                  <Pressable key={category.label} onPress={() => toggleCategory(category.label)} style={[styles.iconChoice, selected && styles.selectedChoice]}>
                    <Ionicons color={selected ? '#5F55EC' : '#68738A'} name={category.icon} size={17} />
                    <Text style={[styles.choiceText, selected && styles.selectedChoiceText]}>{category.label}</Text>
                    {selected && <Ionicons color="#5F55EC" name="checkmark" size={14} />}
                  </Pressable>
                );
              })}
            </View>
          </FilterSection>

          <FilterSection icon="speedometer-outline" title="Trình độ phù hợp">
            <View style={styles.optionRow}>
              {levelOptions.map((level) => <ChoiceChip key={level} label={level} onPress={() => setFilters((current) => ({ ...current, level }))} selected={filters.level === level} />)}
            </View>
          </FilterSection>

          <FilterSection icon="people-outline" title="Quy mô nhóm">
            <View style={styles.optionRow}>
              {groupOptions.map((groupSize) => <ChoiceChip key={groupSize} label={groupSize} onPress={() => setFilters((current) => ({ ...current, groupSize }))} selected={filters.groupSize === groupSize} />)}
            </View>
          </FilterSection>

          <FilterSection icon="wallet-outline" title="Ngân sách">
            <View style={styles.optionRow}>
              {budgetOptions.map((budget) => <ChoiceChip key={budget} label={budget} onPress={() => setFilters((current) => ({ ...current, budget }))} selected={filters.budget === budget} />)}
            </View>
          </FilterSection>

          <View style={styles.availabilityRow}>
            <View style={styles.availabilityIcon}><Ionicons color="#5D62EB" name="checkmark-circle-outline" size={21} /></View>
            <View style={styles.availabilityCopy}>
              <Text style={styles.availabilityTitle}>Chỉ hiện hoạt động còn chỗ</Text>
              <Text style={styles.availabilityText}>Ẩn các nhóm đã đủ thành viên.</Text>
            </View>
            <Switch onValueChange={(availableOnly) => setFilters((current) => ({ ...current, availableOnly }))} thumbColor="#FFFFFF" trackColor={{ false: '#D8DCE6', true: '#6B5DF2' }} value={filters.availableOnly} />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable onPress={() => onApply(filters)} style={({ pressed }) => pressed && styles.pressed}>
          <LinearGradient colors={['#A13CF4', '#5A58F2', '#2E8FF5']} style={styles.applyButton}>
            <Text style={styles.applyText}>Áp dụng bộ lọc</Text>
            <Ionicons color="#FFFFFF" name="arrow-forward" size={18} />
          </LinearGradient>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function FilterSection({ children, icon, title }: { children: ReactNode; icon: IconName; title: string }) {
  return <View style={styles.section}><View style={styles.sectionTitleRow}><View style={styles.sectionIcon}><Ionicons color="#5D62EB" name={icon} size={18} /></View><Text style={styles.sectionTitle}>{title}</Text></View>{children}</View>;
}

function ChoiceChip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return <Pressable onPress={onPress} style={[styles.choice, selected && styles.selectedChoice]}><Text style={[styles.choiceText, selected && styles.selectedChoiceText]}>{label}</Text>{selected && <Ionicons color="#5F55EC" name="checkmark" size={14} />}</Pressable>;
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#FFFFFF', flex: 1 },
  header: { alignItems: 'center', borderBottomColor: '#EEF0F4', borderBottomWidth: 1, flexDirection: 'row', minHeight: 68, paddingHorizontal: 14 },
  headerAction: { alignItems: 'center', height: 42, justifyContent: 'center', width: 42 },
  headerCopy: { alignItems: 'center', flex: 1 },
  headerTitle: { color: colors.ink, fontSize: 18, fontWeight: '900' },
  headerSubtitle: { color: colors.body, fontSize: 10.5, marginTop: 2 },
  resetButton: { alignItems: 'flex-end', justifyContent: 'center', minWidth: 58 },
  resetText: { color: colors.purple, fontSize: 13, fontWeight: '800' },
  scrollContent: { paddingBottom: 24 },
  page: { alignSelf: 'center', maxWidth: layout.maxWidth, paddingHorizontal: 18, width: '100%' },
  summaryCard: { alignItems: 'center', backgroundColor: '#F5F3FF', borderRadius: 19, flexDirection: 'row', marginTop: 16, padding: 14 },
  summaryIcon: { alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 14, height: 38, justifyContent: 'center', width: 38 },
  summaryCopy: { flex: 1, marginLeft: 11 },
  summaryTitle: { color: colors.ink, fontSize: 13, fontWeight: '900' },
  summaryText: { color: colors.body, fontSize: 10.5, marginTop: 3 },
  section: { borderBottomColor: '#EFF1F5', borderBottomWidth: 1, paddingVertical: 20 },
  sectionTitleRow: { alignItems: 'center', flexDirection: 'row', marginBottom: 14 },
  sectionIcon: { alignItems: 'center', backgroundColor: '#F0EFFF', borderRadius: 12, height: 32, justifyContent: 'center', width: 32 },
  sectionTitle: { color: colors.ink, fontSize: 15, fontWeight: '900', marginLeft: 10 },
  sectionValueRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  helperText: { color: colors.body, fontSize: 12 },
  valueText: { color: '#5F55EC', fontSize: 12, fontWeight: '800' },
  optionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 9 },
  choice: { alignItems: 'center', backgroundColor: '#F7F8FA', borderColor: '#EAEDF2', borderRadius: 15, borderWidth: 1, flexDirection: 'row', gap: 5, minHeight: 41, paddingHorizontal: 13 },
  choiceText: { color: '#68738A', fontSize: 12, fontWeight: '700' },
  selectedChoice: { backgroundColor: '#F0EDFF', borderColor: '#7560F5' },
  selectedChoiceText: { color: '#5F55EC', fontWeight: '900' },
  iconChoice: { alignItems: 'center', backgroundColor: '#F7F8FA', borderColor: '#EAEDF2', borderRadius: 15, borderWidth: 1, flexDirection: 'row', gap: 6, minHeight: 42, paddingHorizontal: 12 },
  availabilityRow: { alignItems: 'center', backgroundColor: '#F8F9FC', borderRadius: 20, flexDirection: 'row', marginTop: 20, padding: 15 },
  availabilityIcon: { alignItems: 'center', backgroundColor: '#EEEDFF', borderRadius: 14, height: 38, justifyContent: 'center', width: 38 },
  availabilityCopy: { flex: 1, marginLeft: 11 },
  availabilityTitle: { color: colors.ink, fontSize: 13, fontWeight: '900' },
  availabilityText: { color: colors.body, fontSize: 10.5, marginTop: 3 },
  footer: { backgroundColor: '#FFFFFF', borderTopColor: '#EEF0F4', borderTopWidth: 1, padding: 14 },
  applyButton: { alignItems: 'center', alignSelf: 'center', borderRadius: 20, flexDirection: 'row', gap: 8, height: 54, justifyContent: 'center', maxWidth: layout.maxWidth, width: '100%' },
  applyText: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },
  pressed: { opacity: 0.75 },
});
