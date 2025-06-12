import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Label{
  id: string;
  text: string;
  textColor: string;
  backgroundColor: string;
  fontSize: number;
  isBold: boolean;
  isItalic: boolean;
}

export interface LabelsState{
  labels: Label[];
  filterColor: string | null;
}

const initialState: LabelsState = {
  labels: [],
  filterColor: null,
};

export const labelSlice = createSlice({
  name: 'labels',
  initialState,
  reducers: {
      addLabel: (state, action: PayloadAction<Label>) => {
        state.labels.push(action.payload);
      },

      removeLabel: (state, action: PayloadAction<string>) => {
        state.labels = state.labels.filter(label => label.id  !== action.payload);
      },

      updateLabel: (state, action: PayloadAction<Label>) => {
          state.labels = state.labels.map(label =>
              label.id === action.payload.id ? action.payload : label
          );
      },

      setFilterColor: (state, action: PayloadAction<string | null>) => {
        state.filterColor = action.payload;
      },
  },
});

export const {addLabel, updateLabel, removeLabel, setFilterColor} = labelSlice.actions;

export default labelSlice.reducer;