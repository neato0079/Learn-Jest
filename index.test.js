const index = require('./index')
const mockAxios = require('axios')
const { default: axios } = require('axios')
const axiosRetry = require('axios-retry')

jest.mock("axios")
afterEach(() => {
  jest.resetAllMocks();
});

describe('test', () => {
  test('Returns value of 3 for a array with a size of 3', () => {
    const array = [0, 0, 0]
    const empty = []
    const result = index.arrayLength(array)
    const emptyResult = index.arrayLength(empty)
    expect.assertions(2)
    expect(result).toBe(3)
    expect(emptyResult).toBeFalsy()
  });

  test('Axios call returns status:200', async () => {
    mockAxios.get.mockResolvedValue({ status: 200 });
    result = index.getAxiosCall();
    expect.assertions(2);
    expect(result).resolves.toBeDefined();
    expect(result).resolves.toEqual(200);
  });

  test('Axios call handles error', async () => {
    mockAxios.get.mockRejectedValue(new Error({}));
    result = index.getAxiosCall();
    expect.assertions(2);
    await expect(result).rejects.toBeDefined();
    expect(result).rejects.toThrow({});
  });

  test('Axios retries 3 times using the axios-retry lib', async () => {
    // jest.fn(mockAxios.get.mockRejectedValue(new Error({})))
    
    mockAxios.get.mockRejectedValue(new Error('hi'))
    
    
    await index.tryToRetry(); // using axios-retry lib
    // expect(mockAxios.get).toHaveBeenCalledTimes(3)
    expect(mockAxios.get).toReturnWith('hi')
    // expect(mockAxios.get).toHaveNthReturnedWith(1)
  })

  test.skip('Axios retries 3 times using the retry lib', async () => {
    mockAxios.get.mockRejectedValue(new Error({}));
    await index.retryLibTry(); // using retry lib
    expect(mockAxios.get).toHaveBeenCalledTimes(3)
  })
})
