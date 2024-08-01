import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
    const isAuthenticated = localStorage.getItem('adminToken') !== null;

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Navigate to="/admin/login" replace />
                )
            }
        />
    );
}

export default PrivateRoute;
