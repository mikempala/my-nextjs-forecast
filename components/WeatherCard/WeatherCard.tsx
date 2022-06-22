import Image from 'next/image';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AirIcon from '@mui/icons-material/Air';
import styles from './WeatherCard.module.scss';
import { Period as WeatherCardProps } from '../../utils/interfaces';

const WeatherCard: React.FC<WeatherCardProps> = ({
  name,
  temperature,
  temperatureUnit,
  windSpeed,
  windDirection,
  icon,
  shortForecast,
  detailedForecast,
}) => (
  <Accordion>
    <AccordionSummary
      className={styles.accordionSummary}
      expandIcon={<ExpandMoreIcon />}
    >
      <Grid
        container
        direction="row"
        spacing={2}
        justifyContent="space-around"
        alignItems="center"
      >
        <Grid item xs={2}>
          {name}
        </Grid>
        <Grid item xs={1}>
          {temperature}° {temperatureUnit}
        </Grid>
        <Grid item xs={1}>
          <Image src={icon} alt="" height={50} width={50} />
        </Grid>
        <Grid item xs={5}>
          {shortForecast}
        </Grid>
        <Grid
          item
          container
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          xs={3}
        >
          <AirIcon fontSize="small" color="primary" />
          {windDirection} {windSpeed}
        </Grid>
      </Grid>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>{detailedForecast}</Typography>
    </AccordionDetails>
  </Accordion>
);

export default WeatherCard;
