# Decision log

Record decisions here when they materially affect architecture, dependencies,
security, the data model, or product behavior. Keep the newest decision at the
top. Small implementation details belong only in `DEVELOPMENT_LOG.md`.

### 2026-09-28 - Separate Match management from full-screen discovery

- **Status:** Accepted
- **Context:** Match now needs to support discovery, pending join requests, and
  host-side member approval without crowding the swipe experience.
- **Decision:** Use the Match tab as a persistent management hub and launch the
  swipe deck as a full-screen nested flow without bottom navigation. Keep
  pending and hosted activity management as separate full-screen routes.
- **Consequences:** Discovery stays immersive while request state and host tools
  remain easy to revisit. Nested routes carry explicit return context until a
  navigation library and backend state are introduced.
- **Supersedes:** None.

### 2026-09-28 - Make Match the only activity discovery surface

- **Status:** Accepted
- **Context:** Showing activities on both Home and Match duplicated content and
  weakened the focused swipe-to-discover experience.
- **Decision:** Keep Home as a dashboard for entry points and personal status;
  show activity recommendations only in Match, where each card supports
  horizontal decisions and vertical detail exploration.
- **Consequences:** Activity filtering belongs to Match, while joined and hosted
  items remain accessible from My Activities. The gesture responder must keep
  vertical scrolling and horizontal swiping distinct.
- **Supersedes:** The Home list-discovery portion of "Use a single-card swipe
  deck for Match".

### 2026-09-28 - Use a single-card swipe deck for Match

- **Status:** Accepted
- **Context:** Match should support quick activity discovery rather than repeat
  the list-based Home experience.
- **Decision:** Present exactly one activity card at a time with horizontal
  swipe gestures and explicit like/skip actions; keep list discovery on Home.
- **Consequences:** Home and Match serve distinct browsing modes while sharing
  activity data and filters. Swipe state is local until the backend provides
  persisted recommendations and decisions.
- **Supersedes:** None.

### 2026-09-28 - Keep interests inside the basic profile

- **Status:** Accepted
- **Context:** Interest selection and a separate trip-photo section made initial
  onboarding longer than necessary.
- **Decision:** Use a two-step Login/Register → Complete Profile flow, keep
  interest chips in Basic Information, and remove the trip-photo gallery.
- **Consequences:** Onboarding is shorter and requires photo-library access only
  for the avatar; interest and extended media management can evolve later in the
  main profile experience.
- **Supersedes:** The standalone Select Interests step and the onboarding media
  gallery decision below.

### 2026-09-28 - Use Expo ImagePicker for onboarding media

- **Status:** Accepted
- **Context:** Complete Profile needs real multi-photo selection and camera
  capture rather than a visual-only placeholder.
- **Decision:** Use the SDK-compatible `expo-image-picker` module for avatar,
  gallery, and camera interactions, with a six-photo UI limit.
- **Consequences:** The app requests media/camera permission only when needed,
  does not request microphone access, and keeps selected URIs local until
  backend upload and persistence are added.
- **Supersedes:** The earlier image-picker placeholder implementation.

### 2026-09-28 - Make the repository root the Expo mobile application

- **Status:** Accepted
- **Context:** The requested GoMate deliverable is a React Native/Expo mobile
  flow, while the repository root contained only a Vite starter. A second nested
  project would duplicate configuration and obscure the primary application.
- **Decision:** Replace the Vite starter at the repository root with an Expo SDK
  57 TypeScript app and keep screens/components under the existing `src/`.
- **Consequences:** Mobile development runs directly from the repository root;
  the unused Vite scaffold is removed, and web-specific code would need to be
  reintroduced as a separate application if required later.
- **Supersedes:** None.

## Template

### YYYY-MM-DD - Decision title

- **Status:** Proposed | Accepted | Superseded
- **Context:** What problem or constraint required a decision?
- **Decision:** What was chosen?
- **Consequences:** What becomes easier, harder, or constrained?
- **Supersedes:** Link or title of an older decision, if applicable.

