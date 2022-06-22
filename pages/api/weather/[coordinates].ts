import type { NextApiRequest, NextApiResponse } from 'next';
import { Period } from '../../../utils/interfaces';

type Data = {
  forecast: Period[];
};

const WEATHER_API = 'https://api.weather.gov/points/';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { coordinates } = req.query;

  fetch(`${WEATHER_API}${coordinates}`)
    .then((response) => response.json())
    .then(({ properties: { forecast } }) => fetch(forecast))
    .then((response) => response.json())
    .then(({ properties: { periods } }) =>
      res.status(200).json({ forecast: periods })
    )
    .catch((error) => res.status(500).json(error));
}
