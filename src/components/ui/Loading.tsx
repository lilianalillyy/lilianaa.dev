import { c } from "../../utils";
import { FlexCentered } from "./FlexCenterred";
import { Spinner } from "./Spinner";

export interface LoadingProps {
    spinnerClassName?: string;
    containerClassName?: string;
}

export const Loading = ({ spinnerClassName, containerClassName }: LoadingProps) => (
    <FlexCentered className={c("py-8", containerClassName)}>
        <Spinner className={c("w-10 h-10", spinnerClassName)} />
    </FlexCentered>
);