import { SWRConfig } from 'swr';
import { BrowserRouter } from 'react-router-dom';
import { FrontRouter } from './front/router';
import { CatterRouter } from './catter/router';
import { ToastContainer } from './utils/toast';

export const ReactRoot = () => {
    return (
        <SWRConfig value={{}}>
            <BrowserRouter>
                <FrontRouter />
                <CatterRouter />
            </BrowserRouter>

            <ToastContainer />
        </SWRConfig>
    )
}