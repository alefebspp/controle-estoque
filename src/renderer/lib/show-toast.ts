import { toast } from 'react-hot-toast';

export function showErrorToast(errorMessage: string) {
  toast.error(errorMessage, { id: 'toast-error' });
}

export function showSuccessToast(messageSuccess: string) {
  toast.success(messageSuccess, { id: 'toast-success' });
}

export function showLoadingToast(message: string) {
  toast.loading(message, { id: 'loading-toast' });
}

export function dismissLoadingToast() {
  toast.dismiss('loading-toast');
}
