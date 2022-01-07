import Store from "./components/Store";
import { Routes, Route, Navigate} from 'react-router-dom';


function AuthenticatedApp () {
    return (
        <div>
            <Routes>
                <Route exact path='/store' element={<Store />} />
            </Routes>

        </div>
    )
}

export default AuthenticatedApp;