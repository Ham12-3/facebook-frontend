import { API } from "./axios";

export const createPost = async(post: FormData) => {
    const {data} = await API.post("posts/", post, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
        }
    })
    return data;
}
