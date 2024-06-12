
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { taskData } from '../models/Types';



interface TaskState {
  tasks: taskData[];
}

const initialState: TaskState = {
  tasks: []
};


export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state , action:PayloadAction<taskData[]>) => {
        state.tasks = action.payload
    },
    createTasks: (state ,action:PayloadAction<taskData>) => {
       state.tasks.push(action.payload)
    },
    deleteTasks: (state ,action:PayloadAction<number>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    

  }
})

export const { setTasks, createTasks, deleteTasks } = taskSlice.actions

export default taskSlice.reducer