import {Route,Routes} from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Draft from './components/Draft';

const Routing=()=>{
    return(
        <>

        <Routes>
            <Route path='/' element={<SignIn/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/draft' element={<Draft/>}/>




        </Routes>
        </>
    )
}


export default Routing;