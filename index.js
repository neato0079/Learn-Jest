const axios = require('axios')
const axiosRetry = require('axios-retry')

const url200 = 'http://webcode.me'
const url401 = 'https://httpstat.us/401'


axiosRetry(axios, {
  retries: 3, // number of retries
  retryDelay: (retryCount) => {
    console.log(`retry attempt: ${retryCount}`);
    return retryCount * 2000; // time interval between retries
  },
  // retryCondition: (error) => {
  //     // if retry condition is not specified, by default idempotent requests are retried
  //     return error.response.status === 503;
  // },
});

const arrayLength = (array) => array.length;
const getAxiosCall = async (url) => {
  // try{
  const result = await axios.get(url).then(() => console.log('trying...')).catch((err) => {
    if (err.response.status !== 200) {
      throw new Error(`API call failed with status code: ${err.response.status} after 3 retry attempts`);
    }
    // console.log(result.status)
    // return result.status;

    // } catch(e) {
    //   // console.log(e)
    //   // throw e;
    //   return e
    // }
  })
}

// async function makeHTTPCall() {
//   const response = await axios({
//     method: 'GET',
//     url: 'https://httpstat.us/401',
//   }).catch((err) => {
//     console.log(err.code)
//     throw new Error

//   });
// }

const fuckit = async () => {
  try {
    const response = await axios.get('https://httpstat.us/501');
    return response
  } catch(e) {
    throw e
  }
}

fuckit()
// makeHTTPCall();
// getAxiosCall(url401)

module.exports = {
  arrayLength,
  getAxiosCall
}