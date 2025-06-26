
import { getUserIds, getData, setData, clearData } from './storage.js';

describe('storage.js', () => {
  beforeEach(() => localStorage.clear());

  test('setData + getData round-trip storage key and content', () => {
    const user = 'test-user';
    const bookmarks = [
      { url: 'https://a.com', title: 'A', description: 'Alpha', createdAt: '2025-01-01T00:00:00Z' }
    ];

    setData(user, bookmarks);
    const rawValue = localStorage.getItem(`stored-data-user-${user}`);
    expect(JSON.parse(rawValue)).toEqual(bookmarks);
    expect(getData(user)).toEqual(bookmarks);
  });

  test('clearData removes stored bookmarks correctly', () => {
    const user = 'test2';
    setData(user, [{ foo: 'bar' }]);
    expect(getData(user)).not.toEqual([]);

    clearData(user);

    
    expect(getData(user)).toBeNull();
    expect(localStorage.getItem(`stored-data-user-${user}`)).toBe(null);
  });
});

