import axios from "axios";

// export class AxiosService {
//     static $api() {
//         const instance = axios.create({
//             withCredentials: true,
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             }
//         })
//         return instance;
//     }
// }

export const $api = () => {
    const instance = axios.create({
        withCredentials: true,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    return instance;
}

export default $api();