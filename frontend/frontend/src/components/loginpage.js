import { Button, Card, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Nav } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'



const Loginpage = () => {

  const navigate = useNavigate();

  const [name,setName] = useState("")
  const [password,setPassword]= useState('')
  const [isLogged,setIsLogged] = useState(false)

  useEffect(()=>{
      if(localStorage.getItem('user')){
        navigate('/')
      }
  },[isLogged])

  const onChangeUsername =(e)=>{
      setName(e.target.value)
  }
  const onChangePassWord =(e)=>{
    setPassword(e.target.value)
  }
  const handleLogin =async ()=>{
      await axios.post('http://localhost:8080/auth/signin',
      {
        username:name,
        password:password
      }
      ).then((response)=>{
        console.log(response);
        localStorage.setItem('user',JSON.stringify(response.data))
        setIsLogged(true)
      })
  }

  return (
    <div className='row my-4'>
      <div className='col-lg-12 d-flex justify-content-center '>
      <Card className='px-4 col-4 bg-light justify-content-center text-center' sx={{ minWidth: 275, minHeight:250 }}>
      <TextField id="outlined-basic" onChange={onChangeUsername} className='my-4' label="username" variant="outlined" /><br/>
      <TextField id="outlined-basic" onChange={onChangePassWord} className='my-4' label="password" variant="outlined" /><br/>
      <Button variant="contained" onClick={handleLogin} >Login</Button>
      <Nav className="justify-content-center">
                  <Nav.Item>
                    <Nav.Link disabled>Not registered yet?</Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="ml-n4 my-2">
                    <nav>
                      <Link to="/register">Register</Link>
                    </nav>
                  </Nav.Item>
                </Nav>
      </Card>
    </div>
    </div>
    
        
                
      
  )
}

export default Loginpage
