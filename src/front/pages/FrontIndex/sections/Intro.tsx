import { useState, useEffect } from "preact/hooks";
import TextTransition from 'react-text-transition';
import { loadBasic } from "tsparticles-basic";
import { rayEasterEgg, rayCatTagId, github, linkedInUrl, mail, subtitles, nickname, lastName, firstName } from "../../../../utils/constants";
import { LinkedInIcon } from "../../../../components/icons/LinkedInIcon";
import { GitHubIcon } from "../../../../components/icons/GitHubIcon";
import { Particles } from "../../../../components/ui/Particles";
import { AtIcon } from "../../../../components/icons/AtIcon";
import { dots } from "../../../../utils/particles";
import { c } from "../../../../utils";
import { Link } from "react-router-dom";
import { PawIcon } from "../../../../components/icons/PawIcon";
import { RandomCatView } from "../../../components/RandomCatView";
import { useMd } from "../../../../hooks/useMd";

export const IntroSubtitle = () => {
    // Current index of the `subtitles` array
    const [subtitleIndex, setSubtitleIndex] = useState(0);
    const text = subtitles[subtitleIndex % subtitles.length] ?? "";

    const [rayEasterEggOpen, setRayEasterEggOpen] = useState(false);

    useEffect(() => {
        const subtitleIndexInterval = setInterval(() => setSubtitleIndex((index) => index + 1), 1500);

        return () => {
            clearInterval(subtitleIndexInterval);
        }
    }, []);

    const handleClick = () => {
        text === rayEasterEgg && setRayEasterEggOpen(true);
    }

    return (
        <>
            <button className="cursor-text" onClick={handleClick}>
                <TextTransition
                    springConfig={{
                        tension: 180,
                        friction: 12
                    }}
                    className="text-white text-xl md:text-3xl first-upper tracking-wider font-semibold font-mono underline decoration-4"
                >
                    {text}
                </TextTransition>
            </button>

            {rayEasterEggOpen && <RandomCatView catTagId={rayCatTagId} onClose={() => setRayEasterEggOpen(false)} />}
        </>
    )
}

export interface IntroProps {
    onIntroBackgroundShown?: (val: boolean) => unknown;
}

export const Intro = ({ onIntroBackgroundShown }: IntroProps) => {
    // Is intro background shown (height: 100%)
    const [introBackgroundShown, setIntroBackgroundShown] = useState(false);

    const md = useMd();

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
                                <GitHubIcon data-aos="fade-up" data-aos-delay="1500" className="w-10 h-10" />
                            </a>

                            <a href={`mailto:${mail}`} target="_blank" rel="noreferrer noopener" className={"transition-all duration-300 ease-in-out-quart transform hover:scale-125"}>
                                <AtIcon data-aos="fade-up" data-aos-delay="1700" className="w-10 h-10" />
                            </a>

                            <Link to="/catter">
                                <PawIcon data-aos="fade-up" data-aos-delay="1900" className="w-10 h-10" />
                            </Link>
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
                                {firstName}
                            </span>
                            {md && (
                                <span
                                    data-aos="fade-up"
                                    data-aos-delay="700"
                                    className={"!text-sm tracking-normal font-thin"}
                                >
                                    also known as {nickname}
                                </span>
                            )}
                            <br />
                            <span
                                data-aos="fade-up"
                                data-aos-delay="600"
                            >
                                {lastName}
                            </span>
                        </h1>

                        {!md && (
                            <span
                                data-aos="fade-up"
                                data-aos-delay="700"
                                className={"!text-sm text-white font-mono tracking-normal font-thin mb-8"}
                            >
                                also known as {nickname}
                            </span>
                        )}

                        <div data-aos="fade-up" data-aos-delay="1100" class="mb-12">
                            <IntroSubtitle />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}