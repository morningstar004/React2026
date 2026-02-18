import React from 'react'
import {Container , Logo , LogoutBtn} from "../components/index";
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const authStatus = useSelector(() => {
    state.auth.status
  })

  const Navigate = useNavigate()

  const navItems = [
    {
      name: "Home",
      slug: '/',
      active: true
    },
    {
      name: "Login",
      slug: '/login',
      active: !authStatus
    },
    {
      name: "SignUp",
      slug: '/signup',
      active: !authStatus
    },
    {
      name: "All Post",
      slug: '/all-post',
      active: !authStatus
    },{
      name:"Add Post",
      slug:'/add-post',
      active: !authStatus
    },

  ]
  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4 '> 
            <Link to='/'>
              <Logo width='70px'> 

              </Logo>
            </Link>
          </div>
          ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
