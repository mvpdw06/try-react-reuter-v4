import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink
} from 'react-router-dom';

import './App.css';

const Links = () => (
    <nav>
        <Link to='/'>Home</Link>
        <Link to={{ pathname: '/about' }}>About</Link>
        <Link replace to='/contact'>Contact</Link>
        <Link to='/parse?id=123'>Parse123</Link>
        <Link to={{ pathname: '/parse', search: 'id=456' }}>Parse456</Link>
    </nav>
)

const isActive = (match, location) => {
    console.log(match, location)
    return match;
}

const NavLinks = () => (
    <nav>
        <NavLink exact activeClassName="active" to='/'>Home</NavLink>
        <NavLink activeStyle={{ color: 'green' }} to={{ pathname: '/about' }}>About</NavLink>
        <NavLink isActive={isActive} activeClassName="active" replace to='/contact'>Contact</NavLink>
    </nav>
)

const Home = () => (
    <h1>Home</h1>
)

const App = () => (
    <Router>
        <div>
            <Links />
            <NavLinks />
            <Route exact path='/' component={Home}  />
            <Route path='/about' render={() => <h1>About</h1>} />
            <Route path='/contact' children={({ match }) => match && <h1>Contact</h1>}/>
            <Route path='/param/:first/:second?' render={({ match }) => (
                <h1>
                    Get Parameter: {match.params.first || 'first'} <br />
                    Second: {match.params.second}
                </h1>
                )} />
            <Route 
                path='/validparam/:first(\d{2}-\d{2}-\d{4}):second' 
                render={({ match }) => (
                    <h1>
                        Get Parameter: {match.params.first} <br />
                        Second: {match.params.second}
                    </h1>
                )} />
            <Route path='/parse' render={({ match, location }) => (
                <div>
                    <h1>Parse</h1>
                    <p>{JSON.stringify(match)}</p>
                    <p>{JSON.stringify(location)}</p>
                    <p>{new URLSearchParams(location.search).get('id')}</p>
                </div>
                )} />
        </div>
    </Router>
)

module.exports = App;