import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Task } from '../model/task';
import ApiService from '../service/ApiService';
import { AppDispatch } from '../store/store';

type ThunkConfig = {
  state: TaskState;
  dispatch: AppDispatch;
  rejectValue: string;
};

export interface TaskState {
  taskList: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  taskList: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk<Task[], void, ThunkConfig>(
  'task/fetchTasks',
  async () => {
    const response = await ApiService.get<Task[]>('/object');
    return response.data;
  }
);

export const addNewTask = createAsyncThunk<Task, Omit<Task, 'id'>, ThunkConfig>(
  'task/addNewTask',
  async (newTask) => {
    const response = await ApiService.post<Task>('/object', newTask);
    return response.data;
  }
);

export const updateExistingTask = createAsyncThunk<Task, Task, ThunkConfig>(
  'task/updateExistingTask',
  async (task) => {
    const response = await ApiService.put<Task>(`/object/${task.id}`, task);
    return response.data;
  }
);

export const removeTask = createAsyncThunk<number, number, ThunkConfig>(
  'task/removeTask',
  async (taskId) => {
    await ApiService.delete(`/object/${taskId}`);
    return taskId;
  }
);

const taskSlice = createSlice({
  name: 'Task',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.taskList.push(action.payload);
    },
    deleteTask(state, action: PayloadAction<number>) {
      const id = action.payload;
      state.taskList = state.taskList.filter((task) => task.id !== id);
    },
    updateTask(state, action: PayloadAction<Task>) {
      const updatedTask = action.payload;
      state.taskList = state.taskList.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.taskList = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something bad happened';
      })
      .addCase(addNewTask.fulfilled, (state, action) => {
        state.taskList.push(action.payload);
      })
      .addCase(addNewTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add new task';
      })
      .addCase(updateExistingTask.fulfilled, (state, action) => {
        state.taskList = state.taskList.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
      })
      .addCase(updateExistingTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update task';
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.taskList = state.taskList.filter(
          (task) => task.id !== action.payload
        );
      });
  },
});

export default taskSlice.reducer;
