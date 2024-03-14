import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


class Product extends React.Component{
    render(){
        return(
            <Card className='cardP' style={{ width: '16rem' }}>
                <Card.Img className='img' variant="top" src={this.props.src} />
                <Card.Body>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Text>
                        Price: {this.props.price}$
                    </Card.Text>
                    <Button variant="" className='btn-outline-orange'>buy now</Button>
                </Card.Body>
            </Card>
        )
    }
}
export default Product;
