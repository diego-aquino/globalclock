import axios from 'axios';

import { ResponseData as TimeNowResponseData } from 'pages/api/time-now';

export async function requestCurrentUTCTime(): Promise<string> {
  const { data } = await axios.get<TimeNowResponseData>('/api/time-now');

  return data.time;
}
