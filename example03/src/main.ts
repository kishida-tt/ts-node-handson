import * as express from 'express';
import fetchAPI from './fetchAPI';
import chatGen from './chatgpt';
import config from './config';

const app: express.Express = express();
const PORT = config.port;
const API = '/api';

// Allow CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

// settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routing
const router: express.Router = express.Router();

// sample: fetch api with axios
router.get(
  `${API}/example`,
  async (req: express.Request, res: express.Response) => {
    const ret = await fetchAPI('');
    res.send(ret);
  },
);

// sample: use openai chatgpt
router.get(
  `${API}/chat`,
  async (req: express.Request, res: express.Response) => {
    const msg = req.query['msg']?.toString() || '';
    const ret = await chatGen(msg);
    res.send(ret);
  },
);

// sample post
router.post(`${API}/example`, (req: express.Request, res: express.Response) => {
  res.send(req.body);
});
app.use(router);

app.listen(PORT, () => {
  console.log(`*** start api server on port${PORT} ***`);
});
