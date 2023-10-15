import  {configureStore} from '@reduxjs/toolkit'

import authReducer from '@/redux/reducers/auth.slice'
import userReducer from '@/redux/reducers/user.slice'
const store = configureStore({
    reducer : {
        auth: authReducer,
        user: userReducer,

    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch


export default store
