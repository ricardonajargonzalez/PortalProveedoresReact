import axios from "axios";

// let token = localStorage.getItem('token');

export const backEndApi = axios.create({
    headers: {
        'Authorization': import.meta.env.VITE_API_KEY_DEX
      },
    baseURL: import.meta.env.VITE_URL + import.meta.env.VITE_URL_API, //URL_API
});


// export const backEndApiToken = axios.create({
//     baseURL: 'https://ricardonajar.com/ApiProveedores/v1',
//    // withCredentials: true,
//     headers: {'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'  }
// });

// export const backEndApi = axios.create({
//     baseURL: 'http://localhost/ApiProveedores/v1'
// });




