import React from "react";
import Card from "react-bootstrap/Card";
import "./comment.css";

class Comment extends React.Component {
  render() {
    return (
      <Card border="warning" className="cardC" style={{ width: "13rem" }}>
        <Card.Body>
          <Card.Title>{this.props.title}</Card.Title>
          
          <Card.Text>
            Some quick example text to build on the card title.
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default Comment;
