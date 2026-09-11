# Study Battles — Product Requirements Document

**Status:** Planning / MVP  
**Working name:** Study Battles  
**Target:** RevenueCat Shipaton 2026 — Next Gen  
**Core positioning:** Turn studying into a competition with your friends.

---

## 1. Product Vision

Study Battles is a mobile learning app that turns study material into short competitive battles between friends.

The product should feel like:

> **Duolingo's engagement + modern fintech-level cleanliness + competitive-game feedback**

The app is **not** positioned as another AI study app.

AI is the engine that generates and explains questions.

**The product is the battle.**

### Core loop

```text
Study material
      ↓
Generate battle
      ↓
Challenge friend
      ↓
⚔️ Battle
      ↓
Win / lose
      ↓
Review mistakes
      ↓
Practice weak topics
      ↓
Rematch
      ↓
⚔️ Battle again
```

---

# 2. Target User

Primary user:

- Students aged 13+
- High-school / university / academic-program students
- Students who already study with friends
- Students who enjoy competition, streaks, rankings, or challenges
- Students who want a faster way to test whether they actually understand something

Initial wedge:

> **Students preparing for exams with classmates.**

The founder is also a student and should use classmates as early testers.

---

# 3. Problem

Most AI study products focus on generating:

- flashcards
- summaries
- quizzes
- study plans
- explanations

That market is crowded.

Study Battles takes a different angle:

> **Studying is more engaging when there is another person to beat, challenge, or rematch.**

The app should turn passive AI-generated practice into an active competitive loop.

---

# 4. Core Value Proposition

### Short version

> **Turn studying into a battle with your friends.**

### Expanded version

> Bring your study material, generate a battle, challenge a friend, compete, learn from your mistakes, and rematch.

---

# 5. MVP Scope

The MVP should contain only the features necessary to prove the core loop.

## A. Onboarding

The first-time experience should be fast.

Possible flow:

1. Choose why you study:
   - Exams
   - School
   - Self-learning
   - Competition

2. Choose subjects:
   - Mathematics
   - Biology
   - Chemistry
   - Physics
   - History
   - Custom subject

3. Enter the main experience.

Avoid a long onboarding flow.

---

## B. Create Battle

User chooses:

- Subject
- Topic
- Difficulty
  - Easy
  - Medium
  - Hard
- Number of questions
  - 5
  - 10
  - 15

Optional later:

- Paste study material
- Upload PDF
- Paste notes
- Import content

For the earliest prototype, static/fake questions can be used before connecting AI.

---

## C. Battle Generation

AI generates a battle from the selected material/topic.

Generation should feel intentional rather than like a generic loading spinner.

Possible states:

```text
Reading your material...
Finding important concepts...
Building questions...
Adjusting difficulty...
Battle ready ⚔️
```

The final UX should be fast enough that users do not feel like they are waiting for an AI pipeline.

---

# 6. Battle Lobby

After generation:

```text
BATTLE READY ⚔️

Biology
Cell Division

10 questions · Medium

[ Challenge a friend ]

[ Practice solo ]
```

The app must support solo practice so the product remains useful when no friend is available.

Friend battles are the primary growth/retention loop.

---

# 7. Challenge System

A user should be able to create a challenge that another user can open.

Possible MVP implementation:

- Challenge link
- Short challenge code
- Deep link later

Example:

> Abdullah challenged you to a Biology Battle.

Recipient opens the challenge and can accept it.

The challenge should communicate:

- challenger
- subject
- topic
- question count
- difficulty

---

# 8. Battle Mechanics

## MVP recommendation

Start with **async/hybrid battles**, not real-time multiplayer.

Both players answer the same generated battle independently.

Once both have finished:

```text
Abdullah  8/10
David     7/10
```

This avoids the complexity of WebSockets/realtime multiplayer while preserving the competitive loop.

### Future version

Upgrade to real-time battles if the product proves fun and there is enough development time.

---

# 9. Battle Screen

The battle screen should be the most polished screen in the app.

Concept:

```text
BIOLOGY

Abdullah       David
   7             6

● ● ● ● ● ● ● ○ ○ ○

Which structure...

[A] Nucleus

[B] Ribosome

[C] Cytoplasm

[D] Mitochondria

        07
```

Core elements:

- Question
- Four answer choices
- Timer
- Question progress
- Player score
- Opponent progress where appropriate

### Interaction

When an answer is selected:

Correct:

> 🔥 Correct! +10

Wrong:

> Not quite.
> Short explanation...

Then immediately continue.

Do not make the user wait through unnecessary screens.

---

# 10. Results Screen

The result should feel like a competitive-game moment.

Example:

```text
YOU WON 🏆

Abdullah  8
David     7

+120 XP

🔥 3 Battle Streak

Biology
████████░░ 80%

You struggled with:
Cell-cycle checkpoints

[ Practice weak topic ]

[ Rematch David ]
```

Results should include:

- Winner
- Scores
- XP earned
- Streak
- Accuracy
- Weak topics
- Question-by-question review
- Rematch CTA

---

# 11. Learning Loop

The most important educational feature is not merely showing the score.

The app should identify what the user got wrong.

Example:

> You struggled with cell-cycle checkpoints.

Then:

> Practice this topic

The app can generate a short targeted drill.

This creates:

```text
Battle
 ↓
Mistakes
 ↓
Weak topic
 ↓
Targeted practice
 ↓
Rematch
```

This is a key product differentiator.

---

# 12. Engagement System

Borrow the *principles* of highly engaging learning products without copying their visual identity.

Potential mechanics:

- XP
- Battle streaks
- Progress
- Friend challenges
- Rematches
- Weak-topic drills
- Personal rating
- Win/loss history
- Daily challenge
- Lightweight rankings

Avoid turning the UI into a badge collection.

Every engagement mechanic must support learning or competition.

---

# 13. Growth Loop

The growth loop should be built around challenges.

```text
User creates battle
       ↓
Challenges friend
       ↓
Friend opens challenge
       ↓
Friend plays
       ↓
Friend sees result
       ↓
Friend challenges someone else
       ↓
New player
```

This is where **Layers** can potentially become useful.

The share itself should be a natural part of the product, not an artificial referral request.

---

# 14. Notifications

**OneSignal** is a natural integration.

Potential notifications:

- Friend challenge received
- Friend completed a challenge
- Friend beat your score
- Rematch available
- Daily practice reminder
- Streak reminder

Example:

> ⚔️ David challenged you.

> 🏆 David beat your Biology score. Rematch?

Notifications should be useful and sparse.

---

# 15. AI

AI should be treated as infrastructure, not the headline.

AI responsibilities:

- Generate questions
- Generate answer options
- Set/adjust difficulty
- Explain incorrect answers
- Identify weak concepts
- Generate targeted practice
- Potentially generate follow-up questions

The user should think:

> "I can battle my friend."

Not:

> "This app uses AI."

---

# 16. Noise Clarification

**Important correction from earlier planning: Noise is NOT the AI question-generation backend.**

Noise's Shipaton role is primarily **app growth/marketing**, not powering the AI inside Study Battles.

RevenueCat's current Shipaton documentation says the Noise category is **Most Viral App**. The requirement is to use Noise as part of the app's growth strategy, with judges looking at repeatable creative formats, virality, scalability, and conversion. citehttps://www.shipaton.com/categories/most-viral-app

Noise's own documentation describes campaigns, UGC playbooks, slideshow playbooks, app-store integrations, and campaign reporting. citehttps://getnoise.com/docs

### Therefore:

Do NOT make Study Battles depend on Noise for core functionality.

If Noise is unavailable in Nigeria or the account is being blocked, the app architecture should remain completely unaffected.

Possible Noise use later:

```text
Study Battles
     ↓
Generate interesting battle moments/content
     ↓
Create repeatable social content
     ↓
Noise campaign
     ↓
Acquire users
```

Examples:

- "Can you beat a medical student?"
- "10 Biology questions in 60 seconds"
- "We challenged 100 students..."
- User battle-result content
- Subject-specific challenge formats

If Noise access remains unavailable, simply skip the Noise integration rather than building the product around it.

---

# 17. RevenueCat

RevenueCat should power the monetization layer.

Possible free tier:

- Limited battles/day
- Short battles
- Basic explanations
- Basic progress

Possible Pro tier:

- Unlimited battles
- Longer battles
- Advanced explanations
- Weak-topic drills
- Detailed performance
- Custom study material
- More advanced AI features

Exact limits and pricing should be decided after estimating AI costs.

Do not make the free product useless.

The competitive loop must remain playable without paying.

---

# 18. Initial Sponsor Strategy

We should NOT force every Ship Kit perk into the product.

Priority:

### 1. RevenueCat
Core monetization.

### 2. OneSignal
Natural challenge/rematch notifications.

### 3. Layers
Natural challenge-sharing/growth loop.

### 4. Noise
Optional growth/viral marketing category if the service is accessible and useful.

### Later / optional

- Tenjin: analytics/attribution
- Stripe: web-to-app payment funnel
- Argent: development/debugging
- Replit: development/building
- Emergent: prototyping
- Junie: coding assistance

The app should be judged as a product first, sponsor integration second.

---

# 19. Technical Stack

## Mobile

**React Native + Expo + TypeScript**

Why:

- User already knows TypeScript/React
- Strong mobile ecosystem
- Android development works on Linux
- Can target iOS later when hardware is available
- Expo reduces native setup complexity

## Navigation

**Expo Router**

## Animation

**React Native Reanimated**

Use for:

- Answer feedback
- Progress animations
- XP counters
- Screen transitions
- Result reveals
- Battle interactions

## Gestures

**React Native Gesture Handler**

Use where gestures genuinely improve the experience.

## Backend

**Supabase**

Potential responsibilities:

- Auth
- PostgreSQL database
- User profiles
- Battles
- Questions
- Results
- Challenges
- Progress
- Friend relationships
- Realtime features if needed later

## AI

Keep the AI provider abstracted behind a server-side service.

The app should not depend directly on a specific AI provider.

Potential architecture:

```text
React Native
     ↓
Backend/API
     ↓
AI service
     ↓
Question generation
```

This allows the AI provider to change without rewriting the mobile app.

---

# 20. Development Strategy

Do not generate the entire production app with an AI builder and blindly accept the result.

Use AI builders as accelerators.

### Phase 1 — UI + fake battle

```text
Expo project
 ↓
Screens
 ↓
Navigation
 ↓
Battle UI
 ↓
Fake questions
 ↓
Results
 ↓
Rematch
```

Goal:

**Make the core experience feel fun before adding infrastructure.**

### Phase 2 — Backend

```text
Supabase
 ↓
Auth
 ↓
Users
 ↓
Battles
 ↓
Challenges
 ↓
Results
```

### Phase 3 — AI

```text
AI service
 ↓
Question generation
 ↓
Explanations
 ↓
Weak-topic detection
 ↓
Targeted drills
```

### Phase 4 — Ship Kit

```text
RevenueCat
OneSignal
Layers
Optional Noise
```

### Phase 5 — Polish

- Animation
- Loading states
- Empty states
- Error states
- Haptics where appropriate
- Accessibility
- Performance
- Onboarding
- Demo flow

---

# 21. Design Direction

## Design principles

### Clean

- Generous spacing
- Strong typography
- Clear hierarchy
- Rounded cards
- Minimal navigation
- Few competing elements

### Playful

- Micro-interactions
- XP animation
- Progress movement
- Battle feedback
- Small celebrations

### Competitive

- Scores
- Streaks
- Challenge states
- Rematches
- Rankings/progress

### Avoid

- Dashboard overload
- Excessive badges
- Childish education visuals
- Generic AI-chat UI
- Giant paragraphs
- Unnecessary gradients/effects
- Too many screens between actions

---

# 22. MVP Screens

Initial screen list:

1. Onboarding
2. Home
3. Create Battle
4. Battle Generation
5. Battle Ready / Challenge
6. Battle
7. Results
8. Weak Topic / Practice
9. Challenge Acceptance
10. Profile / Progress
11. Subscription / Pro

Do not build a large settings system early.

---

# 23. Home Screen

The home screen should prioritize action.

Possible structure:

```text
Good afternoon, Abdullah

🔥 3 day streak

Ready for a battle?

[ Create Battle ]

Your battles
------------------
⚔️ Biology vs David
Waiting for you

⚔️ Chemistry vs Sarah
You won 8–6

Practice
------------------
Cell Division
Weak topic · 62%

[ Practice ]
```

The user should know what to do within seconds.

---

# 24. Demo Story

The Next Gen submission is judged through the video and source code rather than requiring a store listing. citehttps://www.shipaton.com/next-gen

The demo should tell one simple story:

### Scene 1 — Problem

"I study with my classmates, but studying together usually means reading notes or sending questions in a group chat."

### Scene 2 — Create

Show study material/topic.

Generate battle.

### Scene 3 — Challenge

Challenge a friend.

### Scene 4 — Battle

Show polished battle interaction.

### Scene 5 — Result

Show winner, mistakes, weak topic.

### Scene 6 — Rematch

Practice weakness.

Rematch.

### Scene 7 — Monetization

Briefly show the Pro offering and RevenueCat integration.

### Scene 8 — Sponsor integrations

Show OneSignal/Layers/etc. only where relevant.

The demo should make the product understandable very quickly.

---

# 25. Next Gen Submission Requirements

Current Shipaton Next Gen information says:

- Student must be aged 13+
- Active student
- No store submission required
- No paid Apple/Google developer account required
- Submit a video
- Submit source code
- Students under the age of majority need parent/legal guardian consent

Official page:

https://www.shipaton.com/next-gen

The general Shipaton submission deadline is:

**September 30, 2026 at 11:45 PM PDT.**

For Next Gen, the important deliverables are:

- Finished app/demo
- Demo video
- Public source repository
- Clear README
- Open-source license
- Clean project structure
- Clear setup instructions
- Devpost submission

---

# 26. Success Criteria

The MVP succeeds if a student can:

1. Open the app.
2. Choose a topic.
3. Generate a battle.
4. Challenge a friend.
5. Complete a battle.
6. See a meaningful result.
7. Understand what they got wrong.
8. Practice the weak area.
9. Rematch.

The most important question:

> **Would a student voluntarily challenge a classmate with this?**

If yes, we have something.

---

# 27. Non-Goals for MVP

Do NOT build initially:

- Huge social network
- Public chat
- Complex friend graph
- Real-time multiplayer
- Leaderboards across the entire world
- Teacher dashboards
- School administration tools
- Dozens of AI modes
- Complex gamification
- Native iOS-specific features
- Every Ship Kit sponsor integration
- Full content marketplace

---

# 28. Product North Star

The app should make users think:

> **"I need to beat my friend, but I'm actually studying while doing it."**

That is the product.

Not:

> "Cool AI."

Not:

> "Nice flashcards."

Not:

> "Another education dashboard."

**Study Battles = competition-powered studying.**
