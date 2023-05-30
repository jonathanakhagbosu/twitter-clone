import { onAuthStateChanged } from "firebase/auth";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase";
import { useEffect } from "react";
import { login, logout } from "./app/features/userSlice";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(login(user.displayName));
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, []);

  return <>{isAuthenticated ? <Homepage /> : <Login />}</>;
}

export default App;
