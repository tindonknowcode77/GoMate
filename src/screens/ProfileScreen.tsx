import { ComponentProps, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GradientButton } from '../components/GradientButton';
import { OnboardingHeader } from '../components/OnboardingHeader';
import { colors, layout } from '../theme';

const defaultAvatar = require('../assets/profile-avatar.png');

type IconName = ComponentProps<typeof Ionicons>['name'];

const profileInterests = [
  { icon: 'cafe-outline' as IconName, label: 'Coffee' },
  { icon: 'airplane-outline' as IconName, label: 'Travel' },
  { icon: 'fitness-outline' as IconName, label: 'Running' },
  { icon: 'musical-notes-outline' as IconName, label: 'Concert' },
  { icon: 'restaurant-outline' as IconName, label: 'Food' },
];

const regions = ['Ho Chi Minh City', 'Ha Noi', 'Da Nang'];

type ProfileScreenProps = {
  onFinish: () => void;
  onSkip: () => void;
};

export function ProfileScreen({ onFinish, onSkip }: ProfileScreenProps) {
  const { width } = useWindowDimensions();
  const [name, setName] = useState('Minh Phan');
  const [age, setAge] = useState(22);
  const [bio, setBio] = useState('Coffee, badminton and spontaneous trips ✈️');
  const [region, setRegion] = useState(regions[0]);
  const [selectedInterests, setSelectedInterests] = useState<Set<string>>(
    () => new Set(['Coffee', 'Travel']),
  );
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const contentWidth = Math.min(width - 28, layout.maxWidth);

  const pickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      mediaTypes: ['images'],
      quality: 0.85,
    });

    if (!result.canceled) setAvatarUri(result.assets[0].uri);
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests((current) => {
      const next = new Set(current);
      if (next.has(interest)) next.delete(interest);
      else next.add(interest);
      return next;
    });
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <OnboardingHeader onSkip={onSkip} step={2} totalSteps={2} />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.page, { width: contentWidth }]}> 
            <Text style={styles.title}>Complete your profile</Text>
            <Text style={styles.subtitle}>
              A few details help you meet the right people.
            </Text>

            <View style={styles.sectionCard}>
              <SectionHeading
                subtitle="Keep it simple and easy to recognize."
                title="Basic information"
              />

              <View style={styles.avatarRow}>
                <View style={styles.avatarFrame}>
                  <Image
                    source={avatarUri ? { uri: avatarUri } : defaultAvatar}
                    style={styles.avatar}
                  />
                  <Pressable
                    accessibilityLabel="Change profile photo"
                    onPress={pickAvatar}
                    style={styles.avatarCamera}
                  >
                    <Ionicons color="#FFFFFF" name="camera" size={16} />
                  </Pressable>
                </View>
                <View style={styles.avatarCopy}>
                  <Text style={styles.avatarTitle}>Profile photo</Text>
                  <Text style={styles.avatarHint}>A clear photo works best.</Text>
                </View>
                <Pressable onPress={pickAvatar} style={styles.changeButton}>
                  <Text style={styles.changeButtonText}>Change</Text>
                </Pressable>
              </View>

              <CompactInput
                icon="person-outline"
                label="Name"
                onChangeText={setName}
                value={name}
              />

              <View style={styles.quickGroup}>
                <View style={styles.quickLabelRow}>
                  <Ionicons color={colors.muted} name="calendar-outline" size={18} />
                  <Text style={styles.quickLabel}>Age</Text>
                </View>
                <View style={styles.stepper}>
                  <Pressable
                    accessibilityLabel="Decrease age"
                    onPress={() => setAge((current) => Math.max(18, current - 1))}
                    style={styles.stepperButton}
                  >
                    <Ionicons color={colors.ink} name="remove" size={19} />
                  </Pressable>
                  <Text style={styles.ageValue}>{age}</Text>
                  <Pressable
                    accessibilityLabel="Increase age"
                    onPress={() => setAge((current) => Math.min(99, current + 1))}
                    style={styles.stepperButton}
                  >
                    <Ionicons color={colors.ink} name="add" size={19} />
                  </Pressable>
                </View>
              </View>

              <View style={styles.bioGroup}>
                <View style={styles.quickLabelRow}>
                  <Ionicons color={colors.muted} name="chatbubble-ellipses-outline" size={18} />
                  <Text style={styles.quickLabel}>Short intro</Text>
                  <Text style={styles.characterCount}>{bio.length}/80</Text>
                </View>
                <TextInput
                  maxLength={80}
                  multiline
                  onChangeText={setBio}
                  placeholder="A quick line about you"
                  placeholderTextColor="#A5AEC0"
                  style={styles.bioInput}
                  value={bio}
                />
              </View>

              <View style={styles.choiceGroup}>
                <View style={styles.quickLabelRow}>
                  <Ionicons color={colors.muted} name="location-outline" size={18} />
                  <Text style={styles.quickLabel}>Area</Text>
                </View>
                <View style={styles.choiceRow}>
                  {regions.map((item) => {
                    const selected = region === item;
                    return (
                      <Pressable
                        key={item}
                        onPress={() => setRegion(item)}
                        style={[styles.choiceChip, selected && styles.selectedChoiceChip]}
                      >
                        <Text style={[styles.choiceText, selected && styles.selectedChoiceText]}>
                          {item.replace('Ho Chi Minh City', 'HCMC')}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              <View style={styles.choiceGroup}>
                <View style={styles.quickLabelRow}>
                  <Ionicons color={colors.muted} name="sparkles-outline" size={18} />
                  <Text style={styles.quickLabel}>Interests</Text>
                </View>
                <View style={styles.choiceRow}>
                  {profileInterests.map((item) => {
                    const selected = selectedInterests.has(item.label);
                    return (
                      <Pressable
                        key={item.label}
                        onPress={() => toggleInterest(item.label)}
                        style={[styles.interestChip, selected && styles.selectedInterestChip]}
                      >
                        <Ionicons
                          color={selected ? '#FFFFFF' : '#66718A'}
                          name={item.icon}
                          size={15}
                        />
                        <Text
                          style={[styles.interestText, selected && styles.selectedInterestText]}
                        >
                          {item.label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            </View>

            <GradientButton label="Finish" onPress={onFinish} style={styles.finishButton} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

type SectionHeadingProps = {
  title: string;
  subtitle: string;
};

function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <View style={styles.sectionHeading}>
      <View style={styles.sectionHeadingCopy}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

type CompactInputProps = {
  icon: IconName;
  label: string;
  value: string;
  onChangeText: (value: string) => void;
};

function CompactInput({ icon, label, value, onChangeText }: CompactInputProps) {
  return (
    <View style={styles.compactInput}>
      <Ionicons color={colors.muted} name={icon} size={19} />
      <View style={styles.compactInputCopy}>
        <Text style={styles.compactLabel}>{label}</Text>
        <TextInput
          onChangeText={onChangeText}
          placeholderTextColor="#A5AEC0"
          style={styles.compactTextInput}
          value={value}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#F7F8FC', flex: 1 },
  flex: { flex: 1 },
  scrollContent: { paddingBottom: 34 },
  page: { alignSelf: 'center' },
  title: {
    color: colors.ink,
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.7,
    marginTop: 28,
    textAlign: 'center',
  },
  subtitle: {
    alignSelf: 'center',
    color: colors.body,
    fontSize: 16,
    lineHeight: 23,
    marginBottom: 26,
    marginTop: 8,
    maxWidth: 320,
    textAlign: 'center',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#ECEEF4',
    borderRadius: 26,
    borderWidth: 1,
    marginBottom: 16,
    padding: 18,
    shadowColor: '#243A63',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.055,
    shadowRadius: 20,
    elevation: 3,
  },
  sectionHeading: { marginBottom: 22 },
  sectionHeadingCopy: { flex: 1 },
  sectionTitle: { color: colors.ink, fontSize: 18, fontWeight: '800' },
  sectionSubtitle: { color: colors.body, fontSize: 12, lineHeight: 17, marginTop: 2 },
  avatarRow: {
    alignItems: 'center',
    borderBottomColor: '#EEF0F5',
    borderBottomWidth: 1,
    flexDirection: 'row',
    marginBottom: 16,
    paddingBottom: 18,
  },
  avatarFrame: { height: 68, position: 'relative', width: 68 },
  avatar: { borderRadius: 24, height: 68, width: 68 },
  avatarCamera: {
    alignItems: 'center',
    backgroundColor: '#5867F3',
    borderColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 2,
    bottom: -3,
    height: 28,
    justifyContent: 'center',
    position: 'absolute',
    right: -3,
    width: 28,
  },
  avatarCopy: { flex: 1, marginLeft: 13 },
  avatarTitle: { color: colors.ink, fontSize: 15, fontWeight: '700' },
  avatarHint: { color: colors.body, fontSize: 12, marginTop: 3 },
  changeButton: { backgroundColor: '#F0F1FF', borderRadius: 14, paddingHorizontal: 12, paddingVertical: 8 },
  changeButtonText: { color: '#595FED', fontSize: 12, fontWeight: '700' },
  compactInput: {
    alignItems: 'center',
    borderColor: '#E6E9F1',
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 60,
    paddingHorizontal: 14,
  },
  compactInputCopy: { flex: 1, marginLeft: 11 },
  compactLabel: { color: colors.body, fontSize: 11, fontWeight: '600' },
  compactTextInput: { color: colors.ink, fontSize: 16, fontWeight: '600', paddingHorizontal: 0, paddingVertical: 3 },
  quickGroup: {
    alignItems: 'center',
    borderBottomColor: '#EEF0F5',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingBottom: 16,
  },
  quickLabelRow: { alignItems: 'center', flexDirection: 'row' },
  quickLabel: { color: '#52607B', fontSize: 13, fontWeight: '700', marginLeft: 7 },
  stepper: { alignItems: 'center', backgroundColor: '#F7F8FC', borderRadius: 15, flexDirection: 'row', padding: 4 },
  stepperButton: { alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 11, height: 32, justifyContent: 'center', width: 32 },
  ageValue: { color: colors.ink, fontSize: 16, fontWeight: '800', minWidth: 42, textAlign: 'center' },
  bioGroup: { borderBottomColor: '#EEF0F5', borderBottomWidth: 1, paddingVertical: 16 },
  characterCount: { color: colors.muted, fontSize: 11, marginLeft: 'auto' },
  bioInput: {
    backgroundColor: '#F8F9FC',
    borderRadius: 14,
    color: colors.ink,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
    minHeight: 66,
    paddingHorizontal: 13,
    paddingVertical: 11,
    textAlignVertical: 'top',
  },
  choiceGroup: { marginTop: 17 },
  choiceRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 11 },
  choiceChip: { backgroundColor: '#F7F8FC', borderColor: '#E8EAF1', borderRadius: 15, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 9 },
  selectedChoiceChip: { backgroundColor: '#EFEEFF', borderColor: '#7364F4' },
  choiceText: { color: '#69748A', fontSize: 12, fontWeight: '600' },
  selectedChoiceText: { color: '#5D55E8' },
  interestChip: { alignItems: 'center', backgroundColor: '#F7F8FC', borderColor: '#E8EAF1', borderRadius: 16, borderWidth: 1, flexDirection: 'row', gap: 5, paddingHorizontal: 11, paddingVertical: 9 },
  selectedInterestChip: { backgroundColor: '#6262EF', borderColor: '#6262EF' },
  interestText: { color: '#66718A', fontSize: 12, fontWeight: '600' },
  selectedInterestText: { color: '#FFFFFF' },
  finishButton: { marginHorizontal: 3, marginTop: 8 },
});
