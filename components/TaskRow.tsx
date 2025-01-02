import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Pencil, Trash2 } from 'lucide-react';
import { Task } from '../types';
import { styles } from '../styles'

interface TaskRowProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newTitle: string) => void;
}

export const TaskRow: React.FC<TaskRowProps> = ({ task, onToggle, onDelete, onEdit }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);

  const handleEditSubmit = () => {
    if (editValue.trim() && editValue !== task.title) {
      onEdit(task.id, editValue.trim());
    }
    setIsEditing(false);
    setEditValue(task.title);
  };

  if (isEditing) {
    return (
      <View style={styles.taskRow}>
        <View style={styles.checkboxContainer}>
          <View style={styles.checkbox} />
          <input
            style={styles.input}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleEditSubmit();
              if (e.key === 'Escape') {
                setIsEditing(false);
                setEditValue(task.title);
              }
            }}
            onBlur={handleEditSubmit}
            autoFocus
          />
        </View>
      </View>
    );
  }

  return (
    <View 
      style={styles.taskRow}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <Pressable 
        style={styles.checkboxContainer}
        onPress={() => onToggle(task.id)}
      >
        <View style={[
          styles.checkbox,
          task.completed && styles.checkboxChecked
        ]} />
        <Text style={[
          styles.taskText,
          task.completed && styles.taskTextCompleted
        ]}>
          {task.title}
        </Text>
      </Pressable>
      
      <View style={[styles.actions, !isHovered && styles.actionsHidden]}>
        <Pressable 
          style={styles.actionButton}
          onPress={() => setIsEditing(true)}
        >
          <Pencil size={14} color="#000" strokeWidth={2} />
        </Pressable>
        <Pressable 
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => onDelete(task.id)}
        >
          <Trash2 size={14} color="#ddd5ca" strokeWidth={2} />
        </Pressable>
      </View>
    </View>
  );
};