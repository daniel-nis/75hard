import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';

interface ProgressGridProps {
  progress: boolean[];
  currentDay: number;
}

export const ProgressGrid: React.FC<ProgressGridProps> = ({ progress, currentDay }) => {
  const today = new Date();
  const monthsToShow = 3;
  
  return (
    <View style={styles.gridContainer}>
      <View style={styles.grid}>
        {progress.map((completed, index) => (
          <View
            key={index}
            style={[
              styles.gridSquare,
              completed && styles.gridSquareCompleted,
              index === currentDay - 1 && !completed && styles.gridSquareCurrent,
              index > currentDay - 1 && styles.gridSquareUpcoming
            ]}
          >
            <Text style={[
              styles.gridSquareText,
              completed && styles.gridSquareTextCompleted,
              index === currentDay - 1 && !completed && styles.gridSquareTextCurrent
            ]}>
              {index + 1}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};