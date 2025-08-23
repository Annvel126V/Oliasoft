import express, { Request, Response } from 'express';
import cors from 'cors';
import sitesRoutes from './sites/sites.routes';
import oilRigsRoutes from './oil-rigs/oil-rigs.routes';

const server = express();
const PORT = process.env.PORT || 3000

server.use(cors());

// Wire up routes
server.get('/', (_: Request, res: Response) => {
  res.send('Oliasoft Hiring Test Server says: Make some magic');
});

sitesRoutes(server);
oilRigsRoutes(server);

server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser`);
});
