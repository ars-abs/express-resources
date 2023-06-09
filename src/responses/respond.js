import getStatus from './getStatus';

const respond = ({ res, statusCode, message, error, data, results, meta }) => {
	res.status(statusCode);
	res.json({
		status: getStatus(statusCode),
		message: message,
		error: error,
		results: results,
		data: data,
		meta: meta,
	});
};

export default respond;
