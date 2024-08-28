import { faker } from '@faker-js/faker';

export interface Person {
  firstName: string;
  lastName: string;
  age: number;
  status: 'relationship' | 'complicated' | 'single';
}

const range = (len: number): number[] => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

// @ts-expect-error: Type 'Person' is not assignable to type 'T'.
const newPerson = <T>(): T => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  age: faker.number.int(40),
  status: faker.helpers.shuffle<Person['status']>([
    'relationship',
    'complicated',
    'single',
  ])[0],
});

export function makeData<T>(...lens: number[]): T[] {
  const makeDataLevel = (depth = 0): T[] => {
    const len = lens[depth]!;

    return range(len).map(
      (d): T => ({
        ...newPerson<T>(),
      }),
    );
  };

  return makeDataLevel();
}
