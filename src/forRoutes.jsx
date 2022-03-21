import {Route,Routes} from 'react-router-dom';
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import Home from './components/home';
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