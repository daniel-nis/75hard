export interface Task {
    id: number;
    title: string;
    completed: boolean;
    isCore?: boolean;
}

export interface DayData {
tasks: Task[];
completed: boolean;
date: string;
}

export interface StoredData {
currentDay: number;
startDate: string;
days: DayData[];
}