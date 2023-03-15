import React, { useState } from 'react';

const Username = (props) => {
  const [name, setName] = useState("")

  if (props.id !== "")
  {
    console.log("GETTING props.id: " + props.id)
    fetch('/api/user/' + props.id, {
      method: 'GET' })
      .then((res) => res.text().then((text) => {
        let json = {}
        try {
          json = JSON.parse(text)
        } catch { }
        if (json.id)
        {
          setName(json.name)
          console.log(json)
        }
        else if (json.err)
        {
          console.error('json.err: ' + json.err)
        }
        else
        {
          console.error('text: ' + text)
          console.error('json: ' + json)
        }
      }),
        (err) => alert(err))
      .catch((err) => console.error('catch: ' + err))
  }

  return (
    <div>
      {name || "Log In"}
    </div>
  )
}
 
export default Username;