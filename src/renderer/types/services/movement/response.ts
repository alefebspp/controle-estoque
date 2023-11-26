import { Movement } from '../../types';
import { DefaultResponse } from '../response';

export interface GetMovementsResponse extends DefaultResponse {
  movements: Movement[];
}
