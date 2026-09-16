import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { ColorDefinition } from '../config/gameConfig';

interface ColorSequenceBarProps {
  sequence: ColorDefinition[];
}

export const ColorSequenceBar: React.FC<ColorSequenceBarProps> = ({ sequence }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Color Cycle Sequence</Text>
        <Text style={styles.subtitle}>Tap square ➔ changes surrounding</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {sequence.map((item, idx) => {
          const nextItem = sequence[(idx + 1) % sequenceLength(sequence.length)];
          return (
            <React.Fragment key={`${item.id}-${idx}`}>
              <View style={styles.colorPillWrapper}>
                <View
                  style={[
                    styles.colorPill,
                    {
                      backgroundColor: item.hex,
                      borderColor: item.borderColor,
                    },
                  ]}
                />
                <Text style={styles.colorName}>{item.name}</Text>
              </View>

              {/* Arrow separator indicating cyclical flow */}
              <View style={styles.arrowWrapper}>
                <Text style={styles.arrowText}>→</Text>
              </View>
            </React.Fragment>
          );
        })}

        {/* Repeat first item to visibly emphasize cycle closure */}
        <View style={[styles.colorPillWrapper, styles.wrapAroundPill]}>
          <View
            style={[
              styles.colorPill,
              {
                backgroundColor: sequence[0].hex,
                borderColor: sequence[0].borderColor,
              },
            ]}
          />
          <Text style={styles.colorName}>{sequence[0].name} ↺</Text>
        </View>
      </ScrollView>
    </View>
  );
};

function sequenceLength(len: number): number {
  return len > 0 ? len : 1;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 11,
    color: '#64748B',
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  colorPillWrapper: {
    alignItems: 'center',
    gap: 4,
  },
  colorPill: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  colorName: {
    fontSize: 11,
    fontWeight: '500',
    color: '#475569',
  },
  arrowWrapper: {
    paddingHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 16, // Align with pill center
  },
  arrowText: {
    fontSize: 16,
    color: '#94A3B8',
    fontWeight: '600',
  },
  wrapAroundPill: {
    opacity: 0.85,
  },
});
