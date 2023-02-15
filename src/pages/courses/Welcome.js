import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Welcome() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

   
  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    console.log(process.env.CENTRE_ID);
    fetch("http://127.0.0.1:8000/api/courses/1")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <section className="container mt-2">
        <div className="row row-cols-1 row-cols-md-4">
          {items.map(item => (
            <div  className="card border-0 shadow" key={item.id}> 
                <img  src={"http://127.0.0.1:8000" + item.img_url} className="card-img-top w-100" />
                <div className="card-body">
                  <h5 className="card-title"> {item.name}</h5>
                  <p className="card-text">{item.short_description}</p>
                  <Link to={"/courses/"  + item.id} className="btn btn-primary">Read More</Link>
                </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

export default Welcome;