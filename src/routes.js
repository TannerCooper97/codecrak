import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from './Components/Auth/Auth';
import Home from './Components/Home/Home';
import Wheel from './Components/Wheel/questionWheel';
import QuestionPage from './Components/Wheel/questionPage';
import Profile from './Components/Profile/profile';


export default(
    <Switch> 
        <Route component={Auth} exact path ='/'/>
        <Route component={Home}  path = '/home'/>
        <Route component={Profile}  path ='/profile/:id'/>
        <Route component={Wheel}  path ='/Wheel'/>
        <Route component={QuestionPage}  path = '/question/:questionProp'/>
    </Switch>
)