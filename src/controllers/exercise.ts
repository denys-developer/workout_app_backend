import { ExerciseModal } from '@/models';
import { redisClient } from '@/services';

class ExercisesController {
  async getAll(req, res, next) {
    try {
      const cachedData = await redisClient.get('exercises');
      if (cachedData) {
        res.send(JSON.parse(cachedData));
      } else {
        const exercises = await ExerciseModal.find();

        let firstExternalId = null;

        const categories = exercises.reduce((accum, current, index) => {
          if (index === 0) firstExternalId = current.externalId;
          accum[current.title] = [...(accum[current.title] ?? []), current];
          return accum;
        }, {});

        const cachedResponse = JSON.stringify({ categories, firstExternalId });

        await redisClient.set('exercises', cachedResponse);

        res.send({ categories, firstExternalId });
      }
    } catch (e) {
      next(e);
    }
  }
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const exercise = await ExerciseModal.findOne({ externalId: id });
      res.send({ exercise });
    } catch (e) {
      next(e);
    }
  }
}

export default new ExercisesController();
