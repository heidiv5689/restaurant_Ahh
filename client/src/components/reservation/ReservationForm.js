import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ReservationForm = ({ addReservation }) => {
  const [reservation, setReservation] = useState({ timeslot: 'dinner', user_id: 0 })
  const [unenrolled, setUnenrolledUsers] = useState([])

  const { restaurantId } = useParams()

  useEffect( () => {
    axios.get(`/api/restaurants/${restaurantId}/unenrolled`)
      .then( res => setUnenrolledUsers(res.data))
      .catch( err => console.log(err))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setReservation({ ...reservation, user_id: parseInt(reservation.user_id)})
    addReservation(reservation)
    setReservation({ timeslot: 'dinner', user_id: 0 })
  }

  return (
    <>
      <h1>Create Reservation</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Select
            name='timeslot'
            value={reservation.timeslot}
            onChange={(e) => setReservation({ ...reservation, timeslot: e.target.value })}
            required
          >
            <option value="mornings">mornings</option>
            <option value="dinners">dinner</option>
            <option value="brunchs">brunch</option>
            
          </Form.Select>
        </Form.Group>
        
       
        <Form.Group className="mb-3">
          <Form.Select
            name='user_id'
            value={reservation.user_id}
            onChange={(e) => setReservation({ ...reservation, user_id: e.target.value })}
            required
          >
            { unenrolled.map( u => 
              <option value={u.id}>{u.first} {u.last}</option>
            )}
          </Form.Select>
        </Form.Group>
       
       
       
       
       
       
        <Button variant="primary" type="submit">
          Submit
        </Button>



        
      </Form>
    </>
  )
}

export default ReservationForm;