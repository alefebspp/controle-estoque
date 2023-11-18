import { PropsWithChildren } from 'react';
import { DefaultResponse } from '../../types/services/response';

export interface ConfirmToastProps extends PropsWithChildren {
  confirmFn: () => Promise<DefaultResponse>;
}
