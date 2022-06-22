import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Forecast from '../components/Forecast/Forecast';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [matchedAddress, setMatchedAddress] = useState('');
  const [forecast, setForecast] = useState([]);
  const [isDirty, setIsDirty] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleOnChange = (e: any) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (): void => {
    setIsError(false);
    setMatchedAddress('');
    setForecast([]);

    fetch(`/api/geocode/${searchValue}`)
      .then((response) => response.json())
      .then(({ addressMatches }) => {
        if (!addressMatches.length) {
          setIsError(true);
          setErrorMessage(
            'No results found for this location. Make sure the address is correct or add more information such as State, City, and/or Zip code.'
          );
        } else {
          setMatchedAddress(addressMatches[0].matchedAddress);

          fetch(
            `/api/weather/${addressMatches[0].coordinates.y},${addressMatches[0].coordinates.x}`
          )
            .then((response) => response.json())
            .then((data) => {
              setForecast(data.forecast);
            });
        }
      })
      .catch((error) => {
        setIsError(true);
        setErrorMessage('Could not retrieve information');
        console.error(error);
      });
  };

  return (
    <>
      <Head>
        <title>My NextJS Forecast</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Grid container alignItems="center" justifyContent="center" spacing={2}>
          <Grid container item lg={7} md={8} xs={9}>
            <Grid item xs={12}>
              <h1>My NextJS Forecast</h1>
            </Grid>
            <Grid item xs={12}>
              Type in an address below and hit the submit button to display the
              7-day forecast for the submitted location
            </Grid>
          </Grid>

          <Grid item lg={6} md={7} xs={8}>
            <TextField
              error={isDirty && !searchValue}
              onBlur={() => setIsDirty(true)}
              helperText={isDirty && !searchValue && 'Address cannot be empty'}
              required
              label="Address"
              placeholder="4600 Silver Hill Rd, Washington"
              fullWidth
              type="text"
              value={searchValue}
              onChange={handleOnChange}
            />
          </Grid>
          <Grid item xs={1}>
            <Button
              disabled={!searchValue}
              variant="contained"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
          <Snackbar
            open={isError}
            autoHideDuration={7000}
            onClose={() => {
              setIsError(false);
            }}
          >
            <Alert severity="error" sx={{ width: '100%' }}>
              {errorMessage}
            </Alert>
          </Snackbar>
          {matchedAddress && (
            <Grid item xs={12}>
              Displaying the forecast for: <b>{matchedAddress}</b>
            </Grid>
          )}

          <Forecast periods={forecast} />
        </Grid>
      </main>
    </>
  );
};

export default Home;
