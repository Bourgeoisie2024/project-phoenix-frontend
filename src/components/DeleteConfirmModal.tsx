import { AlertTriangle, X } from 'lucide-react';

interface DeleteConfirmModalProps {
  taskTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
  darkMode: boolean;
}

export function DeleteConfirmModal({
  taskTitle,
  onConfirm,
  onCancel,
  darkMode,
}: DeleteConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className={`rounded-2xl shadow-xl max-w-md w-full p-6 transition-colors ${
          darkMode
            ? 'bg-slate-800'
            : 'bg-white'
        }`}
      >

        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-red-100">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>

            <div>
              <h2 className={`text-xl font-semibold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                Delete Task
              </h2>

              <p className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                This action cannot be undone.
              </p>
            </div>
          </div>

          <button
            onClick={onCancel}
            className={`transition-colors ${
              darkMode
                ? 'text-gray-400 hover:text-white'
                : 'text-gray-400 hover:text-gray-600'
            }`}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>


        <div className="mb-6">
          <p className={`${
            darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
            Are you sure you want to delete:
          </p>

          <p className={`mt-2 font-semibold break-words ${
            darkMode ? 'text-white' : 'text-gray-900'
            }`}>
            "{taskTitle}"
          </p>
        </div>


        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              darkMode
                ? 'border border-slate-600 text-gray-200 hover:bg-slate-700'
                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            Delete Task
          </button>
        </div>

      </div>
    </div>
  );
}
