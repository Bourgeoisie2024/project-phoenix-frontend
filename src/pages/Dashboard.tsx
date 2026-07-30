import { toast } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Task, CreateTaskInput, Status } from '../types/task';
import { taskApi } from '../services/api';
import { KanbanColumn } from '../components/KanbanColumn';
import { TaskForm } from '../components/TaskForm';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';
import { LayoutDashboard, Plus, RefreshCw, LogOut, CheckCircle2, Clock3, ListTodo } from 'lucide-react';


export function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [initialStatus, setInitialStatus] = useState<Status>('todo');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
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
      alert(err instanceof Error ? err.message : 'Failed to update task');
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

  const todoTasks = tasks.filter((task) => task.status === 'todo');
  const inProgressTasks = tasks.filter((task) => task.status === 'in_progress');
  const doneTasks = tasks.filter((task) => task.status === 'done');

  if (loading) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Summary skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white border-b border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
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

                <p className="text-sm text-gray-500">
                  Cloud-Native Task Management Dashboard
                </p>

                <p className="text-sm text-gray-700 mt-1">
                  Welcome back,{" "}
                  <span className="font-semibold">
                    {user?.username}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-col min-[390px]:flex-row min-[390px]:flex-wrap min-[390px]:justify-end items-stretch min-[390px]:items-center gap-3 w-full lg:w-auto">
              <button
                onClick={loadTasks}
                className="w-full min-[390px]:w-auto p-3 rounded-xl border border-gray-200 hover:bg-gray-100 transition-all duration-300"
                aria-label="Refresh tasks"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleAddTask('todo')}
                className="flex items-center justify-center gap-2 whitespace-nowrap w-full min-[390px]:w-auto px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                New Task
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 whitespace-nowrap w-full min-[390px]:w-auto px-5 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-100 transition-all duration-300"
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

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <ListTodo className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">
                  Total Tasks
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {tasks.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <ListTodo className="w-8 h-8 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">
                  To Do
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {todoTasks.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <Clock3 className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">
                  In Progress
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {inProgressTasks.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-500">
                  Completed
                </p>
                <p className="text-2xl font-bold text-gray-900">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <KanbanColumn
            title="To Do"
            status="todo"
            tasks={todoTasks}
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
        />
      )}

    </div>
  );
}
