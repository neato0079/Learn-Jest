const axios = require('axios')

const url200 = 'http://webcode.me'
const url500 = 'https://no-such-server.blabla'

const arrayLength = (array) => array.length;
const getAxiosCall = async(url) => {
  // try{
    const result = await axios.get(url)
    // console.log(result.status)
    return result.status;

  // } catch(e) {
  //   // console.log(e)
  //   // throw e;
  //   return e
  // }
}

// getAxiosCall(url500)

module.exports = { 
  arrayLength,
  getAxiosCall 
}