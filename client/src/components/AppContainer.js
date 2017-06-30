// This component handles the App template used on every page.
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Navigation from './Navigation';
import dateFormatter from '../formatters/dateFormatter';

class App extends React.Component {
    static propTypes = {
        children: PropTypes.object.isRequired
    };

    render() {
        let date = dateFormatter.currentYear();

        return (
            <div>
                <Navigation />
                <div id="page-body" className="container-fluid">
                    {this.props.children}

                    <div className="container">
                        <hr/>

                        <p>&copy; {date} - Contoso University</p>
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {

    };
}

export default connect(mapStateToProps)(App);