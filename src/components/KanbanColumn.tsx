import { useState } from 'react';
import { Task, Status } from '../types/task';
import { TaskCard } from './TaskCard';
import { Plus, ClipboardList } from 'lucide-react';

interface KanbanColumnProps {
  title: string;
  status: Status;
  tasks: Task[];
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
  onAddTask: (status: Status) => void;
  onDrop: (taskId: number, newStatus: Status) => void;
}

const statusColors: Record<Status, string> = {
  todo: 'bg-gray-100 border-gray-300',
  in_progress: 'bg-blue-50 border-blue-300',
  done: 'bg-green-50 border-green-300',
};

export function KanbanColumn({
  title,
  status,
  tasks,
  onDelete,
  onEdit,
  onAddTask,
  onDrop,
}: KanbanColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const taskId = parseInt(e.dataTransfer.getData('taskId'));
    if (taskId) {
      onDrop(taskId, status);
    }
  };

  const handleDragStart = (e: React.DragEvent, taskId: number) => {
    e.dataTransfer.setData('taskId', taskId.toString());
  };

  return (
    <div className={`flex-1 min-w-0 rounded-2xl border ${statusColors[status]} p-5 shadow-sm hover:shadow-md transition-shadow duration-300`}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <h2 className="font-bold text-gray-900 uppercase tracking-wide text-sm">{title}</h2>
          <span className="inline-flex items-center justify-center min-w-7 h-7 px-2 text-xs font-semibold bg-white rounded-full border border-gray-300 shadow-sm">
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAddTask(status)}
          className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-white transition-all duration-300"
          aria-label="Add task"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`space-y-3 min-h-[200px] rounded-xl transition-all duration-200 ${
          isDragOver
          ? 'bg-blue-50 ring-2 ring-blue-400 ring-offset-2'
          : ''
        }`}
      >
        {tasks.map((task) => (
          <div
            key={task.id}
            draggable
            onDragStart={(e) => handleDragStart(e, task.id)}
            className="cursor-move"
          >
            <TaskCard task={task} onDelete={onDelete} onEdit={onEdit} />
          </div>
        ))}

        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <ClipboardList className="w-8 h-8 text-gray-300 mb-3" />

            <p className="text-sm font-medium text-gray-500">
              No tasks yet
            </p>

            <button
              onClick={() => onAddTask(status)}
              className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Create your first task
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
