import { toast } from 'react-toastify';

export function showErrorToast(errorMessage: string) {
  toast.error(errorMessage, {
    theme: 'colored',
    draggable: false,
  });
}

export function showSuccessToast(messageSuccess: string) {
  toast.success(messageSuccess, {
    theme: 'colored',
    draggable: false,
  });
}
