import { ImageSourcePropType } from 'react-native';

export type ActivityDraft = {
  name: string;
  category: string;
  description: string;
  cover?: ImageSourcePropType | { uri: string };
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  maxParticipants: string;
  estimatedCost: string;
  requirements: string;
};

export async function publishActivityDraft(draft: ActivityDraft) {
  // TODO(api): replace this local adapter when the backend exposes activity creation.
  await Promise.resolve();
  return { id: `local-${Date.now()}`, ...draft };
}
