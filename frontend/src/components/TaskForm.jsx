import { useRef, useState } from 'react';
import './TaskForm.css';

const TaskForm = ({ onAdd }) => {
  const titleRef = useRef();
  const descRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newTask = {
      title: titleRef.current.value,
      description: descRef.current.value
    };

    if (!newTask.title.trim()) return;

    setIsSubmitting(true);

    try {
      await onAdd(newTask);
      e.target.reset();
      titleRef.current.focus();
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <input
          name="title"
          ref={titleRef}
          type="text"
          placeholder="What needs to be done?"
          autoComplete="off"
          required
        />
      </div>
      
      <div className="form-group">
        <textarea
          name="description"
          ref={descRef}
          placeholder="Add a description (optional)..."
          rows="2"
        />
      </div>

      <button 
        type="submit" 
        className="btn-add-task" 
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Saving...' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;