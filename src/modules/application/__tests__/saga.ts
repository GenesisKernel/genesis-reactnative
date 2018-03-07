import { applicationWatcher } from '../saga';

describe('applicationWatcher', () => {
  it('qwe', () => {
    const iterator = applicationWatcher();

    expect(iterator.next().value).toEqual({});
  })
})