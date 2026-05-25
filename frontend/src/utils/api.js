import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:4000/api/v1",
    withCredentials: true
})

export default api;

// fetch("http://localhost:4000/api/v1/auth/regiter",{
// credentials : true
// })

// api.post(//api/v1/auth/regiter,{data:})