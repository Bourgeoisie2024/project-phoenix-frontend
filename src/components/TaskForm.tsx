import { useState, FormEvent } from 'react';
import { CreateTaskInput, Priority, Status } from '../types/task';
import { X } from 'lucide-react';

interface TaskFormProps {
  onSubmit: (task: CreateTaskInput) => void;
  onClose: () => void;
  initialStatus?: Status;
  darkMode: boolean;

  initialTask?: {
    title: string;
    description: string;
    priority: Priority;
    status: Status;
  };

  submitLabel?: string;
}

export function TaskForm({
  onSubmit,
  onClose,
  initialStatus = 'todo',
  initialTask,
  submitLabel = 'Create Task',
  darkMode,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialTask?.title ?? '');
  const [description, setDescription] = useState(initialTask?.description ?? '');
  const [priority, setPriority] = useState<Priority>(
    initialTask?.priority ?? 'medium'
);
  const [status, setStatus] = useState<Status>(
    initialTask?.status ?? initialStatus
);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
    });

    setTitle('');
    setDescription('');
    setPriority('medium');
    setStatus(initialStatus);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className={`rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto transition-colors duration-300 ${
          darkMode
            ? 'bg-slate-800 text-white'
            : 'bg-white text-gray-900'
        }`}
      >
        <div
          className={`flex items-center justify-between p-6 border-b ${
            darkMode
              ? 'border-gray-700'
              : 'border-gray-200'
          }`}
        >
          <h2 className="text-xl font-semibold">{initialTask ? 'Edit Task' : 'Create New Task'}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                darkMode
                  ? 'text-gray-200'
                  : 'text-gray-700'
              }`}
            >
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode
                  ? 'bg-slate-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              placeholder="Enter task title"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode
                  ? 'bg-slate-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              placeholder="Enter task description"
            />
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode
                  ? 'bg-slate-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode
                  ? 'bg-slate-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors font-medium ${
                darkMode
                  ? 'border-gray-600 text-gray-200 hover:bg-slate-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
