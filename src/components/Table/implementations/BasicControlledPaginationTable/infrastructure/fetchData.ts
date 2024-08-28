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

const newPerson = (): Person => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  age: faker.number.int(40),
  status: faker.helpers.shuffle<Person['status']>([
    'relationship',
    'complicated',
    'single',
  ])[0]!,
});

export function makeData(...lens: number[]): Person[] {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!;
    return range(len).map(
      (d): Person => ({
        ...newPerson(),
      }),
    );
  };

  return makeDataLevel();
}

const data = makeData(30);

export async function fetchData(options: {
  pageIndex: number;
  pageSize: number;
}): Promise<{
  rows: Person[];
  pageCount: number;
}> {
  // Simulate some network latency
  // eslint-disable-next-line promise/param-names
  await new Promise((r) => setTimeout(r, 500));

  return {
    rows: data.slice(
      options.pageIndex * options.pageSize,
      (options.pageIndex + 1) * options.pageSize,
    ),
    pageCount: Math.ceil(data.length / options.pageSize),
  };
}
