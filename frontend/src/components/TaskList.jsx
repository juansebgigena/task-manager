import TaskItem from './TaskItem.jsx';
import './TaskList.css';

const TaskList = ({ tasks, loading, onDelete, onToggle }) => {
  if (loading) {
    return (
      <div className="task-list-status">
        <div className="spinner"></div>
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="task-list-status">
        <p>No matching tasks were found.</p>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default TaskList;