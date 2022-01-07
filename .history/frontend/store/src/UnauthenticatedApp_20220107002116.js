import { Routes, Route } from 'react-router-dom';
import Item from './components/Items';
import Login from './components/Login';
import Registration from './components/Registration';

function UnauthenticatedApp ({setCurrentUser}) {
    return (
        <>
            <Login />
            <Routes>
                <Route path='/login' element={<Login />} />
                {/* <Route path='/login' element={<Login />} /> */}

                <Route path='/registration' element={<Registration />} />
                <Route path='/items' element={<Item />} />

            </Routes>
        </>
    )
}

export default UnauthenticatedApp;