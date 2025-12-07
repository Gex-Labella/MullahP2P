import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ChartState {
  activeIndex: number;
  data: { name: string; value: number }[];
}

const initialState: ChartState = {
  activeIndex: 0, // ✅ safe default
  data: [],       // ✅ safe default
};

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    setActiveIndex(state, action: PayloadAction<number>) {
      state.activeIndex = action.payload;
    },
    setChartData(state, action: PayloadAction<{ name: string; value: number }[]>) {
      state.data = action.payload;
    },
  },
});

export const { setActiveIndex, setChartData } = chartSlice.actions;
export default chartSlice.reducer;