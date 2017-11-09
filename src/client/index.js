import React from 'react';
import { hydrate } from 'react-dom';

import App from '../shared/components/index';

const render = Component => {
    hydrate(
        <Component/>,
        document.getElementById('react-root')
    );
};

render(App);

if (module.hot && process.env.NODE_ENV === 'development') {
    module.hot.accept('../shared/components/index', () => {
        const App = require('../shared/components/index').default;
        render(App);
    });
}
