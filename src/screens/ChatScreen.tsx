import { Text } from '../components/LocalizedText';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '../components/ScreenHeader';
import { Conversation } from './MessagesScreen';
import { colors, layout } from '../theme';
import { useLanguage } from '../i18n/LanguageContext';

type ChatScreenProps = {
  conversation: Conversation;
  onBack: () => void;
};

export function ChatScreen({ conversation, onBack }: ChatScreenProps) {
  const { translate } = useLanguage();
  const [message, setMessage] = useState('');
  const [sentMessages, setSentMessages] = useState<string[]>([]);
  const send = () => {
    const clean = message.trim();
    if (!clean) return;
    setSentMessages((current) => [...current, clean]);
    setMessage('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <ScreenHeader onBack={onBack} subtitle={conversation.activity} title={conversation.name} right={<Ionicons color={colors.ink} name="ellipsis-horizontal" size={22} />} />
        <ScrollView contentContainerStyle={styles.messages} showsVerticalScrollIndicator={false}>
          <Text style={styles.dayLabel}>Hôm nay</Text>
          <View style={styles.theirBubble}><Text style={styles.theirText}>Chào Minh, bạn đã xem thông tin hoạt động chưa?</Text></View>
          <View style={styles.myBubble}><Text style={styles.myText}>Mình xem rồi, lịch này rất phù hợp.</Text></View>
          <View style={styles.theirBubble}><Text style={styles.theirText}>{conversation.message}</Text></View>
          {sentMessages.map((item, index) => (
            <View key={`${item}-${index}`} style={styles.myBubble}><Text style={styles.myText}>{item}</Text></View>
          ))}
        </ScrollView>
        <View style={styles.composer}>
          <Pressable style={styles.addButton}><Ionicons color={colors.textSecondary} name="add" size={23} /></Pressable>
          <TextInput multiline onChangeText={setMessage} placeholder={translate('Nhập tin nhắn...')} placeholderTextColor={colors.textMuted} style={styles.input} value={message} />
          <Pressable onPress={send}>
            <View style={styles.sendButton}>
              <Ionicons color={colors.white} name="send" size={18} />
            </View>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.surface, flex: 1 },
  flex: { flex: 1 },
  messages: { alignSelf: 'center', flexGrow: 1, maxWidth: layout.maxWidth, padding: 18, width: '100%' },
  dayLabel: { color: colors.textMuted, fontSize: 10, marginBottom: 18, textAlign: 'center' },
  theirBubble: { alignSelf: 'flex-start', backgroundColor: colors.surfaceMuted, borderRadius: 18, borderTopLeftRadius: 6, marginBottom: 10, maxWidth: '79%', paddingHorizontal: 14, paddingVertical: 11 },
  theirText: { color: colors.textSecondary, fontSize: 13, lineHeight: 19 },
  myBubble: { alignSelf: 'flex-end', backgroundColor: colors.primary, borderRadius: 18, borderTopRightRadius: 6, marginBottom: 10, maxWidth: '79%', paddingHorizontal: 14, paddingVertical: 11 },
  myText: { color: colors.white, fontSize: 13, lineHeight: 19 },
  composer: { alignItems: 'flex-end', borderTopColor: colors.border, borderTopWidth: 1, flexDirection: 'row', gap: 9, padding: 12 },
  addButton: { alignItems: 'center', backgroundColor: colors.surfaceMuted, borderRadius: 18, height: 38, justifyContent: 'center', width: 38 },
  input: { backgroundColor: colors.surfaceMuted, borderRadius: 19, color: colors.ink, flex: 1, fontSize: 13, maxHeight: 90, minHeight: 40, paddingHorizontal: 14, paddingVertical: 10 },
  sendButton: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: 19, height: 40, justifyContent: 'center', width: 40 },
});
