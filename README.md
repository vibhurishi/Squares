# Squares 🟩

A clean, responsive mobile game built with **React Native (Expo)** and **TypeScript**.

Tap any square on the grid to cycle the color of all adjacent surrounding squares in a continuous loop.

---

## 🎮 How It Works

- The game starts with a grid of **White** squares.
- When you tap a square, the **8 surrounding squares** (top, bottom, left, right, and diagonals) change to the next color in the cycle.
- **The Color Cycle**:
  $$\text{White} \longrightarrow \text{Blue} \longrightarrow \text{Orange} \longrightarrow \text{Red} \longrightarrow \text{Black} \longrightarrow \text{White} \dots$$
- **Example**:
  - Tapping a **White** square turns its neighbors **Blue**.
  - Tapping a **Blue** square turns its neighbors **Orange**.
  - Boundary handling ensures squares on edges and corners change only valid existing neighbors.

---

## ✨ Features

- 📱 **Cross-Platform**: Runs natively on iOS and Android via Expo Go, and in any web browser.
- 📐 **Multiple Grid Sizes**: Choose between **5×5**, **10×10**, or dense **20×20** grids with automatic adaptive sizing.
- ⚙️ **Configurable Rules & Gameplay**:
  - Toggle between **8-way (✦)** and **4-way (+)** neighbor modes.
  - Choose whether the tapped square itself also changes color.
  - Choose whether surrounding squares match the tapped square's next step or advance independently.
- 🎨 **Easily Configurable Color Palette**: Add, remove, or rearrange colors directly in [`src/config/gameConfig.ts`](./src/config/gameConfig.ts).
- ↺ **Reset & Move Tracking**: Tracks the number of taps and includes an instant reset button.

---

## 🛠 Project Structure

```
Squares/
├── App.tsx                     # Main app screen, state, and header
├── src/
│   ├── config/
│   │   └── gameConfig.ts       # Configurable color sequence and game settings
│   ├── utils/
│   │   └── gridUtils.ts        # Grid calculation and neighbor detection algorithms
│   └── components/
│       ├── Square.tsx          # Responsive, animated square tile
│       ├── Grid.tsx            # Centered grid container with dynamic gap spacing
│       ├── ColorSequenceBar.tsx# Visual indicator of the cyclical sequence
│       └── Controls.tsx        # Moves counter, reset button, and settings modal
├── scripts/
│   └── test-logic.mjs          # Unit tests verifying cyclical transitions
└── package.json
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the App

- **In Web Browser**:
  ```bash
  npm run web
  ```
- **On Physical Phone (Expo Go)**:
  ```bash
  npx expo start
  ```
  Scan the terminal QR code with the iOS Camera or Android Expo Go app.
- **On iOS Simulator** *(macOS with Xcode)*:
  ```bash
  npm run ios
  ```
- **On Android Emulator**:
  ```bash
  npm run android
  ```

### 3. Run Automated Tests
```bash
npm test
```

---

## 🎨 Customizing the Color Sequence

Open [`src/config/gameConfig.ts`](./src/config/gameConfig.ts) to rearrange, change, or add colors:

```typescript
export const COLOR_SEQUENCE: ColorDefinition[] = [
  { id: 'white', name: 'White', hex: '#FFFFFF', borderColor: '#D1D5DB', textColor: '#1F2937' },
  { id: 'blue', name: 'Blue', hex: '#2563EB', borderColor: '#1D4ED8', textColor: '#FFFFFF' },
  { id: 'orange', name: 'Orange', hex: '#F97316', borderColor: '#EA580C', textColor: '#FFFFFF' },
  { id: 'red', name: 'Red', hex: '#DC2626', borderColor: '#B91C1C', textColor: '#FFFFFF' },
  { id: 'black', name: 'Black', hex: '#18181B', borderColor: '#3F3F46', textColor: '#FFFFFF' },
];
```

The game automatically adapts to whatever sequence and length you specify!
