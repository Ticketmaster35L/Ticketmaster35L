import React, { useState } from 'react';

const Profile = (props) => {
  const [name, setName] = useState("")

  if (props.id !== "")
  {
    console.log("GETTING props.id: " + props.id)
    fetch('/api/user/' + props.id, {
      method: 'GET' })
      .then((res) => res.json().then((json) => {setName(json.name);console.log(json)}))
      .catch((err) => console.error(err))
  }

  return (
    <div>
      {name || "Log In"}
    </div>
  )
}
 
export default Profile;