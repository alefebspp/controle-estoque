import { Toast, toast } from 'react-hot-toast';
import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons';

import Button from '../Button/Button';

import { ConfirmToastProps } from './interface';

const ConfirmToast = ({ children, confirmFn }: ConfirmToastProps) => {
  const handleConfirmFn = (t: Toast) => () => {
    confirmFn();
    toast.dismiss(t.id);
  };

  const showConfirmToast = () =>
    toast(
      (t) => (
        <div className="flex items-center gap-[1rem] max-w-md w-[200px]">
          <span className="text-sm">Confirmar ação?</span>
          <div className="flex h-full gap-[1rem]">
            <CheckCircledIcon
              onClick={handleConfirmFn(t)}
              className="text-secondary-dark w-6 h-6 cursor-pointer"
            />
            <CrossCircledIcon
              onClick={() => toast.dismiss(t.id)}
              className="text-red-500 w-6 h-6 cursor-pointer"
            />
          </div>
        </div>
      ),
      {
        duration: 10000,
      },
    );

  return (
    <Button onClick={showConfirmToast} size="icon" variant="ghost">
      {children}
    </Button>
  );
};

export default ConfirmToast;
