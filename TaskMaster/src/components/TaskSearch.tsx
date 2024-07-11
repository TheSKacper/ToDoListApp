interface Props {
  searchByProcess: (name: string) => void;
}
const TaskSearch = ({ searchByProcess }: Props) => {
  return (
    <select
      className='form-select mb-3'
      onChange={(e) => searchByProcess(e.target.value)}
    >
      <option value=''>Search by progress</option>
      <option value='Not Started'>Not Started</option>
      <option value='In Progress'>In Progress</option>
      <option value='Completed'>Completed</option>
      <option value='Finish'>Finish</option>
      <option value='No Finish'>No Finish</option>
    </select>
  );
};

export default TaskSearch;
