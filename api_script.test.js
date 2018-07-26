test('the data is string', async () => {
  let data = await fetchData();
  expect(data).toBe('');
})
