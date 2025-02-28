import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import teamService from "../services/teamService";

const initialState = {
  teams: [],
  team: null,
  loading: false,
  error: null,
};

// ✅ Fetch all teams (No JWT required)
export const fetchTeams = createAsyncThunk("teams/fetchAll", async (_, thunkAPI) => {
  try {
    return await teamService.getTeams();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Error fetching teams");
  }
});

// ✅ Fetch a single team by ID (No JWT required)
export const fetchTeamById = createAsyncThunk("teams/fetchById", async (teamId, thunkAPI) => {
  try {
    return await teamService.getTeamById(teamId);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Error fetching team details");
  }
});

// ✅ Create a new team (Requires JWT)
export const createTeam = createAsyncThunk("teams/create", async ({ teamData, token }, thunkAPI) => {
  try {
    return await teamService.createTeam(teamData, token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Error creating team");
  }
});

// ✅ Update a team (Requires JWT)
export const updateTeam = createAsyncThunk("teams/update", async ({ teamId, teamData, token }, thunkAPI) => {
  try {
    return await teamService.updateTeam(teamId, teamData, token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Error updating team");
  }
});

// ✅ Delete a team (Requires JWT)
export const deleteTeam = createAsyncThunk("teams/delete", async ({ teamId, token }, thunkAPI) => {
  try {
    await teamService.deleteTeam(teamId, token);
    return teamId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Error deleting team");
  }
});

// ✅ Add bonus points to a team in a specific sport (Requires JWT)
export const addTeamBonus = createAsyncThunk(
  "teams/addBonus",
  async ({ teamId, sportId, bonus, token }, thunkAPI) => {
    try {
      return await teamService.addTeamBonus(teamId, sportId, bonus, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error adding bonus points");
    }
  }
);

const teamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Fetch Teams
      .addCase(fetchTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = action.payload;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Fetch Team by ID
      .addCase(fetchTeamById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamById.fulfilled, (state, action) => {
        state.loading = false;
        state.team = action.payload;
      })
      .addCase(fetchTeamById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Create Team (With Loading & Error Handling)
      .addCase(createTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.teams.push(action.payload);
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Update Team
      .addCase(updateTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTeam.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.teams.findIndex((team) => team.id === action.payload.id);
        if (index !== -1) state.teams[index] = action.payload;
      })
      .addCase(updateTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Delete Team
      .addCase(deleteTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = state.teams.filter((team) => team.id !== action.payload);
      })
      .addCase(deleteTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Add Bonus Points
      .addCase(addTeamBonus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTeamBonus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.teams.findIndex((team) => team.id === action.payload.teamId);
        if (index !== -1) state.teams[index].bonus = action.payload.bonus;
      })
      .addCase(addTeamBonus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default teamSlice.reducer;
