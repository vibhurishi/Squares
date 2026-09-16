export interface ColorDefinition {
  id: string;
  name: string;
  /** Primary display color (HEX) */
  hex: string;
  /** Border color for clear visibility on contrasting backgrounds */
  borderColor: string;
  /** Text color when showing labels or indicators on this background */
  textColor: string;
}

/**
 * =======================================================================
 * COLOR SEQUENCE CONFIGURATION
 * =======================================================================
 * You can easily reorder, add, or remove colors in this array.
 * The game cycles sequentially from top to bottom and wraps back to the start:
 * White -> Blue -> Orange -> Red -> Black -> White ...
 */
export const COLOR_SEQUENCE: ColorDefinition[] = [
  {
    id: 'white',
    name: 'White',
    hex: '#FFFFFF',
    borderColor: '#D1D5DB',
    textColor: '#1F2937',
  },
  {
    id: 'blue',
    name: 'Blue',
    hex: '#2563EB',
    borderColor: '#1D4ED8',
    textColor: '#FFFFFF',
  },
  {
    id: 'orange',
    name: 'Orange',
    hex: '#F97316',
    borderColor: '#EA580C',
    textColor: '#FFFFFF',
  },
  {
    id: 'red',
    name: 'Red',
    hex: '#DC2626',
    borderColor: '#B91C1C',
    textColor: '#FFFFFF',
  },
  {
    id: 'black',
    name: 'Black',
    hex: '#18181B',
    borderColor: '#3F3F46',
    textColor: '#FFFFFF',
  },
];

/**
 * =======================================================================
 * DEFAULT GAMEPLAY CONFIGURATION
 * =======================================================================
 */
export type NeighborMode = 'orthogonal' | 'all';
export type CycleRule = 'from_tapped' | 'individual';

export interface GameSettings {
  /** Default grid rows */
  rows: number;
  /** Default grid columns */
  cols: number;
  /**
   * 'orthogonal': 4 neighbors (Up, Down, Left, Right)
   * 'all': 8 neighbors (including diagonals)
   */
  neighborMode: NeighborMode;
  /**
   * Whether tapping a square also advances the color of the tapped square itself.
   * Defaults to false (only surrounding squares change).
   */
  includeTappedSquare: boolean;
  /**
   * 'from_tapped': surrounding squares all change to the next color relative to the tapped square.
   * 'individual': each surrounding square advances to its own next color.
   */
  cycleRule: CycleRule;
}

export const DEFAULT_GAME_SETTINGS: GameSettings = {
  rows: 5,
  cols: 5,
  neighborMode: 'all',
  includeTappedSquare: false,
  cycleRule: 'from_tapped',
};
