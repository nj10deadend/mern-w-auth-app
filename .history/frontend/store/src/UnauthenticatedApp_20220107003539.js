import { Routes, Route, Navigate} from 'react-router-dom';
import Item from './components/Items';
import Login from './components/Login';
import Registration from './components/Registration';

function UnauthenticatedApp ({setCurrentUser}) {
    return (
        <>
            {/* <Login /> */}
            <Routes>
                <Route exact path='/login' element={<Login />} />
                {/* <Route path='/login' element={<Login />} /> */}

                <Route exact path='/registration' element={<Registration />} />
                <Route exact path='/items' element={<Item />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    )
}

export default UnauthenticatedApp;