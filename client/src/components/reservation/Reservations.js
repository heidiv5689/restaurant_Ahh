import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReservationForm from './ReservationForm';
import ReservationList from './ReservationsList';

import { Modal, Button } from 'react-bootstrap';

const Reservations = () => {
  const [reservations, setReservations] = useState([])
  const [mornings, setMornings] = useState([])
  const [brunchs, setBrunchs] = useState([])
  const [dinners, setDinners] = useState([])

  const [patients, setPatients] = useState([])

  const [enrolledUsers, setEnrolledUsers] = useState([])
  const [adding, setAdd] = useState(false)

  const { restaurantId } = useParams()
  const location = useLocation()
  const { restaurantTitle } = location.state

  useEffect( () => {
    axios.get(`/api/restaurants/${restaurantId}/reservations`)
      .then( res => {
        setReservations(res.data)
       
        setMornings(res.data.mornings)
        setBrunchs(res.data.brunchs)
        setDinners(res.data.dinners)
      })
      .catch( err => console.log(err))
  }, [])

  useEffect( () => {
    axios.get(`/api/restaurants/${restaurantId}/enrolled`)
      .then(res => {
        setEnrolledUsers(res.data)
      })
      .catch( err => console.log(err))
  }, [])

  const whichTimeslot = (enroll) => {
    const { timeslot } = enroll
    switch(timeslot) {
      case 'morning':
        setMornings([...mornings, enroll])
        break
      case 'Brunch':
        setBrunchs([...brunchs, enroll])
        break
      default:
        setDinners([...dinners, enroll])
    }
  }

  const addReservation = (reservation) => {
    axios.post(`/api/restaurants/${restaurantId}/reservations`, { reservation })
      .then( res => {
        whichTimeslot(res.data)
      })
      .catch( err => console.log(err))
  }

  return(
    <>
    <Button>+</Button>

    <ReservationForm 
            addReservation={addReservation} 
          />

    <h2>All Reservation for -{restaurantTitle}--- </h2>
    

    <h3> Reservations Mornings </h3>
    <ReservationList 
    reservations={mornings}
    enrolledUsers={enrolledUsers}
    />
     <br />
    <h3> Reservations Brunch </h3>
    <ReservationList 
    reservations={brunchs}
    enrolledUsers={enrolledUsers}
    />
    <br />
   
    <h3> Reservations Dinner </h3>
    <ReservationList 
    reservations={dinners}
    enrolledUsers={enrolledUsers}
    />

    </>
  )
}

export default Reservations;