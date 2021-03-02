import React from 'react';
import './App.css';
import DashBoard from './features/covid/DashBoard/DashBoard';
// import Cards from './features/covid/Cards/Cards';
// import Chart from './features/covid/Cart/Chart';
// import PieChart from './features/covid/PieChart/PieChart';
// import SwitchCountry from './features/covid/SwitchCountry/SwitchCountry';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Recursive',
      'sans-serif'
    ].join(','),
  }
});

function App() {
  
  return (
    // <div className="App">
    //   <header className="App-header">
    //      <Cards />
    //      <Chart />
    //      <PieChart />
    //      <SwitchCountry />
    //   </header>
    // </div>
    <ThemeProvider theme={theme}>
    <DashBoard />
    </ThemeProvider>
  );
}

export default App;
