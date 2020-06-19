import React from 'react'
import './assets/style.css'
import Home from './Login';
import Index from './components/index';
import {BrowserRouter,Route} from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import Register from './components/Register'
import Logout from './components/Logout'
// require('typeface-poppins')
// require('typeface-montserrat')
require('react-fontawesome')


class App extends React.Component{
    render(){
        return(
            <Provider store={store}>
                <BrowserRouter>
                    <Route exact path='/' component={Home}/>
                    <Route path='/home' component={Index} />
                    <Route path='/logout' component={Logout} />
                    <Route path='/register/:id' component={Register} />
                    <Route path='/refferal/:id' component={Register} />
                </BrowserRouter>
            </Provider>
        )
    }
}
export default App