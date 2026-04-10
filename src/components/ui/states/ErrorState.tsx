import { AlertCircle, RefreshCcw } from 'lucide-react';
import { Button } from '../button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState = ({
  title = 'Something went wrong',
  message = "We couldn't load the information. Please try again.",
  onRetry,
}: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-300">
      <div className="bg-red-50 p-4 rounded-full mb-4">
        <AlertCircle className="w-10 h-10 text-red-500" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 max-w-xs mx-auto mb-6">{message}</p>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          className="flex items-center gap-2 border-red-200 hover:bg-red-50"
        >
          <RefreshCcw className="w-4 h-4" />
          Retry Now
        </Button>
      )}
    </div>
  );
};
