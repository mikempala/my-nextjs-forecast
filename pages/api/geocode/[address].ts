import type { NextApiRequest, NextApiResponse } from 'next';

type AddressMatch = {
  coordinates: {
    x: number;
    y: number;
  };
};

type Data = {
  addressMatches: AddressMatch | AddressMatch[];
};

const GEOCODING_URL =
  'https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?benchmark=Public_AR_Current&format=json&address=';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { address } = req.query;

  fetch(`${GEOCODING_URL}${address}`)
    .then((response) => response.json())
    .then(({ result: { addressMatches } }) =>
      res.status(200).json({ addressMatches })
    )
    .catch((error) => res.status(500).json(error));
}
