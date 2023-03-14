import React, { useState } from 'react';
import { useLocalStorage } from "./useLocalStorage";

const Profile = () => {
  const [id, setId] = useLocalStorage("userId", "");
  const [name, setName] = useState("")

  if (id !== "")
  {
    console.log("GETTING ID")
    fetch('/api/user/' + id, {
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