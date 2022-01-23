import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from "react-router-dom";

import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/auth" component={ AuthRouter } />

                    <Route exact path="/" exact component={ JournalScreen } />
                
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
}
