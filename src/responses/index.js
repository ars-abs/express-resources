import respond from './respond';

const sendNotFoundedResponse = (res) => respond({ res: res, statusCode: 404 });

const removeAndSendResponse = async ({ res, repo, id }) => {
	await repo.remove(id);
	respond({ res: res, statusCode: 200, message: 'Deleted successfully.' });
};

const responses = {
	sendNotFoundedResponse,
	removeAndSendResponse,
};

export default responses;
