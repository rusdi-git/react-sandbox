import { FetchListType } from '../helper/type';

export interface PersonData {
  id: string;
  name: string;
  address: string;
  age: number;
  gender: 'l' | 'p';
  job: string;
  phoneNumber: string;
  email: string;
}

export interface PersonDataResponse extends FetchListType<PersonData> {
  data: PersonData[];
}
