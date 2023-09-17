import { Route, Routes } from "react-router-dom";
import { FrontIndex } from "./pages/FrontIndex";
import { lazy } from "preact/compat";
import { LoadingSuspense } from "../components/ui/LoadingSuspense";

export const CatSentence = lazy(() => import("../science/pages/CatSentence").then(val => val.CatSentence));

export const FrontRouter = () => (
    <Routes>
        <Route path="/" element={<FrontIndex />} />

        <Route path="/_science/cat-sentence" element={<LoadingSuspense>
            <CatSentence />
        </LoadingSuspense>} />
    </Routes>
)