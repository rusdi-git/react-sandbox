import faker from '@faker-js/faker';
import { sample } from 'lodash';
import { v4 } from 'uuid';
import { randomDelay } from '../helper/general';
import { PersonData, PersonDataResponse } from './type';

interface GetPersonListParams {
  limit: number;
  offset: number;
}

export async function getPersons(params: GetPersonListParams): Promise<PersonDataResponse> {
  await randomDelay({ minTimeRange: 1, maxTimeRange: 3 });
  const result: PersonData[] = [];
  const total = 100;
  faker.locale = 'id_ID';
  const probabilityArray = [1, 2, 3, 4, 5];
  for (let i = 0; i < params.limit; i++) {
    const probMissPhone = sample(probabilityArray) === 2;
    const probMissEmail = sample(probabilityArray) === 3;
    const probGender = (sample(probabilityArray) as number) % 2 === 0;
    result.push({
      id: `${total}-${params.offset}-${i}`,
      name: faker.name.firstName(),
      address: faker.address.streetAddress(),
      age: faker.datatype.number({ min: 10, max: 50 }),
      job: faker.name.jobTitle(),
      phoneNumber: probMissPhone ? '' : faker.phone.phoneNumber(),
      email: probMissEmail ? '' : faker.internet.email(),
      gender: probGender ? 'l' : 'p',
    });
  }
  return {
    limit: params.limit,
    offset: params.offset,
    data: result,
    total,
  };
}
