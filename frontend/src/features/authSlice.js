import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

// ✅ Register User
 const register = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
  try {
    return await authService.register(userData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.detail || "Registration failed");
  }
});

// ✅ Login User (Now stores role)
 const login = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
  try {
    const response = await authService.login(credentials);
    return response; // ✅ Ensure full response is returned (token + role)
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.detail || "Login failed");
  }
});

// ✅ Logout User
 const logout = createAsyncThunk("auth/logout", async () => {});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          token: action.payload.access_token, // ✅ Store JWT token
          role: action.payload.role, // ✅ Store user role
        };
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
export { login, logout, register };
