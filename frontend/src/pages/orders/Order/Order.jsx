import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GigsList = () => {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/gigs') // get resq to backend fetch the gig
      .then(res => setGigs(res.data)) // storing response in setGigs 
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Gigs</h1>
      <div>
        {gigs.map((gig) => (
          <div key={gig._id} style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
            <h2>{gig.title}</h2>
            <p>{gig.shortDesc}</p>
            <p>Category: {gig.cat}</p>
            <p>Price: Rs{gig.price}</p>
            <p>Delivery Time: {gig.deliveryTime} days</p>
            {gig.cover && <img src={gig.cover} alt="cover" style={{ width: '200px' }} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GigsList;
