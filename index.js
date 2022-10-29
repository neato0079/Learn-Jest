const axios = require('axios')
const axiosRetry = require('axios-retry')
const retry = require('retry')

const url200 = 'https://httpstat.us/200'
const url401 = 'https://httpstat.us/401'



const arrayLength = (array) => array.length;
const getAxiosCall = async (url) => {
  axiosRetry(axios, {
    retries: 2, // number of retries
    retryDelay: (retryCount) => {
      console.log(`retry attempt: ${retryCount}`);
      return retryCount * 1000; // time interval between retries
    },
    // retryCondition: (error) => {
    //     // if retry condition is not specified, by default idempotent requests are retried
    //     return error.response.status === 503;
    // },
  });
  // try{
  const result = await axios.get(url).catch((err) => {
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

// const tryToRetry = async () => {
//   try {
//     const response = await axios.get('https://httpstat.us/503').catch((e) => {console.log('in .catch block')})
//     console.log('In try block')
//     return response
//   } catch (e) {
//     console.log('In catch block')
//     throw await e
//   }
// }
// try/catch blocks arent working. try without

const tryToRetry = async () => {
  axiosRetry(axios, {
    retries: 2, // number of retries
    retryDelay: (retryCount) => {
      console.log(`retry attempt: ${retryCount}`);
      return retryCount * 1000; // time interval between retries
    },
    // retryCondition: (error) => {
    //     // if retry condition is not specified, by default idempotent requests are retried
    //     return error.response.status === 503;
    // },
  });
  const response = await axios.get('https://httpstat.us/401').catch((e) => { console.log(`in catch block\n${e}`) })
  console.log(response)
  return response
}


// retry lib
const retryLibTry = async () => {
  const operation = retry.operation({
    retries: 1,
    factor: 3,
    minTimeout: 1 * 1000,
    maxTimeout: 60 * 1000,
    randomize: true,
  });

  operation.attempt(async (currentAttempt) => {
    console.log('sending request: ', currentAttempt, ' attempt');
    try {

      const response = await axios.get(url401);
      console.log('RESOLVE')
      return 'nice'

    } catch (e) {
      if (!operation.retry(e)) {
        console.log(e.code)
        return 'FAILURE LOL';
      }
    }
  });

}

// retryLibTry()
tryToRetry()
// makeHTTPCall();
// getAxiosCall(url401)

module.exports = {
  arrayLength,
  getAxiosCall,
  tryToRetry,
  retryLibTry
}