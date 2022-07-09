import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Modal, Button, Image, CardGroup } from 'react-bootstrap';
import { RestaurantConsumer } from '../../providers/RestaurantProvider';
import { useParams, Link } from 'react-router-dom';

import RestaurantForm from './RestaurantForm'

const Restaurant = ({ id, deleteRestaurant, updateRestaurant, errors, setErrors}) => {
  const [show, setShow] = useState(false)

  const [editing, setEdit] = useState(false)

  const [restaurant, setRestaurant] = useState({ name: '', image: '' })
  const { name, last, image, speciality} = restaurant
  const [restaurantUsers, setRestaurantUsers] = useState([])
  
  useEffect( () => {
    axios.get(`/api/restaurants/${id}`)
      .then( res => setRestaurant(res.data) )
      .catch( err => console.log(err) )
  }, [])


  useEffect( () => {
    axios.get(`/api/restaurants/${id}/restaurantUsers`)
      .then( res => setRestaurantUsers(res.data) )
      .catch( err => console.log(err) )
  }, [])

  return(
  <Container>
      

  <Card>
    <Card.Img variant="top" src={image} />
    <Card.Body>
    <Button onClick={()=> setShow(true)}>Edit</Button>
      <Button onClick={() => deleteRestaurant(id)}>Delete</Button>
      <Card.Title>Restaurant: {name} 
      <Link
        to={`/${id}/reservations`}
        state={
          { restaurantFirst:  name }
        }
      >

      <Button>Reservations</Button>
      </Link>
      </Card.Title>
      <Card.Text>
        This is a wider card.
        <h4> All of {name} Reservations </h4>
        <Container>
            <Row xs={1} md={3} className="g-4">
            {restaurantUsers.map( cu => 
            <CardGroup>
            
            <Card>
              <Card.Img variant="top" src="holder.js/100px160" />
              <Card.Body>
                <Card.Title>{cu.first} {cu.last}</Card.Title>
                <Card.Text>
                Phone: {cu.phone}
                  
                </Card.Text>
              
              </Card.Body>
              
            </Card>


            </CardGroup>
            )}
            </Row>
            </Container>
        
      </Card.Text>
    
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