import { createSlice } from "@reduxjs/toolkit";
import { Post } from "@/interface/interface";

const initialState: { posts: Post[] } = {
  posts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPostsRedux: (state, { payload }) => {
      state.posts = [...state.posts, ...payload];
    },
    addPostRedux: (state, {payload}) => {
        state.posts= [payload, ...state.posts]

    },
    updatePostRedux: (state,{payload}) => {
     const index= state.posts.findIndex(post=> post.id  === payload.id)
     if(index !== -1) {
      state.posts[index] = payload
     }
    }
  },
});


export default  postSlice.reducer
export const {addPostRedux, getPostsRedux, updatePostRedux} = postSlice.actions