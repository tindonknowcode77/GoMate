# Development log

This file records completed development work. Keep the newest entry at the top
and follow `templates/development-log-entry.md`.

## 2026-09-28 - Make activity discovery edge-to-edge

### Summary

- Removed the rounded activity-card container from full-screen discovery.
- Made the activity image and detail content fill the complete viewport below
  the back/filter header while preserving vertical scrolling and horizontal
  swipe gestures.
- Moved the activity counter and skip/join actions into floating overlays so the
  activity remains the only primary content on screen.

### Files changed

- `src/components/ActivityCard.tsx`
- `src/screens/MatchScreen.tsx`

### Verification

- `npm.cmd run typecheck`: Passed.
- `npm.cmd run lint`: Passed.
- `npx.cmd expo export --platform android --output-dir dist`: Passed.

### Remaining work

- None for the requested UI change.

## 2026-09-28 - Turn Match into an activity management hub

### Summary

- Replaced the Match tab's direct swipe deck with a hub for discovering
  activities, reviewing liked/pending requests, and managing hosted activities.
- Moved activity discovery into a full-screen flow that hides bottom navigation,
  keeps back/filter actions in the upper-left area, supports horizontal
  decisions, and preserves vertical detail scrolling.
- Added pending-request history, hosted-activity member approval/rejection, and
  individual member/host profile screens.
- Made host and participant rows actionable from activity details and preserved
  the correct return path through nested full-screen flows.

### Files changed

- `src/data/people.ts`
- `src/screens/MatchHubScreen.tsx`
- `src/screens/PendingActivitiesScreen.tsx`
- `src/screens/ManageActivitiesScreen.tsx`
- `src/screens/MemberProfileScreen.tsx`
- `src/screens/HostMembersScreen.tsx`
- `src/screens/MatchScreen.tsx`
- `src/screens/MainApp.tsx`
- `README.md`, `docs/DECISIONS.md`

### Verification

- `npm.cmd run typecheck`: Passed.
- `npm.cmd run lint`: Passed.
- `npx.cmd expo-doctor`: Passed all 21 checks.
- `npx.cmd expo export --platform android --output-dir dist`: Passed.

### Remaining work

- Persist join requests, host approvals, activity ownership, and profile data
  through the backend when its APIs are available.

## 2026-09-28 - Complete the main app and expand Match details

### Summary

- Reworked Home into a clean dashboard with no activity feed; all activity
  discovery now happens exclusively in Match.
- Expanded Match cards into vertically scrollable activity detail views while
  preserving horizontal skip/join gestures, replaced the heart action with a
  verification-style check, and added host/member access.
- Rebuilt the filter around activity-specific criteria with an active-filter
  summary, clearer categories, level, group size, budget, availability, and a
  proper no-results state.
- Added Create Activity, Messages, Chat, Profile, Edit Profile, Notifications,
  My Activities, Host & Members, and Join Confirmation screens and connected
  all flows through a five-tab application shell.
- Connected the Create Activity photo action to the device media library with a
  responsive selected-image preview.
- Used only the four activity images supplied in `src/assets/Activity-image/`.

### Files changed

- `src/components/ActivityCard.tsx`, `src/components/AppHeader.tsx`
- `src/components/BottomNav.tsx`, `src/components/ScreenHeader.tsx`
- `src/screens/HomeScreen.tsx`, `src/screens/MatchScreen.tsx`
- `src/screens/FilterScreen.tsx`, `src/screens/MainApp.tsx`
- `src/screens/CreateActivityScreen.tsx`, `src/screens/MessagesScreen.tsx`
- `src/screens/ChatScreen.tsx`, `src/screens/UserProfileScreen.tsx`
- `src/screens/EditProfileScreen.tsx`, `src/screens/NotificationsScreen.tsx`
- `src/screens/MyActivitiesScreen.tsx`, `src/screens/HostMembersScreen.tsx`
- `src/screens/MatchSuccessScreen.tsx`, `README.md`

### Verification

- `npm.cmd run typecheck`: Passed.
- `npm.cmd run lint`: Passed.
- `npx.cmd expo-doctor`: Passed all 21 checks.
- `npx.cmd expo export --platform android --output-dir dist`: Android bundle
  passed and included all four supplied activity images.

### Remaining work

- Replace fixture content and local navigation state with backend APIs and
  persistent authentication, activity, match, and messaging data.

## 2026-09-28 - Build Home, Match, Filter, and production-style auth

### Summary

- Added a polished Home discovery feed with greeting, search, category chips,
  filter access, and responsive activity cards.
- Added a Match experience that renders one activity post at a time with native
  swipe gestures, animated like/skip feedback, action buttons, and a filter
  shortcut.
- Added a full-screen activity filter with distance, age, time, category, and
  budget controls; applied distance/category filters affect Home and Match.
- Redesigned Login/Register to match the main product, routing Login directly to
  Home and new registrations through Complete Profile.
- Added a two-tab Home/Match bottom navigation and integrated the four activity
  images supplied in `src/assets/Activity-image/`.

### Files changed

- `App.tsx`, `README.md`
- `src/data/activities.ts`
- `src/components/ActivityCard.tsx`
- `src/components/AppHeader.tsx`
- `src/components/BottomNav.tsx`
- `src/screens/AuthScreen.tsx`
- `src/screens/HomeScreen.tsx`
- `src/screens/MatchScreen.tsx`
- `src/screens/FilterScreen.tsx`
- `src/screens/MainApp.tsx`
- `src/assets/Activity-image/*`

### Verification

- `npm run typecheck`: Passed.
- `npm run lint`: Passed.
- `npx expo-doctor`: Passed all 21 checks.
- `npx expo export --platform android --output-dir dist`: Android bundle passed
  with all four activity assets.

### Remaining work

- Replace local activity fixtures and filter state with backend data when the
  activity API is available.

## 2026-09-28 - Simplify profile onboarding flow

### Summary

- Removed the standalone Select Interests screen and routed authentication
  directly to Complete Profile.
- Removed the Personal & Trip Photos section, multi-photo gallery, camera flow,
  and unused camera permission.
- Kept avatar selection and interest chips inside Basic Information so both can
  be updated from the profile.
- Updated onboarding progress from three steps to two and removed the unused
  interest screen/card components.

### Files changed

- `App.tsx`
- `src/components/OnboardingHeader.tsx`
- `src/screens/ProfileScreen.tsx`
- `src/screens/InterestsScreen.tsx` (removed)
- `src/components/InterestCard.tsx` (removed)
- `app.json`, `README.md`

### Verification

- `npm run typecheck`: Passed.
- `npm run lint`: Passed.
- `npx expo-doctor`: Passed all checks.
- `npx expo export --platform android --output-dir dist`: Android bundle passed.

### Remaining work

- Persist the basic profile and interest selections when the backend API is
  available.

## 2026-09-28 - Modernize interests and profile onboarding

### Summary

- Replaced image-based interest tiles with a responsive two- or three-column
  icon card grid, gradient selected states, selection count, and a fixed Next
  action.
- Redesigned Complete Profile as two clean cards for basic information and
  personal/trip photos.
- Added quick age controls, area and interest chips, a compact bio, editable
  avatar, multi-image library selection, camera capture, photo removal, and a
  six-photo limit.
- Configured purpose-specific photo/camera permission copy and disabled the
  unused Android microphone permission.
- Removed the unused interest image sprite and added the SDK-compatible
  `expo-image-picker` dependency.

### Files changed

- `src/components/InterestCard.tsx`
- `src/screens/InterestsScreen.tsx`
- `src/screens/ProfileScreen.tsx`
- `src/assets/interests-sprite.png` (removed)
- `app.json`, `package.json`, `package-lock.json`

### Verification

- `npm run typecheck`: Passed.
- `npm run lint`: Passed.
- `npx expo-doctor`: Passed all 21 checks.
- `npx expo export --platform android --output-dir dist`: Android bundle passed.

### Remaining work

- Persist profile fields and selected media to the backend when its API is
  available.

## 2026-09-28 - Build GoMate mobile onboarding flow

### Summary

- Migrated the root project from the Vite starter to Expo SDK 57 with strict
  TypeScript.
- Built responsive Login/Register, Select Interests, and Complete Profile
  screens with reusable inputs, gradients, buttons, branding, and progress UI.
- Added tab switching, password visibility, editable fields, multi-select
  interests, an image-picker placeholder, and navigation between screens.
- Generated and integrated a landscape illustration, nine-interest sprite, and
  sample profile portrait matching the visual references.
- Removed unused Vite scaffold files so Expo no longer misidentifies the old
  `src/app` directory as an Expo Router root.

### Files changed

- `App.tsx`, `index.ts`, `app.json`, `tsconfig.json`, `eslint.config.js`
- `package.json`, `package-lock.json`, `.gitignore`, `README.md`, `AGENTS.md`
- `src/components/*.tsx`, `src/screens/*.tsx`, `src/theme.ts`
- `src/assets/onboarding-landscape.png`
- `src/assets/interests-sprite.png`
- `src/assets/profile-avatar.png`
- Removed the unused Vite entry points, styles, layouts, services, and public
  starter assets.

### Verification

- `npm run typecheck`: Passed.
- `npm run lint`: Passed.
- `npx expo-doctor`: Passed all 21 checks.
- `npx expo export --platform android --output-dir dist`: Android bundle passed.
- `npm audit --omit=dev`: Reported 10 moderate transitive issues in the Expo
  toolchain; npm's suggested fix is an incompatible Expo downgrade.

### Remaining work

- Replace the image-picker placeholder with a real media-library flow when
  profile persistence is implemented.
- Recheck the Expo toolchain audit advisories when a compatible SDK update is
  available; no forced dependency downgrade was applied.

## 2026-09-28 - Add project documentation workflow

### Summary

- Added repository-wide agent instructions requiring documentation after every
  coding task.
- Added a shared development log, decision log, and reusable entry template.
- Extended the mobile-app instructions so its tasks follow the same log.

### Files changed

- `AGENTS.md`
- `GoMate-FE/AGENTS.md`
- `docs/README.md`
- `docs/DEVELOPMENT_LOG.md`
- `docs/DECISIONS.md`
- `docs/templates/development-log-entry.md`

### Verification

- Reviewed the documentation structure and relative paths.
- No application tests were run because this task changes documentation only.

### Remaining work

- None.

