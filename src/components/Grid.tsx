import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { ColorDefinition } from '../config/gameConfig';
import { Square } from './Square';

interface GridProps {
  grid: number[][];
  colorSequence: ColorDefinition[];
  onTapSquare: (row: number, col: number) => void;
}

export const Grid: React.FC<GridProps> = ({
  grid,
  colorSequence,
  onTapSquare,
}) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const rows = grid.length;
  const cols = rows > 0 ? grid[0].length : 0;

  if (rows === 0 || cols === 0) {
    return null;
  }

  // Calculate maximum available area for the grid
  const horizontalPadding = 24;
  const availableWidth = Math.min(screenWidth - horizontalPadding, 550);
  const availableHeight = screenHeight * 0.54;

  // Dynamic gap: tighter spacing for dense grids
  const gap = cols >= 20 ? 2 : cols >= 10 ? 4 : 8;

  // Compute square size that satisfies both width and height constraints
  const sizeFromWidth = (availableWidth - gap * (cols - 1)) / cols;
  const sizeFromHeight = (availableHeight - gap * (rows - 1)) / rows;
  const squareSize = Math.max(10, Math.floor(Math.min(sizeFromWidth, sizeFromHeight, 80)));

  return (
    <View style={styles.outerContainer}>
      <View style={[styles.gridContainer, { gap }]}>
        {grid.map((rowArr, rowIndex) => (
          <View key={`row-${rowIndex}`} style={[styles.row, { gap }]}>
            {rowArr.map((colorIndex, colIndex) => {
              const colorDef = colorSequence[colorIndex % colorSequence.length] || colorSequence[0];
              return (
                <Square
                  key={`sq-${rowIndex}-${colIndex}`}
                  row={rowIndex}
                  col={colIndex}
                  size={squareSize}
                  colorDef={colorDef}
                  onPress={() => onTapSquare(rowIndex, colIndex)}
                />
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  gridContainer: {
    backgroundColor: '#F1F5F9',
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
