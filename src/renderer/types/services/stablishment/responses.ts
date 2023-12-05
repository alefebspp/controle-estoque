import { Stablishment } from '../../types';
import { DefaultResponse } from '../response';

export type GetStablishmentsResponse = Omit<DefaultResponse, 'data'> & {
  stablishments: Stablishment[];
};

export type GetStablishmentResponse = Omit<DefaultResponse, 'data'> & {
  stablishment?: Stablishment;
};
