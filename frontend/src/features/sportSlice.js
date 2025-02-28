import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sportService from "../services/sportService";

const initialState = {
  sports: [],
  sport: null,
  loading: false,
  error: null,
};

// ✅ Fetch all sports
export const fetchSports = createAsyncThunk(
  "sports/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await sportService.getSports();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error fetching sports"
      );
    }
  }
);

// ✅ Fetch a single sport by ID
export const fetchSportById = createAsyncThunk(
  "sports/fetchById",
  async (sportId, thunkAPI) => {
    try {
      return await sportService.getSportById(sportId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error fetching sport details"
      );
    }
  }
);

// ✅ Create a new sport
export const createSport = createAsyncThunk(
  "sports/create",
  async ({ sportData, token }, thunkAPI) => {
    try {
      return await sportService.createSport(sportData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error creating sport"
      );
    }
  }
);

// ✅ Update a sport
export const updateSport = createAsyncThunk(
  "sports/update",
  async ({ sportId, sportData, token }, thunkAPI) => {
    try {
      return await sportService.updateSport(sportId, sportData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error updating sport"
      );
    }
  }
);

// ✅ Delete a sport
export const deleteSport = createAsyncThunk(
  "sports/delete",
  async ({ sportId, token }, thunkAPI) => {
    try {
      await sportService.deleteSport(sportId, token);
      return sportId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error deleting sport"
      );
    }
  }
);

const sportSlice = createSlice({
  name: "sports",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Fetch Sports
      .addCase(fetchSports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSports.fulfilled, (state, action) => {
        state.loading = false;
        state.sports = action.payload;
      })
      .addCase(fetchSports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Fetch Sport by ID
      .addCase(fetchSportById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSportById.fulfilled, (state, action) => {
        state.loading = false;
        state.sport = action.payload;
      })
      .addCase(fetchSportById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Create Sport
      .addCase(createSport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSport.fulfilled, (state, action) => {
        state.loading = false;
        state.sports.push(action.payload);
      })
      .addCase(createSport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Update Sport
      .addCase(updateSport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSport.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.sports.findIndex(
          (sport) => sport.id === action.payload.id
        );
        if (index !== -1) state.sports[index] = action.payload;
      })
      .addCase(updateSport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Delete Sport
      .addCase(deleteSport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSport.fulfilled, (state, action) => {
        state.loading = false;
        state.sports = state.sports.filter(
          (sport) => sport.id !== action.payload
        );
      })
      .addCase(deleteSport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default sportSlice.reducer;
