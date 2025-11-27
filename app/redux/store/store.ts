import { configureStore } from "@reduxjs/toolkit";
import leadershipReducer from "../features/leadershipSlice";
import authReducer from "../features/authSlice";
import partnerReducer from "../features/partnerSlice";
export const store = configureStore({
  reducer: {
    leader: leadershipReducer,
    auth: authReducer,
    partner: partnerReducer,
  },
});
// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
