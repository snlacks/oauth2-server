import * as express from 'express';
import * as Middleware from '../middleware/middleware';
import * as Routes from '../../routes';
import * as fs from 'fs';
import * as https from 'https';

const privateKey = fs.readFileSync('../cert.key', 'utf8');
const certificate = fs.readFileSync('../cert.crt', 'utf8');


/**
 * @constant {express.Application}
 */
const app: express.Application = express();

const credentials = { key: privateKey, cert: certificate };
/**
 * Create HTTP server.
 */

const server = https.createServer(credentials, app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(process.env.PORT || 3000);

/** 
 * @constructs express.Application Middleware
 */
Middleware.configure(app);

/**
 * @constructs express.Application Routes
 */
Routes.init(app);

/**
 * @constructs express.Application Error Handler
 */
Middleware.initErrorHandler(app);

/**
 * sets port 3000 to default or unless otherwise specified in the environment
 */
app.set('port', process.env.PORT || 3000);

/**
 * sets secret to 'superSecret', otherwise specified in the environment
 */
app.set('secret', process.env.SECRET || 'superSecret');

/**
 * @exports {express.Application}
 */
export default app;
