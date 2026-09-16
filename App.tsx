import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar as RNStatusBar,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  COLOR_SEQUENCE,
  DEFAULT_GAME_SETTINGS,
  GameSettings,
} from './src/config/gameConfig';
import { createInitialGrid, applyTapToGrid } from './src/utils/gridUtils';
import { Grid } from './src/components/Grid';
import { ColorSequenceBar } from './src/components/ColorSequenceBar';
import { Controls } from './src/components/Controls';

export default function App() {
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_GAME_SETTINGS);
  const [grid, setGrid] = useState<number[][]>(() =>
    createInitialGrid(DEFAULT_GAME_SETTINGS.rows, DEFAULT_GAME_SETTINGS.cols, 0)
  );
  const [moves, setMoves] = useState<number>(0);

  // Handle square tap
  const handleTapSquare = useCallback(
    (row: number, col: number) => {
      setGrid((prevGrid) =>
        applyTapToGrid(prevGrid, row, col, COLOR_SEQUENCE.length, settings)
      );
      setMoves((prev) => prev + 1);
    },
    [settings]
  );

  // Reset grid back to initial all-white state
  const handleReset = useCallback(() => {
    setGrid(createInitialGrid(settings.rows, settings.cols, 0));
    setMoves(0);
  }, [settings.rows, settings.cols]);

  // Update settings (and recreate grid if dimensions changed)
  const handleUpdateSettings = useCallback(
    (newSettings: Partial<GameSettings>) => {
      setSettings((prev) => {
        const updated = { ...prev, ...newSettings };
        if (
          (newSettings.rows !== undefined && newSettings.rows !== prev.rows) ||
          (newSettings.cols !== undefined && newSettings.cols !== prev.cols)
        ) {
          setGrid(createInitialGrid(updated.rows, updated.cols, 0));
          setMoves(0);
        }
        return updated;
      });
    },
    []
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appTitle}>Squares</Text>
          <Text style={styles.appSubtitle}>
            Tap a square to cycle surrounding colors
          </Text>
        </View>

        {/* Color Sequence Loop Visualizer */}
        <ColorSequenceBar sequence={COLOR_SEQUENCE} />

        {/* Game Controls & Mode Selectors */}
        <Controls
          moves={moves}
          settings={settings}
          onReset={handleReset}
          onUpdateSettings={handleUpdateSettings}
        />

        {/* Main Interactive Grid */}
        <View style={styles.gridWrapper}>
          <Grid
            grid={grid}
            colorSequence={COLOR_SEQUENCE}
            onTapSquare={handleTapSquare}
          />
        </View>

        {/* Bottom Status Tip */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Mode: {settings.neighborMode === 'all' ? '8-Way (✦)' : '4-Way (+)'}
            {' • '}
            {settings.includeTappedSquare ? 'Tapped Included' : 'Surrounding Only'}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 4,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
    color: '#0F172A',
  },
  appSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
  },
  gridWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    paddingVertical: 12,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  footerText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },
});
