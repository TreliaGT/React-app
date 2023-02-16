import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from 'html-react-parser';


function CoursePost() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const { id } = useParams();
   
  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/courses/1/" + id)
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
        <section className="container col-xxl-8 px-4 py-5">
            <div className="row flex-lg-row-reverse  g-5 py-5">
                <div className="col-10 col-sm-8 col-lg-6">
                    <img  src={"http://127.0.0.1:8000" + items.img_url} alt="course" className="d-block mx-lg-auto img-fluid" />
                </div>
                <div className="col-lg-6">
                    <h1 className="display-5 fw-bold lh-1 mb-3">{items.name}</h1>
                    <strong>Date : {items.start_date} - {items.end_date}</strong>
                    <div className="lead">{parse(items.description)}</div>
                </div>
            </div>
        </section>
    );
  }
}
export default CoursePost;