import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
// import AuthContext from './AuthContext';
import AuthContext from './AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { auth } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={props =>
                auth ? (
                    <Component {...props} />
                ) : (
                    <Navigate replace to="/login" />
                )
            }
        />
    );
};

export default ProtectedRoute;
