import { useState, useEffect } from 'react';
import { Task } from '../model/task';

interface Props {
  task: Task;
  onUpdateTask: (updatedTask: Task) => void;
}

const TaskUpdate = ({ task, onUpdateTask }: Props) => {
  const [updateTask, setUpdateTask] = useState<Task>(task);

  useEffect(() => {
    setUpdateTask(task);
  }, [task]);

  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setUpdateTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleUpdateTask = () => {
    onUpdateTask(updateTask);
  };

  return (
    <div>
      <button
        type='button'
        className='btn btn-primary'
        data-bs-toggle='modal'
        data-bs-target={`#updateModal-${task.id}`}
      >
        <i className="bi bi-info"></i>
      </button>
      <div
        className='modal fade'
        id={`updateModal-${task.id}`}
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='exampleModalLabel'>
                Update Task
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <div className='mb-3'>
                <label className='form-label'>Title</label>
                <input
                  type='text'
                  className='form-control'
                  name='title'
                  placeholder='Title'
                  onChange={handleTaskChange}
                  value={updateTask.title}
                />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Description</label>
                <input
                  type='text'
                  className='form-control'
                  name='description'
                  placeholder='Description'
                  onChange={handleTaskChange}
                  value={updateTask.description}
                />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Category</label>
                <select
                  className='form-select'
                  name='category'
                  onChange={handleTaskChange}
                  value={updateTask.category}
                >
                  <option>Select by Category</option>
                  <option value='work'>work</option>
                  <option value='shopping'>shopping</option>
                  <option value='health'>health</option>
                  <option value='education'>education</option>
                  <option value='home'>home</option>
                  <option value='entertaiment'>entertaiment</option>
                </select>
              </div>
              <div className='mb-3'>
                <label className='form-label'>Process</label>
                <select
                  className='form-select'
                  name='process'
                  onChange={handleTaskChange}
                  value={updateTask.process}
                >
                  <option value='Not Started'>Not Started</option>
                  <option value='In Progress'>In Progress</option>
                  <option value='Completed'>Completed</option>
                </select>
              </div>
              <div className='mb-3'>
                <label className='form-label'>Prioryty</label>
                <select
                  className='form-select'
                  name='priority'
                  onChange={handleTaskChange}
                  value={updateTask.priority}
                >
                  <option value='High'>High</option>
                  <option value='Medium'>Medium</option>
                  <option value='Low'>Low</option>
                </select>
              </div>
              <div className='mb-3'>
                <label className='form-label'>Date</label>
                <input
                  type='date'
                  className='form-control'
                  name='date'
                  onChange={handleTaskChange}
                  value={updateTask.date}
                />
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Close
              </button>
              <button
                type='button'
                className='btn btn-primary'
                data-bs-dismiss='modal'
                onClick={handleUpdateTask}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskUpdate;
