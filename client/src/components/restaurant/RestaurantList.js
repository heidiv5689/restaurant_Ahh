import { Container, Row} from "react-bootstrap";
import Restaurant from './Restaurant';
import Flash from '../shared/Flash';


const RestaurantList = ({restaurants, errors, setErrors}) => (
  
 <Container>
 { errors ?
        <Flash 
          variant={errors.variant}
          msg={errors.msg}
          setErrors={setErrors}
        />
        : null
      }
  <h1>All Restaurants </h1>
  <Row lg={4}>
      { restaurants.map( r => 
        <Restaurant key={r.id} {...r}/>
        )}
        
  </Row>
 
  </Container>
  
  
)

export default RestaurantList;