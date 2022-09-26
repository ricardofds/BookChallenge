import { dateFormat } from './date.utils';

test('Date with value null', () => {
  //@ts-ignore
  expect(dateFormat()).toBe('');
});
