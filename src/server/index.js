import React from 'react';
import ReactDOM from 'react-dom/server';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import Helmet from 'react-helmet'

import App from '../shared/App';

/**
 * Provides the server side rendered app. In development environment, this method is called by
 * `react-hot-server-middleware`.
 *
 * @param clientStats Parameter passed by hot server middleware
 */
export default ({ clientStats }) => async (req, res, next) => {
    const app = (
        <App/>
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
