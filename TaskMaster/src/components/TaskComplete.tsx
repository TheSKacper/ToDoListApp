import { useEffect, useState } from 'react';
import { Task } from '../model/task';

interface Props {
  task: Task;
  onUpdateFinish: (updateTask: Task) => void;
}
const TaskComplete = ({ task, onUpdateFinish }: Props) => {
  const [updatedTask, setUpdatedTask] = useState<Task>(task);

  useEffect(() => {
    setUpdatedTask(task);
  }, [task]);

  const handleChangeTask = () => {
    const newTask = { ...updatedTask, finish: true, process: 'Completed' };
    setUpdatedTask(newTask);
    onUpdateFinish(newTask);
  };

  return (
    <button onClick={handleChangeTask} className='btn btn-success'>
      Complete
    </button>
  );
};

export default TaskComplete;
