import { Task, Priority } from '../types/task';
import { Trash2, GripVertical, Pencil } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
  darkMode: boolean;
}

const priorityColors: Record<Priority, string> = {
  low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

export function TaskCard({ task, onDelete, onEdit, darkMode, }: TaskCardProps) {
  return (
    <div
      className={`rounded-xl shadow-sm border p-5 hover:shadow-lg transition-all duration-300 ${
        darkMode
          ? 'bg-slate-800 border-slate-700'
          : 'bg-white border-gray-200'
      }`}
    >
      <div className="flex items-start gap-2">
        <GripVertical
          className={`w-4 h-4 mt-1 flex-shrink-0 ${
            darkMode ? 'text-gray-500' : 'text-gray-400'
          }`}
        />
        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold mb-2 text-sm sm:text-base ${
              darkMode
                ? 'text-white'
                : 'text-gray-900'
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p
              className={`text-sm mb-4 leading-relaxed line-clamp-3 ${
                darkMode
                  ? 'text-gray-300'
                  : 'text-gray-600'
              }`}
            >
              {task.description}
            </p>
          )}
          <div className="flex items-center justify-between">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                priorityColors[task.priority]
              }`}
            >
              {task.priority}
            </span>

            <div className="flex items-center gap-2">

            <button
              onClick={() => onEdit(task)}
              className={`transition-colors ${
                darkMode
                  ? 'text-gray-400 hover:text-blue-400'
                  : 'text-gray-400 hover:text-blue-600'
              }`}
              aria-label="Edit task"
            >
              <Pencil className="w-4 h-4" />
            </button>

            <button
              onClick={() => onDelete(task.id)}
              className={`transition-colors ${
                darkMode
                  ? 'text-gray-400 hover:text-red-400'
                  : 'text-gray-400 hover:text-red-600'
              }`}
              aria-label="Delete task"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
