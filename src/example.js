import config from './config';
import express from 'express';
import cors from 'cors';
import { peek } from '@laufire/utils/debug';
import expressResources from '.';

const main = () => {
	const app = express();

	app.use(cors({ origin: '*' }));
	app.use(express.json());

	expressResources({ app, config });
	const port = 2000;

	app.listen(port, () => peek(`listen on port ${ port }`));
};

main();
