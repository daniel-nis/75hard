import { StyleSheet } from 'react-native';

// ============================================================================
// COLOR SCHEMES - Uncomment one palette at a time
// ============================================================================

// Option 1 - Minimal Monochrome with Accent
// const colors = {
//   background: '#1A1A1A',    // Deep charcoal
//   card: '#F5F5F5',         // Off-white
//   accent: '#404040',       // Slate gray
//   secondary: '#94A3B8',    // Muted sage
//   completed: '#94A3B8',    // Muted sage for completed states
//   border: '#404040',       // Slate gray for borders
// };

// Option 2 - Modern Warm Neutrals
// const colors = {
//   background: '#2C2524',    // Deep taupe
//   card: '#FAF9F7',         // Warm white
//   accent: '#44403C',       // Rich brown
//   secondary: '#78716C',    // Warm gray
//   completed: '#44403C',    // Rich brown for completed states
//   border: '#44403C',       // Rich brown for borders
// };

// Option 3 - Cool Modern
// const colors = {
//   background: '#0F172A',    // Deep navy
//   card: '#F8FAFC',         // Cool white
//   accent: '#1E293B',       // Navy
//   secondary: '#64748B',    // Steel blue
//   completed: '#1E293B',    // Navy for completed states
//   border: '#1E293B',       // Navy for borders
// };

// Option 4 - New Age Minimal
// const colors = {
//   background: '#000000',    // Pure black
//   card: '#FFFFFF',         // Pure white
//   accent: '#333333',       // Gray
//   secondary: '#666666',    // Light gray
//   completed: '#0EA5E9',    // Electric blue for completed states
//   border: '#333333',       // Gray for borders
// };

// Dark Theme 1 - Deep Space
// const colors = {
//   background: '#0A0A0A',    // Almost black
//   card: '#1A1A1A',         // Dark gray
//   accent: '#E5E5E5',       // Light gray
//   secondary: '#404040',    // Medium gray
//   completed: '#10B981',    // Emerald green
//   border: '#2A2A2A',       // Slightly lighter than card
// };

const colors = {
  background: '#0A0A0A',    // Pure black background
  card: '#1A1A1A',         // Dark gray card
  accent: '#A0A0A0',       // Light gray for text and borders
  secondary: '#404040',    // Medium gray for secondary elements
  completed: '#4DAD7D',    // Muted green for completed states
  border: '#2A2A2A',       // Slightly lighter than card for borders
  text: '#E5E5E5',        // Light gray text
  textCompleted: '#666666' // Dimmed text for completed items
};

// Dark Theme 2 - Midnight Purple
// const colors = {
//   background: '#0F0613',    // Deep purple-black
//   card: '#1F1626',         // Dark purple
//   accent: '#E6DDF3',       // Light purple-white
//   secondary: '#6B5B7B',    // Muted purple
//   completed: '#9F7AEA',    // Bright purple
//   border: '#2D1F35',       // Medium purple
// };

// Dark Theme 3 - Ocean Dark
// const colors = {
//   background: '#0C1219',    // Deep ocean black
//   card: '#1B2837',         // Dark blue-gray
//   accent: '#E2E8F0',       // Light blue-gray
//   secondary: '#475569',    // Medium blue-gray
//   completed: '#38BDF8',    // Bright blue
//   border: '#2B3C4F',       // Medium ocean blue
// };

// Dark Theme 4 - Forest Dark
// const colors = {
//   background: '#0C130F',    // Deep forest black
//   card: '#1A231D',         // Dark green-gray
//   accent: '#E2E8E4',       // Light green-gray
//   secondary: '#3D4A42',    // Medium green-gray
//   completed: '#059669',    // Emerald
//   border: '#27342B',       // Medium forest
// };

// Dark Theme 5 - Volcanic
// const colors = {
//   background: '#0F0D0D',    // Deep charcoal
//   card: '#1C1917',         // Dark warm gray
//   accent: '#E7E5E4',       // Light warm gray
//   secondary: '#57534E',    // Medium warm gray
//   completed: '#DC2626',    // Bright red
//   border: '#292524',       // Medium warm gray
// };

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    minHeight: '100%',
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    backgroundColor: colors.background,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#A0A0A0',
    marginBottom: 24,
    fontFamily: 'Inter',
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 24,
    width: '100%',
    maxWidth: 600,
    padding: 24,
    borderWidth: 2,
    borderColor: colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.accent,
  },
  addButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskList: {
    gap: 16,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    height: 44,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.border,
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: colors.completed,
    borderColor: colors.completed,
  },
  taskText: {
    fontSize: 16,
    color: colors.accent,
    fontWeight: '500',
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  actions: {
    flexDirection: 'row',
    gap: 4,
    opacity: 1,
    width: 64,
    justifyContent: 'flex-end',
  },
  actionsHidden: {
    opacity: 0,
    pointerEvents: 'none',
  },
  actionButton: {
    width: 28,
    height: 28,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
  },
  deleteButton: {
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.border,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.accent,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  gridContainer: {
    marginTop: 32,
    borderTopWidth: 1,
    borderTopColor: `${colors.accent}20`,
    paddingTop: 32,
  },
  gridTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.accent,
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  gridSquare: {
    width: 32,
    height: 32,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.border,
  },
  gridSquareCompleted: {
    backgroundColor: colors.completed,
    borderColor: colors.completed,
  },
  gridSquareCurrent: {
    borderColor: colors.border,
    borderWidth: 2,
  },
  gridSquareUpcoming: {
    borderColor: colors.border,
    opacity: 0.3,
  },
  gridSquareText: {
    fontSize: 12,
    color: colors.accent,
    fontWeight: '500',
  },
  gridSquareTextCompleted: {
    color: colors.card,
    fontWeight: '600',
  },
  gridSquareTextCurrent: {
    color: colors.accent,
  },
  dayControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  dayControlButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.border,
    opacity: 1,
  },
  dayControlButtonDisabled: {
    opacity: 0.3,
  },
  resetContainer: {
    marginTop: 32,
    borderTopWidth: 1,
    borderTopColor: `${colors.accent}20`,
    paddingTop: 32,
    alignItems: 'center',
  },
  resetButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.border,
  },
  resetButtonText: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: '600',
  },
});