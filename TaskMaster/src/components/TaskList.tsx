import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {
  fetchTasks,
  removeTask,
  updateExistingTask,
} from '../reducer/taskSlice';
import TaskCard from './TaskCard';
import TaskFilterName from './TaskFilterName';
import TaskAdd from './TaskAdd';
import { Task } from '../model/task';
import TaskSearch from './TaskSearch';

const TaskList = () => {
  const dispatch = useDispatch();
  const { taskList } = useSelector((state: RootState) => state.task);
  const [searchName, setSearchName] = useState('');
  const [searchProcess, setSearchProcess] = useState('');
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const filteredTasks = taskList.filter((item) => {
    const filteredByName = item.title.toLowerCase().includes(searchName.toLowerCase());

    let filteredByProcess = true;
    if (searchProcess === 'Finish') {
      filteredByProcess = item.finish === true;
    } else if (searchProcess === 'No Finish') {
      filteredByProcess = item.finish === false;
    } else if (searchProcess) {
      filteredByProcess = item.process.toLowerCase() === searchProcess.toLowerCase();
    }

    return filteredByName && filteredByProcess;
  });

  const handleDeleteTask = (taskId: number) => {
    dispatch(removeTask(taskId));
  };

  const handleUpdateTask = (updatedTask: Task) => {
    dispatch(updateExistingTask(updatedTask));
  };

  const handleUpdateFinish = (updatedFinish: Task) => {
    dispatch(updateExistingTask(updatedFinish));
  };

  return (
    <div className='container'>
      <TaskFilterName searchName={(name: string) => setSearchName(name)} />
      <TaskSearch searchByProcess={(name: string) => setSearchProcess(name)} />
      <TaskAdd />
      <div className='row'>
        {filteredTasks.map((item) => (
          <TaskCard
            key={item.id}
            task={item}
            onUpdateTask={handleUpdateTask}
            deleteTask={handleDeleteTask}
            onUpdateFinish={handleUpdateFinish}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
