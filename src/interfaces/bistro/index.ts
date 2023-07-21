import { OrderInterface } from 'interfaces/order';
import { ReservationInterface } from 'interfaces/reservation';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface BistroInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  order?: OrderInterface[];
  reservation?: ReservationInterface[];
  user?: UserInterface;
  _count?: {
    order?: number;
    reservation?: number;
  };
}

export interface BistroGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
