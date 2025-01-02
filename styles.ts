import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ddd5ca',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    minHeight: '100%',
  },
  contentContainer: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    paddingBottom: 40, // Add extra padding at bottom
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#ddd5ca',
  },
  scrollView: {
    backgroundColor: '#ddd5ca',
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
    color: '#000',
    marginBottom: 24,
    fontFamily: 'Inter',
  },
  card: {
    backgroundColor: '#000',
    borderRadius: 24,
    width: '100%',
    maxWidth: 600,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ddd5ca',
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
    backgroundColor: '#000',
    borderWidth: 2,
    borderColor: '#ddd5ca',
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
    borderColor: '#ddd5ca',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: '#ddd5ca',
    borderColor: '#ddd5ca',
  },
  taskText: {
    fontSize: 16,
    color: '#ddd5ca',
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
    backgroundColor: '#ddd5ca',
  },
  deleteButton: {
    backgroundColor: '#000',
    borderWidth: 2,
    borderColor: '#ddd5ca',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#ddd5ca',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  // Progress Grid styles
  gridContainer: {
    marginTop: 32,
    borderTopWidth: 1,
    borderTopColor: '#ddd5ca20',
    paddingTop: 32,
  },
  gridTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ddd5ca',
    marginBottom: 16,
  },
  monthLabels: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  monthLabel: {
    color: '#ddd5ca',
    opacity: 0.6,
    fontSize: 12,
    marginRight: 16,
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
    borderColor: '#ddd5ca',
  },
  gridSquareCompleted: {
    backgroundColor: '#ddd5ca',
    borderColor: '#ddd5ca',
  },
  gridSquareCurrent: {
    borderColor: '#ddd5ca',
    borderWidth: 2,
  },
  gridSquareUpcoming: {
    borderColor: '#ddd5ca',
    opacity: 0.3,
  },
  gridSquareText: {
    fontSize: 12,
    color: '#ddd5ca',
    fontWeight: '500',
  },
  gridSquareTextCompleted: {
    color: '#000',
    fontWeight: '600',
  },
  gridSquareTextCurrent: {
    color: '#ddd5ca',
  },
  // Day Controls styles
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
    backgroundColor: '#000',
    borderWidth: 2,
    borderColor: '#ddd5ca',
    opacity: 1,
  },
  dayControlButtonDisabled: {
    opacity: 0.3,
  },
  resetContainer: {
    marginTop: 32,
    borderTopWidth: 1,
    borderTopColor: '#ddd5ca20',
    paddingTop: 32,
    alignItems: 'center',
  },
  resetButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#ff4444',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});