import link from './Link';

test("pub sub sender", () => {
  const mock = jest.fn();

  link.subscribe('sort', mock );
  link.publish('sort', { });
  expect(mock).toBeCalledWith(expect.anything());
});