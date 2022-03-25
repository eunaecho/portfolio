import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

import lotto_hooks from './lotto_hooks';

const Hot = hot(lotto_hooks);

ReactDOM.render(<Hot/>, document.querySelector('#root'));