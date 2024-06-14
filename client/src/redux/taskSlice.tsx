import {PayloadAction, createSlice } from '@reduxjs/toolkit';
import { taskData } from '../models/Types';


interface TaskState {
  tasks: taskData[];
}

const initialState: TaskState = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload
    },
    newTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    failTask:(state, action:PayloadAction<number>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    completeTask:(state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
  
  },
  
});


export const { setTasks, newTask ,completeTask,failTask } = taskSlice.actions
export default taskSlice.reducer;
