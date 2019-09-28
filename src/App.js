import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from './routes'

// styles
import "assets/css/bootstrap.min.css";
import "assets/css/paper-kit.css";
// // import "assets/css/paper-kit.min.css";
// // import "assets/css/paper-kit.css.map";
import "assets/demo/demo.css";

class App extends React.Component {
  render() {
    return <div>
      <Router>
        <Routes />
      </Router>
    </div>
  };
}

export default App;
