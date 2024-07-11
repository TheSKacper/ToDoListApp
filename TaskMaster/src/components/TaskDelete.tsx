interface Props {
  taskId: number;
  deleteTask: (taskId: number) => void;
}

const TaskDelete = ({ taskId, deleteTask }: Props) => {
  const handleDeleteTask = () => {
    deleteTask(taskId);
  };

  return (
    <button className='btn btn-danger' onClick={handleDeleteTask}>
      <i className="bi bi-trash-fill"></i>
    </button>
  );
};

export default TaskDelete;
