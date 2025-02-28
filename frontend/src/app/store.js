import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import teamReducer from "../features/teamSlice";
import sportReducer from "../features/sportSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    team: teamReducer,
    sports: sportReducer,
  },
});
