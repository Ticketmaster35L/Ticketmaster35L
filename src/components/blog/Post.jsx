import React, { useEffect } from "react";
import { useParams } from "react-router";
import {useState} from 'react'
function Post() {
  let { postSlug } = useParams();
  const [ticket, setTicket] = useState({})
  useEffect(() => {
    // Fetch post using the postSlug
    fetch('/api/ticket/'+postSlug).then((response) => response.json())
    .then((ticket)=> {
      /*I'll let you figure out how to handle this, but data here is a dictionairy with every id of the ticket
      as keys and the ticket object as values.Proccess and add to the table as you need!*/
      // setTicket(ticket)
      console.log(ticket)
      setTicket(ticket)
    })

  }, [postSlug]);

  return (
    <div className="home">
      <div class="container">
        <h1 className="mt-5">This is a Post Title</h1>
        <h6 className="mb-5">The post slug is,{ticket.name}</h6>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
    </div>
  );
}

export default Post;
