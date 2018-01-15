import React from 'react';

import LoadingWithTimer from './LoadingWithTimer/LoadingWithTimer';
import LoadingWithStream from './LoadingWithStream/LoadingWithStream';

import { HashRouter, Route, Link } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import './Main.less';

class Main extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
        <HashRouter>
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div>
                    <div className="main-menu">
                        <IconMenu
                            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        >
                            <MenuItem
                                containerElement={<Link to="/"/>}
                                primaryText="Timer"
                            />
                            <MenuItem
                                containerElement={<Link to="/stream"/>}
                                primaryText="Stream"
                            />
                        </IconMenu>
                    </div>
                    <div>
                        <Route exact path="/" component={LoadingWithTimer}/>
                        <Route path="/stream" component={LoadingWithStream}/>
                    </div>
                </div>
            </MuiThemeProvider>
        </HashRouter>
    );
  }
}

export default Main;
