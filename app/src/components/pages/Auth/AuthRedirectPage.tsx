import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

function AuthRedirectPage() {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();

    useEffect(() => {
        if (isAuthenticated) {
            const promise = getAccessTokenSilently().then(val => console.log(val));
            void promise;
        }
    }, [isAuthenticated, getAccessTokenSilently]);

    return <h1>Auth callback</h1>;
}

export default AuthRedirectPage;
