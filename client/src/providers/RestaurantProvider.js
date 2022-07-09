import React, { useState, useEffect } from 'react';
import axios from 'axios';
// allow to go to another page after an action is done
import { useNavigate } from 'react-router-dom';

export const RestaurantContext = React.createContext()

export const RestaurantConsumer = RestaurantContext.Consumer;

const RestaurantProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([])

  const navigate = useNavigate()

  const getAllRestaurants = () => {
    axios.get('/api/restaurants')
      .then( res => setRestaurants(res.data) )
      .catch( err => {
        console.log(err)
       
      })
  }

  useEffect( () => {
    axios.get('/api/restaurants')
      .then( res => {
        setRestaurants(res.data)
      })
      .catch( err => console.log(err) )
  }, [])

  const addRestaurant = (restaurant) => {
    axios.post('/api/restaurants', { restaurant })
      .then(res => {
        setRestaurants([...restaurants, res.data])
      })
      .catch( err => console.log(err) )
  }

  const updateRestaurant = (id, restaurant) => {
    axios.put(`/api/restaurants/${id}`, { restaurant })
      .then( res => {
        let newUpdatedRestaurants = restaurants.map( c => {
          if (c.id === id) {
            return res.data 
          }
          return c
        })
        setRestaurants(newUpdatedRestaurants)
        navigate('/restaurants')
        window.location.reload()
      })
      .catch( err => console.log(err) )
  }

  const deleteRestaurant = (id) => {
    axios.delete(`/api/restaurants/${id}`)
      .then(res => {
        setRestaurants(restaurants.filter( c => c.id !== id ))
        navigate('/restaurants')
        window.location.reload()
      })
      .catch( err => console.log(err) )
  }


  return (
    <RestaurantContext.Provider value={{
      restaurants,
      getAllRestaurants,
      addRestaurant,
      updateRestaurant,
      deleteRestaurant
    }}>
      { children }
    </RestaurantContext.Provider>
  )
}

export default RestaurantProvider;