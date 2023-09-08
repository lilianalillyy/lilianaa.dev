import { render } from 'preact';
import AOS from "aos";
import { ReactRoot } from './components/ReactRoot.tsx';

import '@fontsource/fira-mono';
import '@fontsource-variable/rubik';

import './assets/app.css';
import 'aos/dist/aos.css';

AOS.init({
    easing: "ease-in-out-cubic",
    duration: 500,
});

render(<ReactRoot />, document.getElementById('app')!)
