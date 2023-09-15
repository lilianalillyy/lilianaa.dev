import { Route, Routes } from "react-router-dom";
import { LoadingSuspense } from "../components/ui/LoadingSuspense";
import { lazy } from "preact/compat";

const CatList = lazy(() => import("./pages/CatList").then(val => val.CatList));

export const CatterRouter = () => {
    return (
        <Routes>
            <Route path="/catter/:id?" element={<LoadingSuspense>
                <CatList />
            </LoadingSuspense>} />
        </Routes>
    )
}