import { Task } from '../model/task';
import TaskComplete from './TaskComplete';
import TaskDelete from './TaskDelete';
import TaskInProgress from './TaskInProgress';
import TaskUpdate from './TaskUpdate';

interface Props {
  task: Task;
  deleteTask: (taskId: number) => void;
  onUpdateTask: (updatedTask: Task) => void;
  onUpdateFinish: (updatedFinish: Task) => void;
}
const TaskCard = ({
  deleteTask,
  task,
  onUpdateTask,
  onUpdateFinish,
}: Props) => {
  const handleUpdateTask = (updatedTask: Task) => {
    onUpdateTask(updatedTask);
  };

  const handleUpdateFinish = (updateFinish: Task) => {
    onUpdateFinish(updateFinish);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toISOString().slice(0, 10);
  };

  return (
    <div
      className={
        task.process === 'Completed'
          ? 'card  col-sm-4 card_completed'
          : task.process === 'Not Started'
          ? 'card  col-sm-4 card_noStarted'
          : task.process === 'In Progress'
          ? 'card col-sm-4 card_isProgress'
          : undefined
      }
    >
      <div className='card-body'>
        <div className='card-up d-flex justify-content-between'>
          <h2 className='card-title'>{task.title} - {task.category}</h2>
          <h5 className='card-title'>{task.priority}</h5>
        </div>
        <p className='card-text'>{task.description}</p>

        <div className='d-flex justify-content-between'>
          <p className='card-text fs-5'>{task.process}</p>
          <p className='card-text '>{formatDate(task.date)}</p>
        </div>
        <div className='mt-1 d-flex justify-content-between'>
          <TaskUpdate
            key={task.id}
            task={task}
            onUpdateTask={handleUpdateTask}
          />
          {task.finish === true ? (
            <TaskDelete deleteTask={deleteTask} taskId={task.id} />
          ) : task.process === 'Not Started' ? (
            <TaskInProgress task={task} onUpdateFinish={handleUpdateFinish} />
          ) : task.process === 'In Progress' ? (
            <TaskComplete task={task} onUpdateFinish={handleUpdateFinish} />
          ) : undefined}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
