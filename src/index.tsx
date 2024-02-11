import { render } from 'preact';
import { ReactRoot } from './ReactRoot.tsx';

import "@fontsource/manrope";
import "@fontsource/manrope/200.css";

import './assets/app.css';
import 'aos/dist/aos.css';

render(<ReactRoot />, document.getElementById('app')!)
