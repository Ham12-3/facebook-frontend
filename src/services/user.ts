import { API } from "./axios";

export const userSearch= async(user:string) => {
const {data}= await API.get(`users-search/?search=${user}`, {
    headers: {
        Authorizaation: `Bearer ${localStorage.getItem('access')}`
    }
})
return data;
}