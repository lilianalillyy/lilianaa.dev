import { Route, Routes } from "react-router-dom";
import { LoadingSuspense } from "../components/ui/LoadingSuspense";
import { lazy } from "preact/compat";

const CatterIndex = lazy(() => import("./pages/CatterIndex").then(val => val.CatterIndex));

export const CatterRouter = () => {
    return (
        <Routes>
            <Route path="/catter/:id?" element={<LoadingSuspense>
                <CatterIndex />
            </LoadingSuspense>} />
        </Routes>
    )
}