/*
const token =
    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdXN0U25vIjo2MywiY3VzdE5tIjoi6rmA7ZWY64KYIiwiZXhBY2Nlc3NDcmVhdGVEYXRlIjoxNjM4ODczNTAwOTE3LCJpc0FjY2Vzc1Rva2VuIjoiWSIsImV4cCI6MTY0MTQ2NTUwMH0._uN3tuCA1uwHcaKsTI_a33STDYdKowA_UQ0WpqjVuQw';
*/

function setInterceptors(instance) {
  instance.interceptors.request.use(
    (config) => {
      // config.headers.Authorization = token;
      return config;
    },
    (error) => {
      return Promise.reject(error.response);
    }
  );
  instance.interceptors.response.use(
    (config) => {
      return config.data;
    },
    (error) => {
      return Promise.reject(error.response);
    }
  );
  return instance;
}

export { setInterceptors };
