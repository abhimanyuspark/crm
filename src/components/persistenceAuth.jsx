import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { refreshAuthUser } from "../redux/server/server";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { Loader } from "./index";

const PersistenceAuth = () => {
  const auth = Cookies.get("user");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  if (auth) {
    const user = useMemo(() => JSON.parse(auth), []);
    useEffect(() => {
      let mounted = true;

      const refresh = async (email) => {
        try {
          await dispatch(refreshAuthUser(email));
        } catch (err) {
          console.error("Error refreshing user data:", err);
        } finally {
          if (mounted) {
            setLoading(false);
          }
        }
      };

      if (user?.email) {
        refresh(user?.email);
      } else {
        setLoading(false);
      }

      return () => {
        mounted = false;
      };
    }, [dispatch, user]);

    return loading ? <Loader /> : <Outlet />;
  } else {
    return <Outlet />;
  }
};

export default PersistenceAuth;
