 const { getUserIds, getData, setData, clearData } = require('../storage.js');


beforeEach(() => {
  localStorage.clear();
});

describe('Bookmark Storage Functions', () => {
  test('setData and getData store and retrieve data correctly', () => {
    const userId = '1';
    const bookmarks = [{ title: 'Example', url: 'http://example.com', description: 'A site', createdAt: new Date().toISOString() }];
    setData(userId, bookmarks);

    const result = getData(userId);
    expect(result).toEqual(bookmarks);
  });

  test('getUserIds returns all user IDs in localStorage', () => {
    setData('1', []);
    setData('2', []);
    expect(getUserIds().sort()).toEqual(['1', '2']);
  });

  test('clearData removes data for a specific user', () => {
    setData('1', [{ title: 'To delete' }]);
    clearData('1');
    expect(getData('1')).toEqual([]);
  });

  test('getData returns empty array for unknown user', () => {
    expect(getData('nonexistent')).toEqual([]);
  });
});