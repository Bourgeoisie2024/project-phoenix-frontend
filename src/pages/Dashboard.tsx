import { toast } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Task, CreateTaskInput, Status, Priority } from '../types/task';
import { taskApi } from '../services/api';
import { KanbanColumn } from '../components/KanbanColumn';
import { TaskForm } from '../components/TaskForm';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';
import { Plus, RefreshCw, LogOut, CheckCircle2, Clock3, ListTodo, Search, Moon, Sun } from 'lucide-react';


export function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [initialStatus, setInitialStatus] = useState<Status>('todo');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<
    'all' | Status
  >('all');
  const [darkMode, setDarkMode] = useState(() => {
  return localStorage.getItem("theme") === "dark";
  });
  const [priorityFilter, setPriorityFilter] = useState<
  'all' | Priority
  >('all');
  const [sortOption, setSortOption] = useState<
  'newest' | 'oldest' | 'priority_high' | 'priority_low'
  >('newest');
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskApi.getTasks();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [token]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleCreateTask = async (taskInput: CreateTaskInput) => {
    try {
      const newTask = await taskApi.createTask(taskInput);
      setTasks((prev) => [newTask, ...prev]);
      setShowForm(false);
      toast.success('Task created successfully');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to create task');
    }
  };

  const handleUpdateTask = async (
    id: number,
    updates: CreateTaskInput
  ) => {
    try {
      const updatedTask = await taskApi.updateTask(id, updates);

      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? updatedTask : task
        )
      );

      setEditingTask(null);
      setShowForm(false);
      toast.success("Task updated successfully");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update task');
    }
  };

  const handleDeleteTask = (id: number) => {
    const task = tasks.find((task) => task.id === id);

    if (task) {
      setTaskToDelete(task);
    }
  };

  const confirmDeleteTask = async () => {
    if (!taskToDelete) return;

    try {
      await taskApi.deleteTask(taskToDelete.id);

      setTasks((prev) =>
        prev.filter((task) => task.id !== taskToDelete.id)
      );

      setTaskToDelete(null);

      toast.success("Task deleted successfully");

    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete task');
    }
  };

  const handleUpdateTaskStatus = async (taskId: number, newStatus: Status) => {
    try {
      const updatedTask = await taskApi.updateTask(taskId, { status: newStatus });
      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? updatedTask : task))
      );
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update task');
    }
  };

  const handleAddTask = (status: Status) => {
  setEditingTask(null);
  setInitialStatus(status);
  setShowForm(true);
  };

  const handleEditTask = (task: Task) => {
  setEditingTask(task);
  setShowForm(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const filteredTasks = tasks.filter((task) => {
    const query = searchTerm.toLowerCase();

    const matchesSearch =
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query);

    const matchesStatus =
      statusFilter === 'all' ||
      task.status === statusFilter;

    const matchesPriority =
      priorityFilter === 'all' ||
      task.priority === priorityFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortOption) {
      case 'oldest':
        return (
          new Date(a.created_at).getTime() -
          new Date(b.created_at).getTime()
        );

      case 'priority_high': {
        const priorityOrder = {
          high: 3,
          medium: 2,
          low: 1,
        };

        return (
          priorityOrder[b.priority] -
          priorityOrder[a.priority]
        );
      }

      case 'priority_low': {
        const priorityOrder = {
          high: 3,
          medium: 2,
          low: 1,
        };

        return (
          priorityOrder[a.priority] -
          priorityOrder[b.priority]
        );
      }

      case 'newest':
      default:
        return (
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
        );
    }
  });

  const todoTasks = sortedTasks.filter(
    (task) => task.status === 'todo'
  );

  const inProgressTasks = sortedTasks.filter(
    (task) => task.status === 'in_progress'
  );

  const doneTasks = sortedTasks.filter(
    (task) => task.status === 'done'
  );

  if (loading) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Summary skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm animate-pulse"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full" />

                <div className="flex-1">
                  <div className="h-3 bg-gray-200 rounded w-20 mb-3" />
                  <div className="h-6 bg-gray-200 rounded w-12" />
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* Kanban skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {[1, 2, 3].map((column) => (
            <div
              key={column}
              className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm animate-pulse"
            >
              <div className="flex justify-between mb-5">
                <div className="h-5 bg-gray-200 rounded w-24" />
                <div className="h-7 w-7 bg-gray-200 rounded-full" />
              </div>

              <div className="space-y-3">

                {[1, 2].map((card) => (
                  <div
                    key={card}
                    className="bg-gray-100 rounded-lg p-4"
                  >
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                    <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                ))}

              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );}

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 transition-colors duration-300">
      <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 shadow-lg transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12">
                <img
                  src="/phoenix.svg"
                  alt="Project Phoenix"
                  className="w-full h-full"
                />
              </div>

              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Project Phoenix
                </h1>

                <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">
                  Cloud-Native Task Management Dashboard
                </p>

                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 transition-colors">
                  Welcome back,{" "}
                  <span className="font-semibold">
                    {user?.username}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-end items-stretch sm:items-center gap-3 w-full xl:w-auto">
              <button
                onClick={loadTasks}
                className="w-full sm:w-auto p-3 rounded-xl border border-gray-200 hover:bg-gray-100 transition-all duration-300"
                aria-label="Refresh tasks"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="w-full sm:w-auto p-3 rounded-xl border border-gray-200 hover:bg-gray-100 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => handleAddTask('todo')}
                className="flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                New Task
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto px-5 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-100 transition-all duration-300"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 shadow-sm transition-colors duration-300">
            <div className="flex items-center gap-3">
              <ListTodo className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">
                  Total Tasks
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">
                  {tasks.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 shadow-sm transition-colors duration-300">
            <div className="flex items-center gap-3">
              <ListTodo className="w-8 h-8 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">
                  To Do
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">
                  {todoTasks.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 shadow-sm transition-colors duration-300">
            <div className="flex items-center gap-3">
              <Clock3 className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">
                  In Progress
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">
                  {inProgressTasks.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 shadow-sm transition-colors duration-300">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">
                  Completed
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">
                  {doneTasks.length}
                </p>
              </div>
            </div>
          </div>

        </div>
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:flex-wrap">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tasks by title or description..."
              className="w-full rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 py-3 pl-12 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as 'all' | Status)
            }
            className="rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent md:w-56"
          >
            <option value="all">All Statuses</option>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) =>
              setPriorityFilter(e.target.value as 'all' | Priority)
            }
            className="rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent md:w-56"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <select
            value={sortOption}
            onChange={(e) =>
              setSortOption(
                e.target.value as
                | 'newest'
                | 'oldest'
                | 'priority_high'
                | 'priority_low'
              )
            }
            className="rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent md:w-56"
          >
            <option value="newest">
              Newest First
            </option>

            <option value="oldest">
              Oldest First
            </option>

            <option value="priority_high">
              Priority: High → Low
            </option>

            <option value="priority_low">
              Priority: Low → High
            </option>
          </select>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
          <KanbanColumn
            title="To Do"
            status="todo"
            tasks={todoTasks}
            darkMode={darkMode}
            onDelete={handleDeleteTask}
            onEdit={(task) => {
              setEditingTask(task);
              setShowForm(true);
            }}
            onAddTask={handleAddTask}
            onDrop={handleUpdateTaskStatus}
          />
          <KanbanColumn
            title="In Progress"
            status="in_progress"
            tasks={inProgressTasks}
            darkMode={darkMode}
            onDelete={handleDeleteTask}
            onEdit={(task) => {
              setEditingTask(task);
              setShowForm(true);
            }}
            onAddTask={handleAddTask}
            onDrop={handleUpdateTaskStatus}
          />
          <KanbanColumn
            title="Done"
            status="done"
            tasks={doneTasks}
            darkMode={darkMode}
            onDelete={handleDeleteTask}
            onEdit={(task) => {
              setEditingTask(task);
              setShowForm(true);
            }}
            onAddTask={handleAddTask}
            onDrop={handleUpdateTaskStatus}
          />
        </div>
      </main>

      {showForm && (
        <TaskForm
          initialTask={editingTask ?? undefined}
          darkMode={darkMode}
          onSubmit={(taskData) => {
            if (editingTask) {
              handleUpdateTask(editingTask.id, taskData);
            } else {
              handleCreateTask(taskData);
            }
          }}
          onClose={() => {
            setEditingTask(null);
            setShowForm(false);
          }}
          initialStatus={initialStatus}
          submitLabel={editingTask ? "Save Changes" : "Create Task"}
        />
      )}
      {taskToDelete && (
        <DeleteConfirmModal
          taskTitle={taskToDelete.title}
          onCancel={() => setTaskToDelete(null)}
          onConfirm={confirmDeleteTask}
          darkMode={darkMode}
        />
      )}

    </div>
  );
}
