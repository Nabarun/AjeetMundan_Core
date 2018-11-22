import { Service } from '../service/service.model';
import { Observable } from 'rxjs/Observable';

export interface Deals {
  $key: string;
  cuponcode: string;
  fullPath:string;
  image:string;
  title: string;
  serviceid: string;
  offertype: string;
  maxoffer: string;
  expiredate: string;
  userlimit: number;
  ordercount: number;
  service$?: Observable<Service>;
  status: string;
}