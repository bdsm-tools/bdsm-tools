import { app } from './function.js';
import timeout from 'connect-timeout';

app.use(timeout(10000));
app.listen(3300);
console.log("Listening on port: 3300");