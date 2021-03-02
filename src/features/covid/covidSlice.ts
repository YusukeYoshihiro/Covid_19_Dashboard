import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import dataJson from "./data.json";
import dataJsonDaily from "./dataDaily.json";

const apiUrl = "https://covid19.mathdro.id/api";

// Generics
type APIDATA = typeof dataJson;
type APIDATADAILY = typeof dataJsonDaily;
type covidState = {
  data: APIDATA;
  country: string;
  dailyData: APIDATADAILY;
};

// initialState
const initialState: covidState = {
  data: {
    confirmed: {
      value: 113950840,
      detail: "https://covid19.mathdro.id/api/confirmed",
    },
    recovered: {
      value: 64350371,
      detail: "https://covid19.mathdro.id/api/recovered",
    },
    deaths: {
      value: 2528117,
      detail: "https://covid19.mathdro.id/api/deaths",
    },
    dailySummary: "https://covid19.mathdro.id/api/daily",
    dailyTimeSeries: {
      pattern: "https://covid19.mathdro.id/api/daily/[dateString]",
      example: "https://covid19.mathdro.id/api/daily/2-14-2020",
    },
    image: "https://covid19.mathdro.id/api/og",
    source: "https://github.com/mathdroid/covid19",
    countries: "https://covid19.mathdro.id/api/countries",
    countryDetail: {
      pattern: "https://covid19.mathdro.id/api/countries/[country]",
      example: "https://covid19.mathdro.id/api/countries/USA",
    },
    lastUpdate: "2021-02-28T17:23:28.000Z",
  },
  country: "",
  dailyData: [
    {
      totalConfirmed: 557,
      mainlandChina: 548,
      otherLocations: 9,
      deltaConfirmed: 0,
      totalRecovered: 0,
      confirmed: {
        total: 557,
        china: 548,
        outsideChina: 9,
      },
      deltaConfirmedDetail: {
        total: 0,
        china: 0,
        outsideChina: 0,
      },
      deaths: {
        total: 17,
        china: 17,
        outsideChina: 0,
      },
      recovered: {
        total: 0,
        china: 0,
        outsideChina: 0,
      },
      active: 0,
      deltaRecovered: 0,
      incidentRate: 0.4510818002025252,
      peopleTested: 0,
      reportDate: "2020-01-22",
    },
  ],
};

//  *****    Action Part by using "createAsyncThunk" to execute API .   *****//
// In this case, we can set type by creating Generics before , then  we can adapt the generic <APIDATA> into {data} at axios part. Then, return value of data type as a "json data";
export const fetchAsyncGet = createAsyncThunk("covid/get", async () => {
  const { data } = await axios.get<APIDATA>(apiUrl);
  return data;
});

export const fetchAsyncGetDaily = createAsyncThunk(
  "covid/getDaily",
  async () => {
    const { data } = await axios.get<APIDATADAILY>(`${apiUrl}/daily`);
    return data;
  }
);

export const fetchAsyncGetCountry = createAsyncThunk(
  "covid/getCountry",
  async (country: string) => {
    let dynamicUrl = apiUrl;
    if (country) {
      dynamicUrl = `${apiUrl}/countries/${country}`;
    }
    const { data } = await axios.get<APIDATA>(dynamicUrl);
    return { data: data, country: country };
  }
);

// createSlice (createStore)
// * extraReducers: https://redux-toolkit.js.org/api/createSlice#extrareducers
// * fulfilled: https://redux-toolkit.js.org/api/createAsyncThunk#type
const covidSlice = createSlice({
  name: "covid",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGet.fulfilled, (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    });
    builder.addCase(fetchAsyncGetDaily.fulfilled, (state, action) => {
      return {
        ...state,
        dailyData: action.payload,
      };
    });
    builder.addCase(fetchAsyncGetCountry.fulfilled, (state, action) => {
      return {
        ...state,
        data: action.payload.data,
        country: action.payload.country,
      };
    });
  },
});

// it can refer current state data from store.  
export const selectData =(state: RootState) => state.covid.data;
export const selectDailyData =(state: RootState) => state.covid.dailyData;
export const selectCountry =(state: RootState) => state.covid.country;

export default covidSlice.reducer;

