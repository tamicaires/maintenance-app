import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IMembership } from '@/shared/types/membership';
import { MembershipService } from '@/shared/services/membership';

interface MembershipState {
  currentMembership: IMembership | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MembershipState = {
  currentMembership: null,
  status: 'idle',
  error: null,
};

export const fetchCurrentMembership = createAsyncThunk(
  'membership/fetchCurrent',
  async (_, { rejectWithValue }) => {
    try {
      const response = await MembershipService.getCurrentMembership();
      if (response.success) {
        return response.data;
      } else {
        return rejectWithValue(response.error);
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const membershipSlice = createSlice({
  name: 'membership',
  initialState,
  reducers: {
    resetMembership: (state) => {
      state.currentMembership = null;
    },
    setCurrentMembership: (state, action) => {
      state.currentMembership = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentMembership.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCurrentMembership.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentMembership = action.payload ?? null;
      })
      .addCase(fetchCurrentMembership.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { resetMembership, setCurrentMembership } = membershipSlice.actions;
export const membershipReducer = membershipSlice.reducer;
