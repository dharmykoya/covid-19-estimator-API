import { Router } from 'express';
import Estimator from '../controllers/estimator.controller';
// import getLogs from '../controllers/logs.controller';
import Logs from '../controllers/logs.controller';

const router = Router();
const { getEstimate, getEstimate2, getEstimateXml } = Estimator;
const { getLogs, deleteLogs } = Logs;

// returns all the accounts attached to a user
router.post('/', getEstimate);

router.post('/json', getEstimate);

router.post('/xml', getEstimateXml);

router.get('/logs', getLogs);

router.delete('/delete', deleteLogs);

export default router;
