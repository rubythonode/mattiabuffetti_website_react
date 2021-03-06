import React from 'react';
import ReactDOM from 'react-dom/server';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import Helmet from 'react-helmet'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'

import App from '../shared/components/index';

/**
 * Provides the server side rendered app. In development environment, this method is called by
 * `react-hot-server-middleware`.
 *
 * @param clientStats Parameter passed by hot server middleware
 */
export default ({ clientStats }) => async (req, res, next) => {
    const app = (
		<Provider store={store}>
			<StaticRouter location={location}>
				<App />
			</StaticRouter>
		</Provider>
    );

    const appString = ReactDOM.renderToString(app);
	const head = Helmet.rewind();
	const title = head.title;
	const meta = head.meta;
	const link = head.link;
    const chunkNames = flushChunkNames();
    const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames });

    res.render('index', {
        appString,
        js,
        styles,
        cssHash,
        title,
        meta,
        link
    });
};
