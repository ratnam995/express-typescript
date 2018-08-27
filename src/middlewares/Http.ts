/**
 * Defines all the requisites in HTTP
 *
 * @author Faiz A. Farooqui <faiz@geekyants.com>
 */

import * as cors from 'cors';
import * as flash from 'express-flash';
import * as compress from 'compression';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as expressValidator from 'express-validator';

import Locals from '../providers/Locals';
import Passport from '../providers/Passport';

class Http {
	public static mountExpressAPIs (_express): any {
		// Enables the request body parser
		_express.use(bodyParser.json());
		_express.use(bodyParser.urlencoded({ extended: false }));

		// Disable the x-powered-by header in response
		_express.disable('x-powered-by');

		// Enables the request validator
		_express.use(expressValidator());

		// Enables the request flash messages
		_express.use(flash());

		/**
		 * Enables the session store
		 *
		 * Note: You can also add redis-store
		 * into the options object.
		 */
		const options = {
			secret: Locals.config().appSecret,
			resave: false,
			saveUninitialized: false,
			cookie: {
				maxAge: 1209600000 // two weeks (in ms)
			}
		};
		_express.use(session(options));

		// Enables the CORS
		_express.use(cors());

		// Enables the "gzip" / "deflate" compression for response
		_express.use(compress());

		// Loads the passport configuration
		_express = Passport.mountPackage(_express);

		return _express;
	}
}

export default Http;