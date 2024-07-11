import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { z } from 'zod';
import { TaskResponse } from '../model/task';
import ApiService from '../service/ApiService';
import { addNewTask } from '../reducer/taskSlice';

const defaultDate = new Date();

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  process: z.enum(['Not Started', 'In Progress', 'Completed']),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format',
  }),
  priority: z.enum(['High', 'Medium', 'Low']),
});

const TaskAdd = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<TaskResponse>({
    title: '',
    description: '',
    category: '',
    finish: false,
    process: '',
    date: defaultDate,
    priority: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleTask = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: name === 'date' ? new Date(value) : value,
    }));
  };

  const validateForm = () => {
    try {
      const parsedData = {
        ...data,
        date: data.date.toISOString().split('T')[0],
      };
      taskSchema.parse(parsedData);
      setErrors({});
      setIsFormValid(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          validationErrors[err.path[0]] = err.message;
        });
        setErrors(validationErrors);
        setIsFormValid(false);
      }
    }
  };

  useEffect(() => {
    validateForm();
  }, [data]);

  const handleCreateTask = async () => {
    try {
      const parsedData = {
        ...data,
        date: data.date.toISOString().split('T')[0],
      };
      taskSchema.parse(parsedData);

      const response = await ApiService.post<TaskResponse>('/object', parsedData);
      const newTask = response.data;

      dispatch(addNewTask(newTask));

      setData({
        title: '',
        description: '',
        category: '',
        finish: false,
        process: '',
        priority: '',
        date: defaultDate,
      });

      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          validationErrors[err.path[0]] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.error('Wystąpił błąd podczas dodawania zadania:', error);
      }
    }
  };

  return (
    <div className='m-4'>
      <button
        type='button'
        className='btn btn-primary'
        data-bs-toggle='modal'
        data-bs-target='#exampleModal'
      >
        <i className="bi bi-plus-lg"></i>
      </button>
      <div
        className='modal fade'
        id='exampleModal'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='exampleModalLabel'>
                Add Task
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
                  onChange={handleTask}
                  value={data.title}
                  placeholder='Title'
                />
                {errors.title && <div className="text-danger">{errors.title}</div>}
              </div>
              <div className='mb-3'>
                <label className='form-label'>Description</label>
                <input
                  type='text'
                  className='form-control'
                  name='description'
                  onChange={handleTask}
                  value={data.description}
                  placeholder='Description'
                />
                {errors.description && <div className="text-danger">{errors.description}</div>}
              </div>
              <div className='mb-3'>
                <label className='form-label'>Category</label>
                <select
                  className='form-select'
                  name='category'
                  onChange={handleTask}
                  value={data.category}
                >
                  <option>Select by Category</option>
                  <option value='work'>work</option>
                  <option value='shopping'>shopping</option>
                  <option value='health'>health</option>
                  <option value='education'>education</option>
                  <option value='home'>home</option>
                  <option value='entertainment'>entertainment</option>
                </select>
                {errors.category && <div className="text-danger">{errors.category}</div>}
              </div>
              <div className='mb-3'>
                <label className='form-label'>Priority</label>
                <select
                  className='form-select'
                  name='priority'
                  onChange={handleTask}
                  value={data.priority}
                >
                  <option>Select by priority</option>
                  <option value='High'>High</option>
                  <option value='Medium'>Medium</option>
                  <option value='Low'>Low</option>
                </select>
                {errors.priority && <div className="text-danger">{errors.priority}</div>}
              </div>
              <div className='mb-3'>
                <label className='form-label'>Date</label>
                <input
                  type='date'
                  className='form-control'
                  name='date'
                  onChange={handleTask}
                  value={data.date.toISOString().slice(0, 10)}
                />
                {errors.date && <div className="text-danger">{errors.date}</div>}
              </div>
              <div className='mb-3'>
                <label className='form-label'>Process</label>
                <select
                  className='form-select'
                  name='process'
                  onChange={handleTask}
                  value={data.process}
                >
                  <option>Select by process</option>
                  <option value='Not Started'>Not Started</option>
                  <option value='In Progress'>In Progress</option>
                  <option value='Completed'>Completed</option>
                </select>
                {errors.process && <div className="text-danger">{errors.process}</div>}
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
                onClick={handleCreateTask}
                type='button'
                className='btn btn-primary'
                data-bs-dismiss='modal'
                disabled={!isFormValid}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskAdd;
