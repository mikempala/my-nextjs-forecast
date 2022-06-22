import Grid from '@mui/material/Grid';
import WeatherCard from '../WeatherCard/WeatherCard';
import { Period } from '../../utils/interfaces';

interface ForecastProps {
  periods: Period[];
}

const Forecast: React.FC<ForecastProps> = ({ periods }) => {
  return (
    <Grid item xs={12}>
      {periods.length > 0 &&
        periods.map((period) => (
          <WeatherCard key={period.number} {...period} />
        ))}
    </Grid>
  );
};

export default Forecast;
