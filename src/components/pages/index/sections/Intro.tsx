import { useState, useEffect } from "preact/hooks";
import TextTransition from 'react-text-transition';
import { loadBasic } from "tsparticles-basic";
import { Particles } from "../../../Particles";
import { dots } from "../../../../particles/dots";
import { c } from "../../../../utils";
import { LinkedInIcon } from "../../../icons/LinkedInIcon";
import { GitHubIcon } from "../../../icons/GitHubIcon";
import { AtIcon } from "../../../icons/AtIcon";
import { github, linkedInUrl, mail, subtitles } from "../../../../constnats";


export const IntroSubtitle = () => {
    // Current index of the `subtitles` array
    const [subtitleIndex, setSubtitleIndex] = useState(0);

    useEffect(() => {
        const subtitleIndexInterval = setInterval(() => setSubtitleIndex((index) => index + 1), 1500);

        return () => {
            clearInterval(subtitleIndexInterval);
        }
    }, []);

    return <TextTransition
        springConfig={{
            tension: 180,
            friction: 12
        }}
        className="text-white text-xl md:text-3xl first-upper tracking-wider font-semibold font-mono underline decoration-4"
    >
        {subtitles[subtitleIndex % subtitles.length]}
    </TextTransition>
}

export interface IntroProps {
    onIntroBackgroundShown?: (val: boolean) => unknown;
}

export const Intro = ({ onIntroBackgroundShown }: IntroProps) => {
    // Is intro background shown (height: 100%)
    const [introBackgroundShown, setIntroBackgroundShown] = useState(false);


    useEffect(() => {
        const introBackgroundInterval = setInterval(() => setIntroBackgroundShown(true), 500);

        return () => {
            clearTimeout(introBackgroundInterval);
        };
    }, []);

    useEffect(() => {
        onIntroBackgroundShown?.(introBackgroundShown);
    }, [introBackgroundShown])

    return (
        <div
            className={c(
                "relative overflow-hidden w-screen flex flex-col justify-center md:justify-end items-center bg-violet-800 transition-all ease-in-out-cubic duration-300",
                introBackgroundShown ? "h-screen" : "h-0"
            )}
        >

            {introBackgroundShown && (
                <>
                    <div class="w-full h-full flex justify-end items-start py-24 px-8 md:px-24 pb-24 text-white z-10">
                        <div class="flex gap-8 items-center">
                            <a href={linkedInUrl} target="_blank" rel="noreferrer noopener" className={"transition-all duration-300 ease-in-out-quart transform hover:scale-125"}>
                                <LinkedInIcon data-aos="fade-up" data-aos-delay="1300" className="w-10 h-10" />
                            </a>

                            <a href={`https://github.com/${github}`} target="_blank" rel="noreferrer noopener" className={"transition-all duration-300 ease-in-out-quart transform hover:scale-125"}>
                                <GitHubIcon data-aos="fade-up" data-aos-delay="1500" className={"w-10 h-10"} />
                            </a>

                            <a href={`mailto:${mail}`} target="_blank" rel="noreferrer noopener" className={"transition-all duration-300 ease-in-out-quart transform hover:scale-125"}>
                                <AtIcon data-aos="fade-up" data-aos-delay="1700" className={"w-10 h-10"} />
                            </a>
                        </div>
                    </div>
                    <Particles options={dots} height="100vh" width="100vw" className="absolute inset-0" init={(e) => loadBasic(e, false)} />
                    <div className="w-full py-24 px-8 md:px-24 pb-24 z-10">
                        <h1
                            data-aos="fade-up"
                            data-aos-delay="400"
                            className="md:mb-8 text-white text-4xl md:text-8xl first-upper tracking-widest font-bold font-mono"
                        >
                            <span
                                data-aos="fade-up"
                                data-aos-delay="500"
                            >
                                Mia
                            </span>
                            <span
                                data-aos="fade-up"
                                data-aos-delay="700"
                                className={"hidden md:inline-block !text-sm tracking-normal font-thin"}
                            >
                                also known as Liliana
                            </span>
                            <br />
                            <span
                                data-aos="fade-up"
                                data-aos-delay="600"
                            >
                                Vališová
                            </span>
                        </h1>

                        <span
                            data-aos="fade-up"
                            data-aos-delay="700"
                            className={"inline-block md:hidden !text-sm text-white font-mono tracking-normal font-thin mb-8"}
                        >
                            also known as Liliana
                        </span>

                        <div data-aos="fade-up" data-aos-delay="1100" class="mb-12">
                            <IntroSubtitle />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}