import React, {useContext} from 'react'
import UserContext from '../context/userContext'

function Profile() {
    const {user} = useContext(UserContext)
    
    if (!user) return <div>please login</div>

    return <div>Welcome {user.username}</div>
}

export default Profile;

// This component is the Data Consumer.
// It asks the Context for the user data.
// Conditional Rendering: It checks if the user exists.
// If the bucket is empty (null), it shows "please login".
// As soon as the user clicks submit in the Login component, this component automatically detects the change and displays "Welcome [username]".