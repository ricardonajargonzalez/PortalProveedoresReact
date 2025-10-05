import axios from "axios";

// let token = localStorage.getItem('token');

export const backEndApiMA = axios.create({
    baseURL: import.meta.env.VITE_URL_API_MA, //URL_API MAS ADMIN
});


// export const backEndApiToken = axios.create({
//     baseURL: 'https://ricardonajar.com/ApiProveedores/v1',
//    // withCredentials: true,
//     headers: {'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'  }
// });

// export const backEndApi = axios.create({
//     baseURL: 'http://localhost/ApiProveedores/v1'
// });




