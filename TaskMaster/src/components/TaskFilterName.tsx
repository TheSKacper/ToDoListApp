interface Props {
  searchName: (name: string) => void;
}

const TaskFilterName = ({ searchName }: Props) => {
  return (
    <div className='input-group mb-3 mt-4'>
      <span className='input-group-text'>
      <i className="bi bi-search"></i>
      </span>
      <input
        type='text'
        className='form-control'
        placeholder='Search by name...'
        onChange={(e) => searchName(e.target.value)}
      />
    </div>
  );
};

export default TaskFilterName;
