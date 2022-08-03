import Question from '@/models/question';
import { isAuthorized } from '@/middleware/checkAuthorized';

const QuestionApiWithID = async (req, res) => {
  const _id = req.query.id;
  const body = req.body;
  switch (req.method) {
    case 'GET':
      Question.findById(_id)
        .exec()
        .then((result) => res.status(200).json(result));
      break;
    case 'PUT':
      Question.update({ _id }, body)
        .exec()
        .then((result) => res.status(200).json(result));
      break;
    case 'DELETE':
      Question.remove({ _id })
        .exec()
        .then(
          (result) =>
            result &&
            res.status(200).json({
              success: true,
              message: 'question deleted successfully.',
            })
        );
      break;
    default:
      res.status(400).json({ error: 'Bad request' });
      break;
  }
};

export default QuestionApiWithID;
