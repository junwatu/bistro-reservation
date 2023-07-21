import { BistroInterface } from 'interfaces/bistro';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ReservationInterface {
  id?: string;
  bistro_id: string;
  user_id: string;
  status: string;
  created_at?: any;
  updated_at?: any;

  bistro?: BistroInterface;
  user?: UserInterface;
  _count?: {};
}

export interface ReservationGetQueryInterface extends GetQueryInterface {
  id?: string;
  bistro_id?: string;
  user_id?: string;
  status?: string;
}
