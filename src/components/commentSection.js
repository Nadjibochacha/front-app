import React, { useEffect, useState } from 'react'
import Comment from './partes/comment';
import './commentSection.css';
import axios from 'axios';
const Comments = () => {
  const [comments, setComments] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:3006/commants')
    .then(res=>setComments(res.data))
    .catch(err=>console.log(err))
  },[comments])
  return (
    <div id='feed' className='container mt-5'>
        <div className='title mb-4'>WHAT OUR CUSTOMERS THINK</div>
        <div className='row '>
          {
            comments.map(comment=>(
              <Comment title={comment.name} comment={comment.comment}/>
            ))
          }
        </div>
    </div>
  )
}

export default Comments;
