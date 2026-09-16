import assert from 'node:assert/strict';

// Logic reproduction for testing pure algorithm independently
function createInitialGrid(rows, cols, initialColorIndex = 0) {
  return Array.from({ length: rows }, () => Array(cols).fill(initialColorIndex));
}

function getNeighborCoordinates(row, col, rows, cols, mode, includeTappedSquare) {
  const coords = [];
  const orthogonalDeltas = [
    { r: -1, c: 0 },
    { r: 1, c: 0 },
    { r: 0, c: -1 },
    { r: 0, c: 1 },
  ];
  const diagonalDeltas = [
    { r: -1, c: -1 },
    { r: -1, c: 1 },
    { r: 1, c: -1 },
    { r: 1, c: 1 },
  ];
  const deltas = mode === 'all' ? [...orthogonalDeltas, ...diagonalDeltas] : orthogonalDeltas;

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

function getNextColorIndex(currentIndex, sequenceLength) {
  return (currentIndex + 1) % sequenceLength;
}

function applyTapToGrid(currentGrid, tappedRow, tappedCol, sequenceLength, settings) {
  const rows = currentGrid.length;
  const cols = currentGrid[0].length;
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
      nextGrid[row][col] = nextColorFromTapped;
    } else {
      nextGrid[row][col] = getNextColorIndex(currentGrid[row][col], sequenceLength);
    }
  }

  return nextGrid;
}

// TEST 1: Initial Grid
const grid = createInitialGrid(3, 3, 0);
assert.deepEqual(grid, [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
]);
console.log('✔ Test 1 passed: Initial grid generation is all White (0)');

// TEST 2: Cycle order White(0) -> Blue(1) -> Orange(2) -> Red(3) -> Black(4) -> White(0)
const seqLen = 5;
assert.equal(getNextColorIndex(0, seqLen), 1);
assert.equal(getNextColorIndex(1, seqLen), 2);
assert.equal(getNextColorIndex(2, seqLen), 3);
assert.equal(getNextColorIndex(3, seqLen), 4);
assert.equal(getNextColorIndex(4, seqLen), 0);
console.log('✔ Test 2 passed: Cyclical color sequence wraps around properly');

// TEST 3: Tap White(0) square changes orthogonal surrounding squares to Blue(1)
const settings = {
  rows: 3,
  cols: 3,
  neighborMode: 'orthogonal',
  includeTappedSquare: false,
  cycleRule: 'from_tapped',
};
const step1 = applyTapToGrid(grid, 1, 1, 5, settings);
assert.equal(step1[1][1], 0); // tapped square unchanged
assert.equal(step1[0][1], 1); // Up is Blue
assert.equal(step1[2][1], 1); // Down is Blue
assert.equal(step1[1][0], 1); // Left is Blue
assert.equal(step1[1][2], 1); // Right is Blue
assert.equal(step1[0][0], 0); // Diagonals untouched
assert.equal(step1[2][2], 0);
console.log('✔ Test 3 passed: Tapping White square turns orthogonal neighbors Blue');

// TEST 4: Tap Blue(1) square changes surrounding squares to Orange(2)
const step2 = applyTapToGrid(step1, 0, 1, 5, settings);
// tapped square (0, 1) was Blue (1), so its neighbors turn Orange (2)
assert.equal(step2[1][1], 2);
assert.equal(step2[0][0], 2);
assert.equal(step2[0][2], 2);
assert.equal(step2[0][1], 1);
console.log('✔ Test 4 passed: Tapping Blue square turns surrounding squares Orange');

// TEST 5: 8-Way (all surrounding) mode changes all 8 neighbors
const settings8Way = {
  ...settings,
  neighborMode: 'all',
};
const step8Way = applyTapToGrid(grid, 1, 1, 5, settings8Way);
// In a 3x3 grid, tapping center with 8-way turns ALL 8 surrounding squares Blue (1)
assert.equal(step8Way[1][1], 0); // tapped center remains 0
for (let r = 0; r < 3; r++) {
  for (let c = 0; c < 3; c++) {
    if (r === 1 && c === 1) continue;
    assert.equal(step8Way[r][c], 1, `Square at (${r}, ${c}) should be Blue`);
  }
}
console.log('✔ Test 5 passed: 8-way mode turns all 8 surrounding squares Blue');

// Clean test summary
console.log('\nAll 5 automated verification tests PASSED successfully!');
