import expressSequelize from '.';
import config from './config';
import express from 'express';
import cors from 'cors';
import { peek } from '@laufire/utils/debug';

const main = () => {
	const app = express();

	app.use(cors({ origin: '*' }));
	app.use(express.json());

	expressSequelize({ app, config });
	const port = 2000;

	app.listen(port, () => peek(`listen on port ${ port }`));
};

main();
