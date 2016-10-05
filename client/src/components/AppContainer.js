// This component handles the App template used on every page.
import React from 'react';
import {connect} from 'react-redux';
import Navigation from './Navigation';
import dateFormatter from '../formatters/dateFormatter';

class App extends React.Component {
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

    static propTypes = {
        children: React.PropTypes.object.isRequired
    };

}


function mapStateToProps(state, ownProps) {
    return {

    };
}

export default connect(mapStateToProps)(App);