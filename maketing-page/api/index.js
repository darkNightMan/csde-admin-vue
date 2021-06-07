let baseURL = ''
if (process.env.VUE_ENV === 'server') {
  baseURL = 'http://127.0.0.1:10086/'
} else {
  baseURL = '/'
}
export default baseURL