// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  BungieUserData, BungieUserResponse, DatUserData, UserResponse,
} from '../../../types/users';

export default async function usersHandler(
  req: NextApiRequest,
  res: NextApiResponse<UserResponse>,
) {
  const apiKey = process.env.BUNGIE_API_KEY;
  const {
    query: { id },
  } = req;

  if (!apiKey) {
    res.status(500);
    return;
  }

  if (!id) {
    res.status(404);
    return;
  }

  const localData: DatUserData = {
    id: 'local-data-id',
    lastLogin: new Date().toString(),
    lastAuth: 'asdfasdfasdf',
  };
  let bungieData: BungieUserData;

  try {
    const bungieUserApiUrl = `https://www.bungie.net/platform/User/GetBungieNetUserById/${id}/`;
    const bungieResponse = await fetch(bungieUserApiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
    });
    const responseData = await bungieResponse.json() as BungieUserResponse;
    bungieData = responseData.Response;
  } catch (e) {
    console.log('Error while fetching Bungie data', e);
    res.status(500);
    return;
  }

  const overallUserData = {
    datUserData: {
      ...localData,
    },
    bungieNetUser: {
      ...bungieData,
    },
  };

  res.status(200).json({
    data: overallUserData,
  });
}
