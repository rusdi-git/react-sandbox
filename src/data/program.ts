import faker from '@faker-js/faker';
import { randomDelay } from '../helper/general';

export async function getProgramName(length: number) {
  await randomDelay({ minTimeRange: 0.25, maxTimeRange: 1.5 });
  const result: { label: string; value: string }[] = [];
  for (let i = 0; i < length; i++) {
    const product = faker.commerce.product();
    result.push({ value: product, label: product });
  }
  return result;
}
