import * as React from 'react';

class HomePage extends React.Component<any, any> {
    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1>Contoso University</h1>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <h2>Welcome to Contoso Express</h2>
                        <p>
                            Contoso Express is a sample application that
                            demonstrates best practices of modern JavaScript full-stack development.
                        </p>
                    </div>

                    <div className="col-md-4">
                        <h2>Original Contoso</h2>
                        <p>That is remake of famous in .NET world Contoso Express project.</p>
                        <p>Generally data base schema and functionality stays the same; UI is a bit updated as project demonstrates SPA techniques for client side.</p>
                        <p>
                            <a className="btn btn-default" href="http://www.asp.net/mvc/tutorials/getting-started-with-ef-using-mvc/">See original tutorial here &raquo;</a>
                        </p>
                    </div>

                    <div className="col-md-4">
                        <h2>Source</h2>
                        <p>See the latest source code on GitHub.</p>
                        <p>
                            <a className="btn btn-default" href="https://github.com/yegor-sytnyk/contoso-express">Check out source code on github &raquo;</a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;