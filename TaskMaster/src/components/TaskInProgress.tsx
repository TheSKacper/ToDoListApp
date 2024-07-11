import { useEffect, useState } from 'react';
import { Task } from '../model/task';

interface Props {
  task: Task;
  onUpdateFinish: (updateTask: Task) => void;
}
const TaskInProgress = ({ task, onUpdateFinish }: Props) => {
  const [updatedTask, setUpdatedTask] = useState<Task>(task);

  useEffect(() => {
    setUpdatedTask(task);
  }, [task]);

  const handleChangeTask = () => {
    const newTask = { ...updatedTask, process: 'In Progress' };
    setUpdatedTask(newTask);
    onUpdateFinish(newTask);
  };
  return (
    <button onClick={handleChangeTask} className='btn btn-success'>
      In Progress
    </button>
  );
};

export default TaskInProgress;
