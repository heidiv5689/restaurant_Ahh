import { ListGroup } from 'react-bootstrap';
import Reservation from './Reservation';

const ReservationList = ({ reservations, enrolledUsers }) => (
  <>
    <ListGroup variant="flush">
      { reservations.map( e => 
        <Reservation 
          key={e.id}
          {...e}
          enrolledUsers={enrolledUsers}
        />
      )}
    </ListGroup>
  </>
)

export default ReservationList;