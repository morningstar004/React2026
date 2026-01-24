import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createElement } from 'react'


function myApp(){
  return(
    <div>
      <h2>Custom Rendering using react</h2>
    </div>
  )
}//we can reder this function under render block
 
const anotherElement = (
  <a href="github.com">click to rediret to github</a>
)

//that how react compiles our jsx code to convert it later into js and html...
const customElement = createElement(
  'a',//1st : tag type
  {href: 'https://google.com',target: '_blank'},//2nd : attributes under a object
  'click me to redirect to google',//3rd innertext
  anotherElement,//variable inserted
)

const myAppAsreactCode = createElement(
  'h2',
  {},
  'Custom Rendering using react'
)

//renderBlock
createRoot(document.getElementById('root')).render(
  //there was strict tag rapping around App component but its not inportant and we do not need that
    // <App />
    // customElement,  
    myAppAsreactCode,  
)
