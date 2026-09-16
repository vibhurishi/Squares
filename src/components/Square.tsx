import React, { useRef } from 'react';
import { StyleSheet, Pressable, Animated, ViewStyle, Platform } from 'react-native';
import { ColorDefinition } from '../config/gameConfig';

interface SquareProps {
  colorDef: ColorDefinition;
  size: number;
  onPress: () => void;
  row: number;
  col: number;
  style?: ViewStyle;
}

const useNativeDriver = Platform.OS !== 'web';

export const Square: React.FC<SquareProps> = React.memo(({
  colorDef,
  size,
  onPress,
  row,
  col,
  style,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.90,
      useNativeDriver,
      speed: 40,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver,
      speed: 25,
      bounciness: 6,
    }).start();
  };

  const borderRadius = Math.max(2, Math.min(12, Math.floor(size * 0.22)));
  const borderWidth = size < 22 ? 1 : 2;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityRole="button"
      accessibilityLabel={`Square at row ${row + 1}, column ${col + 1}, color ${colorDef.name}`}
      style={({ pressed }) => [
        styles.touchable,
        {
          width: size,
          height: size,
          opacity: pressed ? 0.92 : 1,
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.square,
          {
            width: size,
            height: size,
            borderRadius,
            borderWidth,
            backgroundColor: colorDef.hex,
            borderColor: colorDef.borderColor,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      />
    </Pressable>
  );
});

const styles = StyleSheet.create({
  touchable: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    borderRadius: 12,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
});
