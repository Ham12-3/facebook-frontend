import { API } from "./axios";

export const createPost = async(post: FormData) => {
    const {data} = await API.post("posts/", post, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
        }
    })
    return data;
}


export const getPosts = async (page:number, page_size:number) =>  {
const {data} = await API.get(`posts/?page=${page}&page_size=${page_size}`, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
    }
})
return data
}