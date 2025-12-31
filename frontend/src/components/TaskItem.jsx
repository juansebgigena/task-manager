import './TaskItem.css';

export const TaskItem = ({ task, onDelete, onToggle }) => {
  return (
    <div className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}>
      <div>
        <h4>{task.title}</h4>
        <p>{task.description}</p>
        <small>Status: {task.status}</small>
      </div>

      <div className="actions">
        <input
          type="checkbox"
          checked={task.status === "completed"}
          onChange={() => onToggle(task.id, task.status === "completed" ? "pending" : "completed")}
        />

        <button onClick={() => onDelete(task.id)} className="btn-delete">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;