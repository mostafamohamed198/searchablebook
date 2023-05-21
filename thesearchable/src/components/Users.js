import React from "react";

export default function Users(){
    const [users, setUsers] = React.useState([])
    React.useEffect(function(){
        fetch('/userslist/')
        .then(res => res.json())
        .then(data => {
            setUsers(data)
        })
    },[])

    const allUsers = users.map(user => {
        const userUrl = `/userinfo/${user.user.id}`
        return(
            <tr>
                <td className="Users--td"><a href={userUrl}> {user.user.username}</a></td>
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