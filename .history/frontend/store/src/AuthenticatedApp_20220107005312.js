import Items from "./components/Items";
import { Routes, Route, Navigate} from 'react-router-dom';


function AuthenticatedApp () {
    return (
        <div>
            <Routes>
                <Route exact path='/items' element={<Items />} />
            </Routes>

        </div>
    )
}

export default AuthenticatedApp;