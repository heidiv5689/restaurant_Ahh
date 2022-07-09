import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { RestaurantConsumer } from '../../providers/RestaurantProvider';
import Flash from '../shared/Flash';


const RestaurantForm = ({ id, name, image, addRestaurant, setEdit, updateRestaurant,  errors, setErrors }) => {
  const [restaurant, setRestaurant] = useState({ name: '', image: '' })
  

  useEffect( () => {
    if (id) {
      setRestaurant({ name, image })
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (id) {
      updateRestaurant(id, restaurant)
      setEdit(false)
    } else {
      addRestaurant(restaurant)
    }
    setRestaurant({ name:'', image: '' })
  }

  return(
    <>
        { errors ?
        <Flash 
          variant={errors.variant}
          msg={errors.msg}
          setErrors={setErrors}
        />
        : null
      }
       <h1 className='text-center'>
        { id ? 'Update' : 'Create'} Restaurant
      </h1>

    <Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3">
          <Form.Label>Restaurant:</Form.Label>
          <Form.Control
            name='name'
            value={restaurant.name}
            onChange={(e) => setRestaurant({ ...restaurant, name: e.target.value})}
            placeholder="Name"
            required
          />
          </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>image:</Form.Label>
          <Form.Control
            name='image'
            value={restaurant.image}
            onChange={(e) => setRestaurant({ ...restaurant, image: e.target.value})}
            placeholder="image"
            required
          />
          </Form.Group>
          
          <Button variant="primary" type="submit">
          Submit
        </Button>
          </Form>
          
          
      
          
    </>
  )
}

const ConnectedRestaurantForm = (props) => (
  <RestaurantConsumer>
    { value => <RestaurantForm {...props} {...value} /> }
  </RestaurantConsumer>
)

export default ConnectedRestaurantForm;