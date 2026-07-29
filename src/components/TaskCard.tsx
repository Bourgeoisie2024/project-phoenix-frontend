import { Task, Priority } from '../types/task';
import { Trash2, GripVertical } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

const priorityColors: Record<Priority, string> = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

export function TaskCard({ task, onDelete, onEdit }: TaskCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start gap-2">
        <GripVertical className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{task.title}</h3>
          {task.description && (
            <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">{task.description}</p>
          )}
          <div className="flex items-center justify-between">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                priorityColors[task.priority]
              }`}
            >
              {task.priority}
            </span>
            <button
              onClick={() => onDelete(task.id)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all duration-300"
              aria-label="Delete task"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
