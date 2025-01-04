import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { styles } from '../styles';

interface DayControlsProps {
  currentDay: number;
  onPreviousDay: () => void;
  onNextDay: () => void;
}

export const DayControls: React.FC<DayControlsProps> = ({ 
  currentDay, 
  onPreviousDay, 
  onNextDay 
}) => {
  return (
    <View style={styles.dayControls}>
      <Pressable 
        style={styles.dayControlButton}
        onPress={onPreviousDay}
        disabled={currentDay === 1}
      >
        <ChevronLeft size={20} color="#A0A0A0" />
      </Pressable>
      <Text style={styles.title}>Day {currentDay}</Text>
      <Pressable 
        style={styles.dayControlButton}
        onPress={onNextDay}
        disabled={currentDay === 75}
      >
        <ChevronRight size={20} color="#A0A0A0" />
      </Pressable>
    </View>
  );
};