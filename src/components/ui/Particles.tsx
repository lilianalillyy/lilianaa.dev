import { JSX } from "preact";
import ReactParticles, { IParticlesProps } from "react-particles"

// Dumb typescript/jsx hackaround as class components and preact/compat aren't frindly
export const Particles = (props: IParticlesProps): JSX.Element => {
    let P = ReactParticles as any;
    return <P {...props} />;
}