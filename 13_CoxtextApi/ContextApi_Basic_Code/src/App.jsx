import './App.css'
import Login from './conponents/LogIn'
import Profile from './conponents/Profile'
import UserContextProvider from './context/UserContextProvider'

function App() {
  

  return (
    <UserContextProvider>
      <h1>React with Chai and share is important</h1>
      <Login />
      <Profile />
    </UserContextProvider>
  )
}

export default App


// In the main App file, you wrap the Login and Profile components inside the UserContextProvider.
// Because they are inside the Provider, both Login and Profile now have access to the global "user" state.
// When you log in using the Login component, it updates the global user state.