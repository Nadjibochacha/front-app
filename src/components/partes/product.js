import React from 'react';
import './product.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class Product extends React.Component {
    render() {
        return (
            <Card className='cardP' style={{ width: '16rem' }}>
                {this.props.state === 'new' ? (
                    <div style={{boxShadow:'0 0 7px blue'}} className='sticker' >new</div>
                ) : (
                    <div style={{boxShadow: '0 0 5px red'}} className='sticker bg-danger'>{this.props.state}</div>
                )}
                <Card.Img className='img' variant="top" src={this.props.src} />
                <Card.Body>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Text>
                        Price: {this.props.price} DA 
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}


export default Product;
