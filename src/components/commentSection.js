import React from 'react'
import Comment from './partes/comment';
import './commentSection.css';
const Comments = () => {
  return (
    <div id='feed' className='mt-5'>
        <div className='title mb-4'>WHAT OUR CUSTOMERS THINK</div>
        <div className='row'>
            <Comment title='ABDERRAHMENE'/>
            <Comment title='ABDELBASET'/>
            <Comment title='WASSIM'/>
            <Comment title="LILIA (WASSIM's wife)"/>
            <Comment title="RAHMA (ABDELBASET's wife)"/>
        </div>
    </div>
  )
}

export default Comments;
