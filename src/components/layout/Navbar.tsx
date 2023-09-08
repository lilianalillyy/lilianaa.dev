import { useState, useEffect } from "preact/hooks";
import { c } from "../../utils";
import { MenuIcon } from "../icons/MenuIcon";

export const Navbar = () => {
    // Fade in
    const [animated, setAnimated] = useState(false);

    // Made navbar visible only on scroll up
    const [scrollVisible, setScrollVisible] = useState(true);

    // User scrolled past intro
    const [scrolled, setScrolled] = useState(false);

    const onScroll = () => {
        setScrolled(document.documentElement.scrollTop >= 80);
    }

    const onWheel = (e: WheelEvent) => {

        const scrollDirection = e.deltaY < 0 ? 1 : -1;
        console.log("wheel", scrollDirection)

        setScrollVisible(scrollDirection >= 1);
    }

    useEffect(() => {
        const fadeInInterval = setInterval(() => setAnimated(true), 300)

        window.addEventListener("scroll", onScroll);

        window.addEventListener("wheel", onWheel)

        onScroll();

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("wheel", onWheel);

            clearInterval(fadeInInterval);
        };
    }, [])

    return (
        <nav
            className={c(
                "fixed w-full px-8 py-6 bg-opacity-30 md:px-24 transition-all transform duration-300 ease-in-out-cubic backdrop-blur-md",
                animated ? "opacity-100" : "opacity-0",
                scrolled ? "bg-violet-700" : "bg-transparent",
                scrollVisible ? "translate-y-0" : "-translate-y-full",
                scrolled && scrollVisible && "shadow-2xl",
            )}
        >

            <div className={c("flex justify-between items-center w-full h-full transition duration-300 ease-in-out-cubic", scrollVisible ? "opacity-100" : "opacity-0")}>
                <div class="text-white text-xl font-mono">Liliana</div>

                <div class="w-full flex justify-end items-center gap-4 text-white">
                    <MenuIcon className="w-12 h-12"/>
                </div>
            </div>
        </nav>
    );
}