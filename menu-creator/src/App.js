import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Menu from "./components/views/Menu";
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Panel from './components/views/Panel';
import PanelItems from './components/views/PanelItems';
import Error404 from './components/views/Error404';
import Landing from './components/views/Landing';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing} />

          <Route exact path="/auth/login" component={SignIn} />
          <Route exact path="/auth/register" component={SignUp} />

          <Route exact path="/menu/:userID" component={Menu} />

          <Route exact path="/404" component={Error404} />

          <Route exact path="/cpanel" component={Panel} />
          <Route exact path="/cpanel/:title" component={PanelItems} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
