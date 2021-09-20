
import firebase from "./firebase";
import { useEffect, useState } from "react";

export const AuthService = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleUser = (user) => {
    if (user) {
        setUser(user);
    } else {
        setUser(null);
    }
    setIsLoading(false);
  };

    const signIn = (email, password) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((result) => handleUser(result.user))
            .catch((error) => console.log(error));
    };

    const signOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => handleUser(null));
    };

    useEffect(() => {
        const unsubscribe = firebase.auth().onIdTokenChanged(handleUser);
        return () => unsubscribe();
    }, []);

    return { user, isLoading, signIn, signOut };
};
