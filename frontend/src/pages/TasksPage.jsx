import React from 'react';
import { useTasks } from '../hooks/useTasks.js';
import { useAuthContext } from "../context/AuthContext.jsx";
import TaskForm from '../components/TaskForm.jsx';
import TaskList from '../components/TaskList.jsx';
import TaskFilters from '../components/TaskFilters.jsx';
import SearchBar from '../components/SearchBar.jsx';
import './Tasks.css';

const TaskPage = () => {
    const {
        tasks,
        loading,
        currentFilter,
        searchTerm,
        error,
        addTask,
        completeTask,
        deleteTask,
        setFilter,
        setSearchTerm
    } = useTasks();

    const { logout, user } = useAuthContext();

    return (
        <div className="task-page-container">
            <header className="task-header">
                <div className="user-info">
                    <h1>Tasks</h1>
                    {user && <p className="welcome-text">Welcome, <strong>{user.name}</strong></p>}
                </div>
                <button onClick={logout} className="btn-logout">
                    Log Out
                </button>
            </header>

            <main className="task-content">
                {error && <div className="error-badge">{error}</div>}
                <section className="creation-section">
                    <TaskForm onAdd={addTask} />
                </section>

                <section className="controls-section">
                    <div className="controls-wrapper">
                        <SearchBar value={searchTerm} onChange={setSearchTerm} />
                        <TaskFilters currentFilter={currentFilter} onFilterChange={setFilter} />
                    </div>

                    <div className="results-count">
                        <span>{tasks.length} tasks found</span>
                    </div>
                </section>

                <section className="list-section">
                    <TaskList
                        tasks={tasks}
                        loading={loading}
                        onDelete={deleteTask}
                        onToggle={completeTask}
                    />
                </section>
            </main>
        </div>
    );
};

export default TaskPage;