import { useEffect, useState, } from 'react';
import RestaurantList from './RestaurantList';
import RestaurantForm from './RestaurantForm';

// import { Button, Modal, Container } from 'react-bootstrap';

import { RestaurantConsumer } from '../../providers/RestaurantProvider';

const Restaurants = ({ restaurants, getAllRestaurants, errors, setErrors, addRestaurant }) => {

  useEffect( () => {
    getAllRestaurants()
  }, [])


  return(
    <>
    <h1>Restaurants!!!!!!!</h1>

    <RestaurantForm
    addRestaurant={addRestaurant}

    />

    <RestaurantList
    restaurants={restaurants}
    />

    </>
  )
}

const ConnectedRestaurants = (props) => (
  <RestaurantConsumer>
    { value => <Restaurants {...props} {...value}/>}
  </RestaurantConsumer>
)
export default ConnectedRestaurants;