import { useState} from 'react';
import { Container, Row, Col, Card, Modal, Button, Image } from 'react-bootstrap';
import { RestaurantConsumer } from '../../providers/RestaurantProvider';

import RestaurantForm from './RestaurantForm'

const Restaurant = ({ id, name, image, deleteRestaurant, updateRestaurant, errors, setErrors}) => {
  const [show, setShow] = useState(false)

  const [editing, setEdit] = useState(false)



  return(
  <Container>
      

  <Card>
    <Card.Img variant="top" src={image} />
    <Card.Body>
      <Card.Title>Restaurant: {name}</Card.Title>
      <Card.Text>
        This is a wider card.
        
      </Card.Text>
      <Button onClick={()=> setShow(true)}>Edit</Button>
      <Button onClick={() => deleteRestaurant(id)}>Delete</Button>
    </Card.Body>
   
  </Card>
     
     
     
      <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
      <h1>Restaurant: {name}</h1>
      </Modal.Header>
      <Modal.Body>
        
      <Container>
      
      <Row>
        <Col>
        <Image src={image} style={{width: 200}}/>
        </Col>
        <Col>
        <RestaurantForm 
            id={id}
            name={name}
            
            image={image}
            
            setEdit={setEdit}
            updateRestaurant={updateRestaurant}
          />
        </Col>
      </Row>


      
      </Container>

      </Modal.Body>
      </Modal> 

     
  </Container>
  )
}

const ConnectedRestaurant = (props) => (
  <RestaurantConsumer>
    { value => <Restaurant {...props} {...value}/>}
  </RestaurantConsumer>
)

export default ConnectedRestaurant;