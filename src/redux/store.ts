import { configureStore } from '@reduxjs/toolkit'
import auth from './slices/auth'
// import user from './slices/user'
// import bank from './slices/bank'
// import dashboard from './slices/dashboard'

export const store = configureStore({
  reducer: {
    auth,
    // user,
    // bank,
    // dashboard
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch