import { useCallback, useEffect, useState } from 'preact/hooks';
import { IntroSubtitle } from './sections/Intro';
import { useTitle } from '../../../hooks/useTitle';
import { useAos } from '../../../hooks/useAos';
import { GitHubIcon } from '../../../components/icons/GitHubIcon';
import { LinkedInIcon } from '../../../components/icons/LinkedInIcon';
import { AtIcon } from '../../../components/icons/AtIcon';
import { PawIcon } from '../../../components/icons/PawIcon';
import { Link } from 'react-router-dom';
import { fullName, github, linkedInPartialUrl, linkedInUrl, mail } from '../../../utils/constants';
import { c } from '../../../utils';
import { Card, CardContent, CardHeader, CardSocialText } from './components/Card';
import { Particles } from '../../../components/ui/Particles';
import { dots } from '../../../utils/particles';
import { loadBasic } from 'tsparticles-basic';

export const FrontIndex = () => {
    useTitle();

    const { aos } = useAos()

    const [choiceIsPowerCount, setChoiceIsPowerCount] = useState(0);
    const [choiceIsPower, setChoiceIsPower] = useState(false);

    const onNameClick = useCallback(() => {
        setChoiceIsPowerCount((prev) => {
            if (prev >= 3) {
                return prev;
            }

            return prev + 1;
        });
    }, [setChoiceIsPowerCount])

    useEffect(() => {
        if (choiceIsPowerCount >= 3) {
            setChoiceIsPower(true);
        }
    }, [choiceIsPowerCount, setChoiceIsPower])

    return (
        <div>
            <div className={"container mx-auto px-10 pt-24 z-10 relative"}>
                <div class={"flex flex-col gap-12 mb-12"}>
                    <div>
                        <p class={"text-3xl font-thin tracking-wider text-gray-200"}>a.k.a Liliana</p>
                        <h1 class={"text-7xl font-bold border-b-8 border-gray-100 w-fit pb-2 pr-12"} onClick={onNameClick}>Mia Pilchová</h1>
                    </div>
                    <div>
                        <IntroSubtitle />
                    </div>
                </div>

                <div className={"pb-12"}>
                    <div class={"grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 w-full gap-8 bg-gray-900"}>
                        <a href={`https://github.com/${github}`}>
                            <Card className={"from-gray-700 via-violet-700 to-sky-700"}>
                                <CardHeader Icon={GitHubIcon} />
                                <CardContent>
                                    <CardSocialText>@{github}</CardSocialText>
                                </CardContent>
                            </Card>
                        </a>
                        <a href={linkedInUrl} className={"lg:col-span-2 xl:col-span-1"}>
                            <Card className={"from-sky-700 via-sky-500 to-slate-900"}>
                                <CardHeader Icon={LinkedInIcon} />
                                <CardContent>
                                    <CardSocialText>{linkedInPartialUrl}</CardSocialText>
                                </CardContent>
                            </Card>
                        </a>
                        <a href={`mailto:${mail}`} className={"lg:col-span-2"}>
                            <Card className={"from-amber-900 via-rose-900 to-amber-900"}>
                                <CardHeader Icon={AtIcon} />
                                <CardContent>
                                    <CardSocialText>{mail}</CardSocialText>
                                </CardContent>
                            </Card>
                        </a>
                        <Link to="/catter">
                            <Card className={"from-sky-700 via-indigo-500 to-indigo-950"}>
                                <CardHeader Icon={PawIcon} />
                                <CardContent>
                                    <CardSocialText>catter</CardSocialText>
                                </CardContent>
                            </Card>
                        </Link>
                        <Card className={"from-purple-700 via-purple-800 to-purple-900 lg:col-span-3"} disableHover>
                            <CardHeader />
                            <CardContent>
                                <CardSocialText>&copy; 2024 {fullName} &ndash; this website is open-source</CardSocialText>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div>
                    <p class={c("text-gray-600 lowercase tracking-wide", choiceIsPower && "aos-animate")} {...aos({ animation: "fade-up", anchorPlacement: "top-top", offset: -100 })}>Choice is an illusion created between those with power and those without.</p>
                </div>
            </div>
            <Particles options={dots} height="100vh" width="100vw" className="absolute inset-0" init={(e) => loadBasic(e, false)} />
        </div>
    )
}
