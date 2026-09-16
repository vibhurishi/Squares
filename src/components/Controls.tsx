import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Modal,
  ScrollView,
} from 'react-native';
import { GameSettings, NeighborMode, CycleRule } from '../config/gameConfig';

interface ControlsProps {
  moves: number;
  settings: GameSettings;
  onReset: () => void;
  onUpdateSettings: (newSettings: Partial<GameSettings>) => void;
}

const GRID_SIZE_OPTIONS = [5, 10, 20];

export const Controls: React.FC<ControlsProps> = ({
  moves,
  settings,
  onReset,
  onUpdateSettings,
}) => {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <View style={styles.container}>
      {/* Top action bar: Moves counter & Quick Actions */}
      <View style={styles.topRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeLabel}>MOVES</Text>
          <Text style={styles.badgeValue}>{moves}</Text>
        </View>

        <View style={styles.actionButtons}>
          <Pressable
            onPress={() => setIsSettingsOpen(true)}
            style={styles.iconButton}
            accessibilityRole="button"
            accessibilityLabel="Settings"
          >
            <Text style={styles.iconText}>⚙ Settings</Text>
          </Pressable>

          <Pressable
            onPress={() => setIsHelpOpen(true)}
            style={styles.iconButton}
            accessibilityRole="button"
            accessibilityLabel="How it works"
          >
            <Text style={styles.iconText}>ℹ Info</Text>
          </Pressable>

          <Pressable
            onPress={onReset}
            style={[styles.iconButton, styles.resetButton]}
            accessibilityRole="button"
            accessibilityLabel="Reset Grid"
          >
            <Text style={styles.resetButtonText}>↺ Reset</Text>
          </Pressable>
        </View>
      </View>

      {/* Grid Size Quick Selector */}
      <View style={styles.gridSizeRow}>
        <Text style={styles.selectorLabel}>Grid Size:</Text>
        <View style={styles.sizePills}>
          {GRID_SIZE_OPTIONS.map((size) => {
            const isActive = settings.rows === size && settings.cols === size;
            return (
              <Pressable
                key={`size-${size}`}
                onPress={() => onUpdateSettings({ rows: size, cols: size })}
                style={[styles.sizePill, isActive && styles.sizePillActive]}
              >
                <Text
                  style={[
                    styles.sizePillText,
                    isActive && styles.sizePillTextActive,
                  ]}
                >
                  {size}×{size}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Settings Modal */}
      <Modal
        visible={isSettingsOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsSettingsOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Game Options</Text>
              <Pressable onPress={() => setIsSettingsOpen(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </Pressable>
            </View>

            <ScrollView contentContainerStyle={styles.modalBody}>
              {/* Surrounding neighbor mode */}
              <View style={styles.settingItem}>
                <Text style={styles.settingLabel}>Surrounding Neighbors</Text>
                <Text style={styles.settingDescription}>
                  Choose which neighbor squares are affected upon tap.
                </Text>
                <View style={styles.toggleRow}>
                  <Pressable
                    style={[
                      styles.toggleOption,
                      settings.neighborMode === 'orthogonal' && styles.toggleOptionActive,
                    ]}
                    onPress={() => onUpdateSettings({ neighborMode: 'orthogonal' })}
                  >
                    <Text
                      style={[
                        styles.toggleText,
                        settings.neighborMode === 'orthogonal' && styles.toggleTextActive,
                      ]}
                    >
                      4-Way (+) Orthogonal
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.toggleOption,
                      settings.neighborMode === 'all' && styles.toggleOptionActive,
                    ]}
                    onPress={() => onUpdateSettings({ neighborMode: 'all' })}
                  >
                    <Text
                      style={[
                        styles.toggleText,
                        settings.neighborMode === 'all' && styles.toggleTextActive,
                      ]}
                    >
                      8-Way (✦) All
                    </Text>
                  </Pressable>
                </View>
              </View>

              {/* Include tapped square */}
              <View style={styles.settingItem}>
                <Text style={styles.settingLabel}>Tapped Square</Text>
                <Text style={styles.settingDescription}>
                  Should the tapped square itself also change color, or only surrounding squares?
                </Text>
                <View style={styles.toggleRow}>
                  <Pressable
                    style={[
                      styles.toggleOption,
                      !settings.includeTappedSquare && styles.toggleOptionActive,
                    ]}
                    onPress={() => onUpdateSettings({ includeTappedSquare: false })}
                  >
                    <Text
                      style={[
                        styles.toggleText,
                        !settings.includeTappedSquare && styles.toggleTextActive,
                      ]}
                    >
                      Surrounding Only
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.toggleOption,
                      settings.includeTappedSquare && styles.toggleOptionActive,
                    ]}
                    onPress={() => onUpdateSettings({ includeTappedSquare: true })}
                  >
                    <Text
                      style={[
                        styles.toggleText,
                        settings.includeTappedSquare && styles.toggleTextActive,
                      ]}
                    >
                      Include Tapped
                    </Text>
                  </Pressable>
                </View>
              </View>

              {/* Cycle Rule */}
              <View style={styles.settingItem}>
                <Text style={styles.settingLabel}>Cycle Rule</Text>
                <Text style={styles.settingDescription}>
                  Determine what new color surrounding squares adopt.
                </Text>
                <View style={styles.toggleRow}>
                  <Pressable
                    style={[
                      styles.toggleOption,
                      settings.cycleRule === 'from_tapped' && styles.toggleOptionActive,
                    ]}
                    onPress={() => onUpdateSettings({ cycleRule: 'from_tapped' })}
                  >
                    <Text
                      style={[
                        styles.toggleText,
                        settings.cycleRule === 'from_tapped' && styles.toggleTextActive,
                      ]}
                    >
                      Next from Tapped
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.toggleOption,
                      settings.cycleRule === 'individual' && styles.toggleOptionActive,
                    ]}
                    onPress={() => onUpdateSettings({ cycleRule: 'individual' })}
                  >
                    <Text
                      style={[
                        styles.toggleText,
                        settings.cycleRule === 'individual' && styles.toggleTextActive,
                      ]}
                    >
                      Independent Step
                    </Text>
                  </Pressable>
                </View>
              </View>
            </ScrollView>

            <Pressable
              style={styles.modalDoneButton}
              onPress={() => setIsSettingsOpen(false)}
            >
              <Text style={styles.modalDoneText}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Info / Rules Modal */}
      <Modal
        visible={isHelpOpen}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsHelpOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>How To Play</Text>
              <Pressable onPress={() => setIsHelpOpen(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </Pressable>
            </View>

            <View style={styles.helpBody}>
              <Text style={styles.helpParagraph}>
                1. Tap any square on the grid to change the color of the adjacent surrounding squares.
              </Text>
              <Text style={styles.helpParagraph}>
                2. The colors change in cyclical sequence:
              </Text>
              <View style={styles.helpCycleBox}>
                <Text style={styles.helpCycleText}>
                  White ➔ Blue ➔ Orange ➔ Red ➔ Black ➔ White
                </Text>
              </View>
              <Text style={styles.helpParagraph}>
                3. Tapping a White square turns surrounding squares Blue; tapping a Blue square turns surrounding squares Orange, and so on.
              </Text>
              <Text style={styles.helpParagraph}>
                4. Colors, grid size, and neighbor behavior can be customized in the code via <Text style={styles.codeText}>src/config/gameConfig.ts</Text> or via the in-app Settings.
              </Text>
            </View>

            <Pressable
              style={styles.modalDoneButton}
              onPress={() => setIsHelpOpen(false)}
            >
              <Text style={styles.modalDoneText}>Got it!</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 70,
  },
  badgeLabel: {
    color: '#94A3B8',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  badgeValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  iconButton: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  iconText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },
  resetButton: {
    backgroundColor: '#EEF2FF',
    borderColor: '#C7D2FE',
  },
  resetButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4F46E5',
  },
  gridSizeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  selectorLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  sizePills: {
    flexDirection: 'row',
    gap: 6,
  },
  sizePill: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  sizePillActive: {
    backgroundColor: '#2563EB',
    borderColor: '#1D4ED8',
  },
  sizePillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  sizePillTextActive: {
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    maxWidth: 420,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  modalClose: {
    fontSize: 18,
    fontWeight: '700',
    color: '#94A3B8',
    padding: 4,
  },
  modalBody: {
    paddingVertical: 12,
    gap: 16,
  },
  settingItem: {
    gap: 6,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  settingDescription: {
    fontSize: 12,
    color: '#64748B',
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  toggleOption: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignItems: 'center',
  },
  toggleOptionActive: {
    backgroundColor: '#2563EB',
    borderColor: '#1D4ED8',
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  toggleTextActive: {
    color: '#FFFFFF',
  },
  modalDoneButton: {
    marginTop: 12,
    backgroundColor: '#0F172A',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalDoneText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  helpBody: {
    paddingVertical: 16,
    gap: 10,
  },
  helpParagraph: {
    fontSize: 13,
    lineHeight: 20,
    color: '#334155',
  },
  helpCycleBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    marginVertical: 4,
  },
  helpCycleText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  codeText: {
    fontFamily: 'Courier',
    fontWeight: '600',
    color: '#2563EB',
  },
});
