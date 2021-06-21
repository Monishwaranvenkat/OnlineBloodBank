import React , {useContext} from 'react'
import {UserContext} from "../../contexts/userContext";
import { Card, Button } from "@material-ui/core";

function Home() {
    const { name } = useContext(UserContext);

    return (
        <div>
            <h3 style={{textAlign:"center"}}>Welcome Admin</h3>
            <Button style={{textAlign:"center"}}>Add New Admin</Button>
        </div>
    )
}

export default Home
