import React, { useState } from "react";
import axios from "axios";
export const UserContext = React.createContext();


export const UserContextProvider = ({ children }) => {

    const [name,setName] = useState("")
    const [auth,setAuth] = useState(false);
    const [loading,setLoading] = useState(false);
    const [user, setUser] = useState([]);

    async function getCurrentUser() {
      let result;
      try {
        result = await axios({
          url: `${process.env.REACT_APP_URL}/userByJwt?id=${localStorage.getItem(
            "bb_auth_token"
          )}`,
          method: "get",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("bb_auth_token")}`,
          },
        });
        if (result.status === 200) {
          setUser(result.data);
          setAuth(true);
          setLoading(true);
        }
      } catch (err) {
        console.log(err.message);
        localStorage.removeItem("bb_auth_token");
        setAuth(false);
        setLoading(true);
      }
    }


    React.useEffect(() => {

        let access_token = localStorage.getItem("bb_auth_token");
    
        if(access_token !== null && access_token !== undefined){
          getCurrentUser();
        }
        else{
          setAuth(false);
          setLoading(true);
        }
    
    
      },[])

      return (
        <UserContext.Provider
          value={{
            auth,
            setAuth,
            name,
            setName,
            loading,
            setLoading,
            user,
            setUser
          }}
        >
          {children}
        </UserContext.Provider>
      );


}