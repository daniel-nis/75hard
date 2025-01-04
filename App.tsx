import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Alert, SafeAreaView, ScrollView, Platform } from 'react-native';
import { Plus } from 'lucide-react';
import { TaskRow } from './components/TaskRow';
import { ProgressGrid } from './components/ProgressGrid';
import { DayControls } from './components/DayControl';
import { styles } from './styles';
import { Task } from './types';
import { getDefaultTasks, updateDefaultTasks, saveData, loadData, clearAllData, initializeData } from './storage';
import { isSameDay, calculateDayNumber } from './dateHelpers';

const App = () => {
  const [tasks, setTasks] = useState<Task[]>(getDefaultTasks());
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [currentDay, setCurrentDay] = useState(1);
  const [progress, setProgress] = useState<boolean[]>(Array(75).fill(false));
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [lastCheckedDate, setLastCheckedDate] = useState<Date>(new Date());

  // Load initial data
  useEffect(() => {
    const loadSavedData = async () => {
      const saved = await loadData();
      if (saved) {
        // If we have saved data, load it
        setStartDate(new Date(saved.startDate));
        setProgress(saved.days.map(day => day.completed));
        const calculatedDay = calculateDayNumber(new Date(saved.startDate));
        const effectiveDay = Math.min(calculatedDay, 75);
        setCurrentDay(effectiveDay);
        
        const today = saved.days[effectiveDay - 1];
        if (today) {
          setTasks(today.tasks);
          updateDefaultTasks(today.tasks.map(task => ({ ...task, completed: false })));
        }
      } else {
        // If no saved data, initialize new data
        const newStartDate = new Date();
        const initialData = await initializeData(newStartDate);
        
        setStartDate(newStartDate);
        setCurrentDay(1);
        setProgress(initialData.days.map(day => day.completed));
        setTasks(initialData.days[0].tasks);
      }
    };
    
    loadSavedData();
  }, []);

  // Check for day changes
  useEffect(() => {
    const checkDayChange = async () => {
      if (!startDate) return;

      const now = new Date();
      if (!isSameDay(now, lastCheckedDate)) {
        const newDayNumber = calculateDayNumber(startDate);
        
        if (newDayNumber > currentDay) {
          const previousDayCompleted = tasks.every(task => task.completed);
          
          if (!previousDayCompleted) {
            if (Platform.OS === 'web') {
              const confirmed = window.confirm(
                "You didn't complete all tasks yesterday. The challenge will restart."
              );
              if (confirmed) {
                handleRestartChallenge();
              }
            } else {
              Alert.alert(
                "Challenge Failed",
                "You didn't complete all tasks yesterday. The challenge will restart.",
                [
                  {
                    text: "Restart Challenge",
                    onPress: () => handleRestartChallenge()
                  }
                ]
              );
            }
          } else {
            setCurrentDay(newDayNumber);
            setTasks(getDefaultTasks().map(task => ({ ...task, completed: false })));
          }
        }
        
        setLastCheckedDate(now);
      }
    };

    const interval = setInterval(checkDayChange, 1000 * 60);
    return () => clearInterval(interval);
  }, [currentDay, lastCheckedDate, startDate, tasks]);

  const handleRestartChallenge = () => {
    setStartDate(new Date());
    setCurrentDay(1);
    setProgress(Array(75).fill(false));
    setTasks(getDefaultTasks().map(task => ({ ...task, completed: false })));
  };

  const addTask = async () => {
    if (!isAddingTask) {
      setIsAddingTask(true);
      return;
    }
    
    if (newTaskTitle.trim()) {
      const newTask = {
        id: Math.max(...tasks.map(t => t.id), ...getDefaultTasks().map(t => t.id)) + 1,
        title: newTaskTitle.trim(),
        completed: false
      };
      
      // Update current tasks
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      
      // Update default tasks for future days
      const updatedDefaultTasks = [...getDefaultTasks(), newTask];
      updateDefaultTasks(updatedDefaultTasks);
      
      // Update stored data
      const savedData = await loadData();
      if (savedData) {
        // Update all future days with the new task list
        const updatedDays = savedData.days.map((day, index) => {
          if (index >= currentDay - 1) {
            return {
              ...day,
              tasks: index === currentDay - 1 ? updatedTasks : day.tasks.map(t => ({
                ...t,
                completed: false
              })).concat([{ ...newTask, completed: false }])
            };
          }
          return day;
        });
        
        await saveData({
          ...savedData,
          days: updatedDays
        });
      }
      
      setNewTaskTitle('');
      setIsAddingTask(false);
    }
  };

  const editTask = async (id: number, newTitle: string) => {
    // Update current tasks
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, title: newTitle } : task
    );
    setTasks(updatedTasks);
    
    // Update default tasks for future days
    const updatedDefaultTasks = getDefaultTasks().map(task =>
      task.id === id ? { ...task, title: newTitle } : task
    );
    updateDefaultTasks(updatedDefaultTasks);
    
    // Update stored data
    const savedData = await loadData();
    if (savedData) {
      const updatedDays = savedData.days.map((day, index) => {
        if (index >= currentDay - 1) {
          return {
            ...day,
            tasks: day.tasks.map(task =>
              task.id === id ? { ...task, title: newTitle } : task
            )
          };
        }
        return day;
      });
      
      await saveData({
        ...savedData,
        days: updatedDays
      });
    }
  };

  const deleteTask = async (id: number) => {
    // Update current tasks
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    
    // Update default tasks for future days
    const updatedDefaultTasks = getDefaultTasks().filter(task => task.id !== id);
    updateDefaultTasks(updatedDefaultTasks);
    
    // Update stored data
    const savedData = await loadData();
    if (savedData) {
      const updatedDays = savedData.days.map((day, index) => {
        if (index >= currentDay - 1) {
          return {
            ...day,
            tasks: day.tasks.filter(task => task.id !== id)
          };
        }
        return day;
      });
      
      await saveData({
        ...savedData,
        days: updatedDays
      });
    }
  };

  const toggleTask = async (id: number) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    
    // Update progress when all tasks are completed
    const allCompleted = updatedTasks.every(task => task.completed);
    const newProgress = [...progress];
    newProgress[currentDay - 1] = allCompleted;
    setProgress(newProgress);
    
    // Save the current day's state
    const savedData = await loadData();
    if (savedData) {
      const updatedDays = [...savedData.days];
      updatedDays[currentDay - 1] = {
        ...updatedDays[currentDay - 1],
        tasks: updatedTasks,
        completed: allCompleted
      };
      
      await saveData({
        ...savedData,
        days: updatedDays
      });
    }
  };

  const handlePreviousDay = async () => {
    if (currentDay > 1) {
      const newDay = currentDay - 1;
      const savedData = await loadData();
      
      if (savedData) {
        const previousDayData = savedData.days[newDay - 1];
        if (previousDayData) {
          setTasks(previousDayData.tasks);
        }
      }
      
      setCurrentDay(newDay);
    }
  };

  const handleNextDay = async () => {
    if (currentDay < 75) {
      const allTasksCompleted = tasks.every(task => task.completed);
      
      if (!allTasksCompleted) {
        if (Platform.OS === 'web') {
          alert("You must complete all tasks before moving to the next day.");
        } else {
          Alert.alert(
            "Incomplete Tasks",
            "You must complete all tasks before moving to the next day."
          );
        }
        return;
      }

      const newDay = currentDay + 1;
      const savedData = await loadData();
      
      if (savedData && savedData.days[newDay - 1]) {
        // Load existing data for the next day if it exists
        setTasks(savedData.days[newDay - 1].tasks);
      } else {
        // If no existing data, use current default tasks
        setTasks(getDefaultTasks().map(task => ({ ...task, completed: false })));
      }
      
      // Update progress for the completed day
      const newProgress = [...progress];
      newProgress[currentDay - 1] = true;
      setProgress(newProgress);
      
      setCurrentDay(newDay);
    }
  };

  const performReset = async () => {
    await clearAllData();
    
    // Initialize new data structure with default tasks
    const newStartDate = new Date();
    const initialData = await initializeData(newStartDate);
    
    // Reset to initial default tasks
    updateDefaultTasks([
      { id: 1, title: 'Follow a diet', completed: false },
      { id: 2, title: 'Two 45-minute workouts', completed: false },
      { id: 3, title: 'No alcohol', completed: false },
      { id: 4, title: 'Drink 1 gallon of water', completed: false },
      { id: 5, title: 'Read 10 pages of a book', completed: false },
      { id: 6, title: 'Take a progress picture', completed: false },
    ]);

    // Update state with the initialized data
    setTasks(initialData.days[0].tasks);
    setStartDate(newStartDate);
    setCurrentDay(1);
    setProgress(initialData.days.map(day => day.completed));
    setIsAddingTask(false);
    setNewTaskTitle('');
  };

  const handleFullReset = () => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm(
        "This will reset all progress and start the challenge over. Are you sure?"
      );
      if (confirmed) {
        performReset();
      }
    } else {
      Alert.alert(
        "Reset Challenge",
        "This will reset all progress and start the challenge over. Are you sure?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Reset",
            style: "destructive",
            onPress: performReset
          }
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.mainTitle}>75 Hard Challenge</Text>
        
        <View style={styles.card}>
          <DayControls
            currentDay={currentDay}
            onPreviousDay={handlePreviousDay}
            onNextDay={handleNextDay}
          />

          <View style={styles.taskList}>
            {tasks.map(task => (
              <TaskRow 
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onEdit={editTask}
              />
            ))}

            {isAddingTask && (
              <View style={styles.taskRow}>
                <View style={styles.checkboxContainer}>
                  <View style={styles.checkbox} />
                  <input
                    style={styles.input}
                    type="text"
                    placeholder="New task..."
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') addTask();
                      if (e.key === 'Escape') {
                        setIsAddingTask(false);
                        setNewTaskTitle('');
                      }
                    }}
                    onBlur={() => {
                      if (newTaskTitle.trim()) {
                        addTask();
                      } else {
                        setIsAddingTask(false);
                        setNewTaskTitle('');
                      }
                    }}
                    autoFocus
                  />
                </View>
              </View>
            )}
          </View>

          <View style={styles.addButtonContainer}>
            <Pressable 
              style={styles.addButton}
              onPress={addTask}
            >
              <Plus size={20} color="#000" strokeWidth={2.5} />
            </Pressable>
          </View>

          <ProgressGrid progress={progress} currentDay={currentDay} />
          <View style={styles.resetContainer}>
            <Pressable 
              style={styles.resetButton}
              onPress={handleFullReset}
            >
              <Text style={styles.resetButtonText}>Reset Challenge</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;