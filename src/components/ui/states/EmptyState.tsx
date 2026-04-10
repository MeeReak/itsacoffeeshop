import { Search, RotateCcw } from 'lucide-react';
import { Button } from '../button';

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState = ({
  title = 'No results found',
  message = 'Try adjusting your filters or search terms.',
  actionLabel = 'Clear filters',
  onAction,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-100">
      <div className="bg-white p-4 rounded-full shadow-sm mb-4">
        <Search className="w-10 h-10 text-gray-300" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 max-w-xs mx-auto mb-6">{message}</p>
      {onAction && (
        <Button
          onClick={onAction}
          className="bg-black text-white hover:opacity-90 flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
