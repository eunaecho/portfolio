import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

import RSP_hooks from './RSP_hooks';

const Hot = hot(RSP_hooks);

ReactDOM.render(<Hot/>, document.querySelector('#root'));