import axios from 'axios';

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3030/api',
});

const errHandler = err => {
  console.error(err.response.data);
  throw err.response.data;
};

export default {
  service: service,
  
  getNotes() {
    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjVhYWY2YWI2NDljNjJlMzZlMDA2OTlmZCJ9.t2HEXtInBmlX675Bezx6rjRGs7Lm_m-94JJDKOGtCis';
    return service
    .get('notes')
    .then(res => res.data)
    .catch(errHandler);
  },
  getOpps() {
    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjVhYWY2YWI2NDljNjJlMzZlMDA2OTlmZCJ9.t2HEXtInBmlX675Bezx6rjRGs7Lm_m-94JJDKOGtCis';
    return service
    .get('opportunities/')
    .then(res => res.data)
    .catch(errHandler);
  },
  getAccounts() {
    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjVhYWY2YWI2NDljNjJlMzZlMDA2OTlmZCJ9.t2HEXtInBmlX675Bezx6rjRGs7Lm_m-94JJDKOGtCis';
    return service
    .get('users/5aaf69afe063242f68277ee3/accounts')
    .then(res => res.data)
    .catch(errHandler);
  },
  createNote() {
    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjVhYWY2YWI2NDljNjJlMzZlMDA2OTlmZCJ9.t2HEXtInBmlX675Bezx6rjRGs7Lm_m-94JJDKOGtCis';
    return service
    .post('notes/5aaf69afe063242f68277ee6/addNote')
    .then(res => res.data)
    .catch(errHandler)
  },
  updateNote(id,data) {
    console.log("update asked")
    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjVhYWY2YWI2NDljNjJlMzZlMDA2OTlmZCJ9.t2HEXtInBmlX675Bezx6rjRGs7Lm_m-94JJDKOGtCis';
    return service
    .put('notes/'+id,data)
    .then(res => res.data)
    // console.log(res)
    .catch(errHandler)
  },
  signup(userInfo) {
    return service
      .post('/signup', userInfo)
      .then(res => res.data)
      .catch(errHandler);
  },

  login(email, password) {
    return service
      .post('/login', {
        email,
        password,
      })
      .then(res => {
        console.log("DEBUG res", res)
        const { data } = res;
        localStorage.setItem('user', JSON.stringify(data));
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
        return data;
      })
      .catch(errHandler);
  },
  
  
  // getSecret() {
  //   return service
  //     .get('/secret')
  //     .then(res => res.data)
  //     .catch(errHandler);
  // },
  
  logout() {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('user');
  },
  
  loadUser() {
    console.log("loadUser");
    
    const userData = localStorage.getItem('user');
    if (!userData) return false;
    const user = JSON.parse(userData);
    if (user.token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
      return user;
    }
    return false;
  },
};
