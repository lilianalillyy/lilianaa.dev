import { useState } from 'preact/hooks';
//import { Navbar } from './layout/Navbar';
import { Intro } from './sections/Intro';


export const Index = () => {
    // Is page content shown (after intro background)
    // (TBD - currently unused)
    const [_contentShown, setContentShown] = useState(false);

    const handleIntroBackgroundShown = (introBackgroundShown: boolean) => {
        let contentInterval: ReturnType<typeof setInterval> | null = null;

        if (introBackgroundShown) {
            setInterval(() => setContentShown(true), 700);
        } else {
            setContentShown(false);
        }

        return () => {
            contentInterval && clearTimeout(contentInterval);
        }
    };

    return (
        <>
            {/*contentShown && <Navbar />*/}

            <Intro onIntroBackgroundShown={handleIntroBackgroundShown} />
        </>
    )
}
