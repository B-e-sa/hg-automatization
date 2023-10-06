import * as dotenv from 'dotenv';
import init from './utils/init';

dotenv.config();
(async () => await init())();