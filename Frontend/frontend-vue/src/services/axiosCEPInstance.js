import axios from "axios";

const axiosCEPInstance = axios.create({
    baseURL: "https://viacep.com.br/ws/",
    timeout: 5000,
})

export default axiosCEPInstance;