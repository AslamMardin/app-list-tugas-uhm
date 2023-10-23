import axios from "axios"
const Api = axios.create({
    baseURL: "https://tugas-uhm-default-rtdb.asia-southeast1.firebasedatabase.app/"
})


export default Api;