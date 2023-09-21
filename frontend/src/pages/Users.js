import React from "react";
import { Link } from "react-router-dom";

export default function Users(){
    const [users, setUsers] = React.useState([])
    React.useEffect(function(){
        fetch('/api/thesearchable/userslist/')
        .then(res => res.json())
        .then(data => {
            setUsers(data)
        })
    },[])

    const allUsers = users.map(user => {
        const userUrl = `/userinfo/${user.user.id}`
        return(
            <tr>
                <td className="Users--td"><Link to={userUrl}> {user.user.username}</Link></td>
                <td className="Users--td">{user.user.id}</td>
                <td className="Users--td">{user.user.email}</td>
            </tr>
        )
        
    })

    return(
        <div>
          
            <table className="Users--table">
            <tr className="Users--tr">
                <th className="Users--th">Username</th>
                <th className="Users--th">Id</th>
                <th className="Users--th">Email</th>
            </tr>
            {allUsers}
            </table>
        </div>
    )
}