import axios from 'axios'

const instance = axios.create({
    baseURL : 'https://route-burger-f38c4.firebaseio.com/'
})

export default instance