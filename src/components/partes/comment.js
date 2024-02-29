import React from "react";
import Card from "react-bootstrap/Card";
import "./comment.css";

class Comment extends React.Component {
  render() {
    return (
      <Card border="warning" className="cardC" style={{ width: "13rem" }}>
        <Card.Body>
          <Card.Text>
            Some quick example text to build on the card title.
            Some quick example text to build on the card title.
          </Card.Text>
          <Card.Title style={{borderTop:"1px solid gray",paddingTop:"10px", marginBottom:"-10px"}}>{this.props.title}</Card.Title>
        </Card.Body>
      </Card>
    );
  }
}

export default Comment;
