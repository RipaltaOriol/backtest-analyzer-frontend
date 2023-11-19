import LoadingPage from "pages/loading";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { useRefreshTokenMutation } from "../features/auth/authApiSlice";
import { selectCurrentToken, setCredentials } from "../features/auth/authSlice";

const PersistLogin = () => {
    const dispatch = useDispatch();
    const token = useSelector(selectCurrentToken);

    const [isWorking, setIsWorking] = useState(true);
    const [refreshToken] = useRefreshTokenMutation();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                const refreshedToken = await refreshToken().unwrap();
                await dispatch(
                    setCredentials({
                        token: refreshedToken.access_token,
                        user: refreshedToken.user,
                    })
                );
            } catch (err) {
                console.error(err);
            } finally {
                isMounted && setIsWorking(false);
            }
        };
        !token ? verifyRefreshToken() : setIsWorking(false);

        return () => (isMounted = false);
    }, [token, dispatch, refreshToken]);

    return <>{isWorking ? <LoadingPage /> : <Outlet />}</>;
};

export default PersistLogin;
