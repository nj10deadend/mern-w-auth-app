import { Routes, Route, Navigate} from 'react-router-dom';
import Store from './components/Store';
import Login from './components/Login';
import Registration from './components/Registration';

function UnauthenticatedApp ({setCurrentUser}) {
    return (
        <>
            {/* <Login /> */}
            <Routes>
                <Route exact path='/' element={<Login />} />
                {/* <Route path='/login' element={<Login />} /> */}

                <Route exact path='/registration' element={<Registration />} />
                <Route exact path='/store' element={<Store />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    )
}

export default UnauthenticatedApp;