/**
 * Represents a person.
 */
export interface Person {
  /**
   * The first name of the person.
   */
  firstName: string;

  /**
   * The last name of the person.
   */
  lastName: string;

  /**
   * The age of the person.
   */
  age: number;

  /**
   * The relationship status of the person.
   * It can be one of the following values: 'relationship', 'complicated', or
   * 'single'.
   */
  status: 'relationship' | 'complicated' | 'single';
}
