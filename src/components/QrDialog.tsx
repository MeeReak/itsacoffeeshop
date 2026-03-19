'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { KHQRCard } from './KHQRCard';
interface QrDialogProps {
  qrUrl?: string; // QR image URL
  state?: 'loading' | 'success' | 'error' | 'idle';
}

export const QrDialog: React.FC<QrDialogProps> = ({ state = 'idle' }) => {
  return (
    <Dialog>
      <DialogTrigger className="bg-black text-white px-5 py-3 rounded-lg hover:opacity-90 transition text-lg font-medium w-full">
        Pay with QR
      </DialogTrigger>

      <DialogContent className="w-lg rounded-xl p-6 md:p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4 text-center">
            {state === 'loading'
              ? 'Generating Your QR...'
              : state === 'success'
                ? 'Payment Successful'
                : state === 'error'
                  ? 'Payment Failed'
                  : 'Scan QR to Pay'}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center gap-6">
          {/* Status Icon */}
          {state === 'loading' && (
            <Loader2 className="animate-spin w-14 h-14 text-black" />
          )}
          {state === 'success' && (
            <CheckCircle className="w-20 h-20 text-green-500" />
          )}
          {state === 'error' && (
            <AlertCircle className="w-20 h-20 text-red-500" />
          )}

          {/* QR Code */}
          {state === 'idle' && <KHQRCard qrUrl="" currency="USD" />}

          {/* Description Text */}
          <p className={`text-center text-gray-600 text-sm md:text-base`}>
            {state === 'loading'
              ? 'Please wait while we generate your QR code.'
              : state === 'success'
                ? 'Thank you for your payment!'
                : state === 'error'
                  ? 'Something went wrong. Please try again.'
                  : 'Open your app and scan this QR code to pay.'}
          </p>

          {/* Close Button */}
          {(state === 'success' || state === 'error') && (
            <DialogClose className="mt-4 w-full md:w-auto px-6 py-3 bg-[#f5dc50] text-black font-semibold rounded-lg hover:bg-[#e7cc3e] transition text-center">
              Close
            </DialogClose>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
