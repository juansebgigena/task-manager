import './TaskFilters.css';

const TaskFilters = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { name: 'All', value: 'all' },
    { name: 'Pending', value: 'pending' },
    { name: 'Completed', value: 'completed' }
  ];

  return (
    <div className="task-filters">
      {filters.map(f => (
        <button
          key={f.value}
          className={currentFilter === f.value ? 'active' : ''}
          onClick={() => onFilterChange(f.value)}
        >
          {f.name}
        </button>
      ))}
    </div>
  );
};

export default TaskFilters;