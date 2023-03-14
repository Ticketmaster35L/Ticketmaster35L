import React, { useState } from 'react';
import { useLocalStorage } from "./useLocalStorage";

const Profile = () => {
  const [id, setId] = useLocalStorage("userId", "");
  const [name, setName] = useState("")

  if (id !== "")
  {
    fetch('/api/user/' + id, {
      method: 'GET' })
      .then((res) => setName(res.body.name || ""))
      .catch((err) => console.error(err))
  }

  return (
    <div>
      {name || "Log In"}
    </div>
  )
}
 
export default Profile;