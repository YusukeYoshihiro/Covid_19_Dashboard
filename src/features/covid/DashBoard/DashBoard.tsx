import React, {useEffect} from 'react';
import styles from './DashBoard.module.css';
import { makeStyles } from '@material-ui/core/styles';
import { 
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
 } from '@material-ui/core';

 import { useSelector, useDispatch } from 'react-redux';
 import { fetchAsyncGet, fetchAsyncGetDaily, selectData } from '../covidSlice';
import SwitchCountry from '../SwitchCountry/SwitchCountry';
import Chart from '../Cart/Chart';
import PieChart from '../PieChart/PieChart';
import Cards from '../Cards/Cards';
 
 const useStyles = makeStyles((theme) => ({
  // "flexGrow" shows expanding of ratio, 
  // In this case, flexGrow:1 means occupy for whole areas.
   barColor: {backgroundColor:'rgb(47, 126, 109)'},
   title:{
     flexGrow:1,
   },
   content: {
     marginTop:85,
   },
 }));
 
const DashBoard:React.FC = () => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const data = useSelector(selectData)

   useEffect(() => {
     dispatch(fetchAsyncGet());
     dispatch(fetchAsyncGetDaily());
   }, [dispatch])
  return (
    <div>
      <AppBar position="absolute" color="secondary">
        <Toolbar className={classes.barColor}>
          <Typography variant="h6" className={classes.title} >
          <i className="fas fa-virus"></i>&nbsp;
            COVID-19 Live Dashboard from API - Covid-19 Mathdro.id 
          </Typography>
             {data && (
               <Typography variant="body1">
                 {new Date(data.lastUpdate).toDateString()}
               </Typography>
             )}
        </Toolbar>
      </AppBar>

      <Container className={classes.content}>
         <div className={styles.container}>
           <SwitchCountry />
         </div>
         <Grid container spacing={3}>
           <Grid item xs={12} md={7}>
             <Chart />
           </Grid>

           <Grid item xs={12} md={5}>
             <PieChart />
           </Grid>

           <Grid item xs={12} md={12}>
             <Cards />
           </Grid>
         </Grid>
      </Container>
    </div>
  )
}

export default DashBoard
