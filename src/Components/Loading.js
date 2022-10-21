import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

function Loading() {
  return (
    <Spinner animation="border" variant="danger" className='load' role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}


export default Loading;