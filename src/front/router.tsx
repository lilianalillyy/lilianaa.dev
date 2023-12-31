import { Route, Routes } from "react-router-dom";
import { FrontIndex } from "./pages/FrontIndex";
import { lazy } from "preact/compat";

export const CatSentence = lazy(() => import("../science/pages/CatSentence").then(val => val.CatSentence));

export const FrontRouter = () => (
    <Routes>
        <Route path="/" element={<FrontIndex />} />
    </Routes>
)
