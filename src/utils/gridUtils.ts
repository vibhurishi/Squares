import { GameSettings, NeighborMode } from '../config/gameConfig';

export interface Coordinate {
  row: number;
  col: number;
}

/**
 * Creates an initial 2D grid matrix filled with the default color index (0 for White).
 */
export function createInitialGrid(rows: number, cols: number, initialColorIndex: number = 0): number[][] {
  return Array.from({ length: rows }, () => Array(cols).fill(initialColorIndex));
}

/**
 * Computes coordinates of neighboring squares based on adjacency mode and boundaries.
 */
export function getNeighborCoordinates(
  row: number,
  col: number,
  rows: number,
  cols: number,
  mode: NeighborMode,
  includeTappedSquare: boolean
): Coordinate[] {
  const coords: Coordinate[] = [];

  // Orthogonal deltas (Up, Down, Left, Right)
  const orthogonalDeltas = [
    { r: -1, c: 0 }, // Up
    { r: 1, c: 0 },  // Down
    { r: 0, c: -1 }, // Left
    { r: 0, c: 1 },  // Right
  ];

  // Diagonal deltas
  const diagonalDeltas = [
    { r: -1, c: -1 }, // Top-Left
    { r: -1, c: 1 },  // Top-Right
    { r: 1, c: -1 },  // Bottom-Left
    { r: 1, c: 1 },   // Bottom-Right
  ];

  const deltas = mode === 'all'
    ? [...orthogonalDeltas, ...diagonalDeltas]
    : orthogonalDeltas;

  for (const delta of deltas) {
    const nr = row + delta.r;
    const nc = col + delta.c;

    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
      coords.push({ row: nr, col: nc });
    }
  }

  if (includeTappedSquare) {
    coords.push({ row, col });
  }

  return coords;
}

/**
 * Returns the next color index in a cycle of length sequenceLength.
 */
export function getNextColorIndex(currentIndex: number, sequenceLength: number): number {
  return (currentIndex + 1) % sequenceLength;
}

/**
 * Computes the new grid state after tapping a square at (tappedRow, tappedCol).
 */
export function applyTapToGrid(
  currentGrid: number[][],
  tappedRow: number,
  tappedCol: number,
  sequenceLength: number,
  settings: GameSettings
): number[][] {
  const rows = currentGrid.length;
  if (rows === 0) return currentGrid;
  const cols = currentGrid[0].length;

  // Make a shallow copy of rows and columns
  const nextGrid = currentGrid.map((r) => [...r]);

  const tappedColorIndex = currentGrid[tappedRow][tappedCol];
  const nextColorFromTapped = getNextColorIndex(tappedColorIndex, sequenceLength);

  const neighbors = getNeighborCoordinates(
    tappedRow,
    tappedCol,
    rows,
    cols,
    settings.neighborMode,
    settings.includeTappedSquare
  );

  for (const { row, col } of neighbors) {
    if (settings.cycleRule === 'from_tapped') {
      // Surrounding squares change to the next color relative to the tapped square
      nextGrid[row][col] = nextColorFromTapped;
    } else {
      // Each square independently steps forward along the cycle
      nextGrid[row][col] = getNextColorIndex(currentGrid[row][col], sequenceLength);
    }
  }

  return nextGrid;
}
