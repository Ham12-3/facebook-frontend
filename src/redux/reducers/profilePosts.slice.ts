import { Post } from "@/interface/interface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: { posts: Post[] } = {
  posts: [],
};

const profilePostsSlice = createSlice({
  name: "profilePosts",
  initialState,
  reducers: {
    getProfilePosts: (state, { payload }) => {
      state.posts = [...payload];
    },
    addProfilePost: (state, { payload }) => {
      state.posts = [payload, ...state.posts];
    },
    updateProfilePost: (state, { payload }) => {
      const index = state.posts.findIndex((post) => post.id === payload.id);

      if (index !== -1) {
        state.posts[index] = payload;
      }
    },
    deleteProfilePost: (state, { payload }) => {
      state.posts = state.posts.filter((post) => post.id !== payload);
    },
  },
});

export default profilePostsSlice.reducer;
export const {
  addProfilePost,
  getProfilePosts,
  updateProfilePost,
  deleteProfilePost,
} = profilePostsSlice.actions;
