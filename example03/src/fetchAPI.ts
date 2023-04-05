import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const API_BASE = 'https://api.data.metro.tokyo.lg.jp/v1';
const HEADERS = { 'Content-Type': 'application/json' };
const apiurl = `${API_BASE}/WifiAccessPoint`;

async function fetchAPI(req: string): Promise<string> {
  const options: AxiosRequestConfig = {
    url: apiurl,
    method: 'GET',
    headers: HEADERS,
    params: {
      '設置地点.名称.表記': req,
      limit: 100,
    },
  };
  const res = await axios(options).catch(
    (error: AxiosError<{ error: string }>) => {
      // エラー処理
      console.log(error.message);
    },
  );

  const retVal = JSON.stringify(res?.data);
  return retVal;
}

export default fetchAPI;
