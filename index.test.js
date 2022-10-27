const index = require('./index')
const mockAxios = require('axios')
const { default: axios } = require('axios')
jest.mock("axios")
afterEach(() => {
  jest.resetAllMocks();
});

describe('test', () => {
  test('Returns value of 3 for a array with a size of 3', () => {
    const array = [0,0,0]
    const empty = []
    const result = index.arrayLength(array)
    const emptyResult = index.arrayLength(empty)
    expect.assertions(2)
    expect(result).toBe(3)
    expect(emptyResult).toBeFalsy()
  })

  test('Axios call returns status:200', async() => {
    mockAxios.get.mockResolvedValue({status: 200})
    result = index.getAxiosCall()
    expect.assertions(2)
    expect(result).resolves.toBeDefined()
    expect(result).resolves.toEqual(200)
  })

  test('Axios call handles error', async() => {
    // const url200 = 'http://webcode.me'
    // const url500 = 'https://no-such-server.blabla'
    mockAxios.get.mockRejectedValue(new Error('poop'));
    result = index.getAxiosCall()
    expect.assertions(2)
    await expect(result).rejects.toBeDefined()
    expect(result).rejects.toThrow('poop')
  })
})
