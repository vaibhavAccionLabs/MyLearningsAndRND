import nc from 'next-connect';
import mongoose from 'mongoose';
import Feedback from '@/models/feedback';
import { isAuthorized } from '@/middleware/checkAuthorized';

const FeedbackApi = async (req, res) => {
	const feedback = new Feedback({
		_id: new mongoose.Types.ObjectId(),
		userName: req.body.userName,
		userEmail: req.body.userEmail,
		userMobile: req.body.userMobile,
		comment: req.body.comment,
		qna: req.body.qna,
	});
	switch (req.method) {
		case 'GET':
			Feedback.find()
				.select('_id userName userEmail userMobile comment qna')
				.exec()
				.then((result) => res.status(200).json(result));
			break;
		case 'POST':
			try {
				feedback
					.save()
					.then((result) => {
						res.status(201).json({
							success: true,
							...result,
						});
					})
					.catch((err) => {
						res.status(500).json({
							error: err,
						});
					});
			} catch (error) {
				res.status(500).json({
					error: error,
				});
			}
			break;
		default:
			res.status(400).json({ error: 'Bad request' });
			break;
	}
};

export default FeedbackApi;
