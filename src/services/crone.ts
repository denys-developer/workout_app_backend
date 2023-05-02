import axios from 'axios';
import cron from 'node-cron';

import { ExerciseModal } from '@/models';
import { envUtil } from '@/utils';
const {
  workout: { apiToken, api },
} = envUtil.getEnv();

const initWorkoutData = async () => {
  try {
    const {
      data: { data },
    } = await axios.get(api, {
      params: {
        api_token: apiToken,
      },
    });

    const combineExercises = data.questions.reduce(
      (accum, { title, exercises }) => [
        ...accum,
        ...exercises.map((exercise) => ({ ...exercise, title })),
      ],
      [],
    );

    const modArray = combineExercises.map(({ id, ...exercise }, i) => {
      const isLast = combineExercises.length - 1 === i;
      const isFirst = i === 0;
      const prevExternalId = !isFirst ? combineExercises[i - 1].id : null;
      const nextExternalId = !isLast ? combineExercises[i + 1].id : null;
      return {
        ...exercise,
        externalId: id,
        prevExternalId,
        nextExternalId,
      };
    });

    const bulkUpdateOps = modArray.map((update) => ({
      updateOne: {
        filter: { externalId: update.externalId },
        update: update,
        upsert: true,
      },
    }));
    await ExerciseModal.bulkWrite(bulkUpdateOps);
  } catch (err) {
    console.log(err);
  }
};

initWorkoutData().then(() => {
  console.log('Got workout data');
});

const initWorkoutDataCrone = cron.schedule('0 0 * * *', initWorkoutData);
initWorkoutDataCrone.start();
