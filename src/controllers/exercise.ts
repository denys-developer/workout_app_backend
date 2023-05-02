import { ExerciseModal } from '@/models';

class ExercisesController {
  async getAll(req, res, next) {
    try {
      const response = await ExerciseModal.find({});
      let firstExternalId = null;

      const categories = response.reduce((accum, current, index) => {
        if (index === 0) firstExternalId = current.externalId;
        accum[current.title] = [...(accum[current.title] ?? []), current];
        return accum;
      }, {});

      res.send({ categories, firstExternalId });
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
