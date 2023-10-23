import  {configureStore} from '@reduxjs/toolkit'

import authReducer from '@/redux/reducers/auth.slice'
import userReducer from '@/redux/reducers/user.slice'
import postReducer from '@/redux/reducers/post.slice'
import hasMoreReducer from '@/redux/reducers/hasMore'
const store = configureStore({
    reducer : {
        auth: authReducer,
        user: userReducer,
        post: postReducer,
        hasMore: hasMoreReducer,

    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch


export default store
