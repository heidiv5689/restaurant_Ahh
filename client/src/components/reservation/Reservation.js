import { ListGroup } from "react-bootstrap";

const Reservation = ({ name, timeslot, user_id, restaurant_id, enrolledUsers}) => {

  const displayFullName = (id) => {
    let fullName = ''
    enrolledUsers.map( u => {
      if (u.id === id) {
        fullName = u.first + " " + u.last 
      }
    })
    return fullName
  }

  return (
    <>
      <ListGroup.Item>
        {displayFullName(user_id)}
        <h2> displayFullName ??? not sure </h2>
        <button>edit</button>
        <button>delete</button>
      </ListGroup.Item>
    </>
  )
}

export default Reservation;