import expressSequelize from '.';
import config from './config';
import express from 'express';

const main = () => {
	const app = express();

	expressSequelize({ app, config });
};

main();
