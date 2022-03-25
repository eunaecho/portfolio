import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

import ResponseCheck_hooks from './ResponseCheck_hooks';

const Hot = hot(ResponseCheck_hooks);

ReactDOM.render(<Hot/>, document.querySelector('#root'));