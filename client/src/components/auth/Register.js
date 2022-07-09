import { useState } from 'react';
import { AuthConsumer } from '../../providers/AuthProvider';
import Flash from '../shared/Flash';

const Register = ({ handleRegister, errors, setErrors }) => {
  const [user, setUser] = useState({ email: '', password: '', passwordConfirmation: '', first: '', last: '', image: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (user.password === user.passwordConfirmation) {
      handleRegister(user)
      setUser({ email: '', password: '', passwordConfirmation: '', first: '', last: '', image: '' })
    } else {
      alert('Password does not match!')
    }
  }

  return (
    <>
      { errors ?
        <Flash 
          variant={errors.variant}
          msg={errors.msg}
          setErrors={setErrors}
        />
        :
        null
      }
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input 
          name='email'
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          type='email'
          required
        />
        <label>First Name</label>
        <input 
          name='first'
          value={user.first}
          onChange={(e) => setUser({ ...user, first: e.target.value })}
          required
        />
        <label>Last Name</label>
        <input 
          name='last'
          value={user.last}
          onChange={(e) => setUser({ ...user, last: e.target.value })}
          required
        />
        <label>Profile Image</label>
        <input 
          name='image'
          value={user.image}
          onChange={(e) => setUser({ ...user, image: e.target.value })}
          required
        />
        <label>Password</label>
        <input 
          name='password'
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          type='password'
          required
        />
        <label>Password Confirmation</label>
        <input 
          name='passwordConfirmation'
          value={user.passwordConfirmation}
          onChange={(e) => setUser({ ...user, passwordConfirmation: e.target.value })}
          type='password'
          required
        />
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

const ConnectedRegister = (props) => (
  <AuthConsumer>
    { value => <Register {...props} {...value} />}
  </AuthConsumer>
)

export default ConnectedRegister;
