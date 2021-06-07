
let  baseURL = ''
if (process.env.NODE_ENV === 'development') {
  baseURL = '/'
} else {
  baseURL = 'http://127.0.0.1:10086/'
}
console.log(baseURL, 'baseURLbaseURLbaseURLbaseURLbaseURLbaseURLbaseURLbaseURLbaseURLbaseURLbaseURLbaseURL')

export default baseURL