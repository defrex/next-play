import { NextApiRequest, NextApiResponse } from 'next'

export default function(req: NextApiRequest, res: NextApiResponse) {
  console.log('user created')
  res.send('okay')
}
