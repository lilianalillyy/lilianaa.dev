import { PropsWithChildren, Suspense } from "preact/compat";
import { Loading } from "./Loading";

export const LoadingSuspense = ({ children }: PropsWithChildren<{}>) => <Suspense fallback={<Loading />}>
    {children}
</Suspense>;