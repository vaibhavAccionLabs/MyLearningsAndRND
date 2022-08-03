const Feedback = require('@/models/feedback');
const db = require('@/lib/db');

export default async (req, res) => {
  await db();
  const _id = req.query.id;
  switch (req.method) {
    case 'DELETE':
      Feedback.remove({ _id })
        .exec()
        .then(
          (result) =>
            result &&
            res.status(200).json({
              success: true,
              message: 'feedback deleted successfully.',
            })
        );
      break;
    default:
      res.status(400).json({ error: 'Bad request' });
      break;
  }
};
