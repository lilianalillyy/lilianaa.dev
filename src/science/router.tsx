import { Route, Routes } from "react-router-dom";
import { LoadingSuspense } from "../components/ui/LoadingSuspense";
import { lazy } from "preact/compat";

const CatSentence = lazy(() => import("./pages/CatSentence").then(val => val.CatSentence));

export const ScienceRouter = () => {
    return (
        <Routes>
            <Route path="/_science/cat-sentence" element={<LoadingSuspense>
                <CatSentence />
            </LoadingSuspense>} />
        </Routes>
    )
}