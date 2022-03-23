import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';
import { ApolloProvider } from '@apollo/client';
import ApolloClient from '../config/apollo';
import Loader from '../components/App/Loader';
import {
    METADATA_NAMESPACE
} from '../config/constants';
import { UserMetaContext } from '../contexts';
import { Auth0Extended } from '../interfaces';

const App: React.FC<Record<string, never>> = () => {
    const { user, getAccessTokenSilently } = useAuth0<Auth0Extended>();
    const rawMetadata = user?.[METADATA_NAMESPACE];
    const metadata = {
        ...rawMetadata,
    };
    const getAccessTokenSilentlyRef = useRef(getAccessTokenSilently);
    const [bearerToken, setBearerToken] = useState<string | null>(null);
    useEffect(() => {
        async function getToken() {
            const token = await getAccessTokenSilentlyRef.current();
            setBearerToken(token);
        }
        getToken();
    }, []);

    return (
        <>
            {bearerToken ? (
                <ApolloProvider client={ApolloClient(bearerToken)}>
                    <UserMetaContext.Provider value={metadata}>
                        <Outlet />
                    </UserMetaContext.Provider>
                </ApolloProvider>
            ) : <></>}
        </>
    );
};

export default withAuthenticationRequired(App, {
    onRedirecting: () => <Loader />,
});
