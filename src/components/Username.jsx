import React, { useState } from 'react';

const Username = (props) => {
  const [name, setName] = useState("")

  if (props.id && props.id !== "") {
    console.log("FETCHING!!!")
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
  } else {
    if (name)
      setName(null)
  }

  return (
    <div>
      {name || "Log In"}
    </div>
  )
}
 
export default Username;