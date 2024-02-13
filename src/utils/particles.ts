// fixme
export const dots = (color = "#fff"): object => ({
    fullScreen: {
        enable: false,
        zIndex: 0,
    },
    particles: {
        number: {
            value: 100,
        },
        move: {
            direction: "none",
            enable: true,
            outModes: {
                default: "out",
            },
            random: false,
            speed: 0.1,
            straight: false,
        },
        opacity: {
            animation: {
                enable: true,
                speed: 0.75,
                sync: false,
                startValue: "min",
            },
            value: { min: 0, max: 1 },
        },
        size: {
            value: { min: 1, max: 3 },
        },
        color,
    },
});