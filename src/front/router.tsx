import { Route, Routes } from "react-router-dom";
import { FrontIndex } from "./pages/FrontIndex";

export const FrontRouter = () => (
    <Routes>
        <Route path="/" element={<FrontIndex />} />
    </Routes>
)
