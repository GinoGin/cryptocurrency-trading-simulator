import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, ListGroup, Nav, Navbar, NavbarBrand} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'



const Dashboard = () => {
  const navigate = useNavigate();
  const [data,setData] = useState([])
  const [name,setName] =useState(JSON.parse(localStorage.getItem("user")).username)
  const [usrValue,setUsrValue] = useState(0)

  
  useEffect(()=>{
    async function  fetchBalance(){
      await axios.post('http://localhost:8080/user/balance',{username:name})
      .then((response)=>{
        console.log(response.data);
        setData(response.data)
        
      })
      
    }

    async function fetchUserValue(){
      await axios.post("http://localhost:8080/user/value",{username:name})
      .then((response)=>{
          console.log(response);
          setUsrValue(response.data.userValue)
      })
    }

    fetchBalance();
    fetchUserValue()
    
  
  },[])
  

  const handleLogout=()=>{
    localStorage.removeItem("user")
    navigate("/login")
  }

  

  return (
    <div>
      <Navbar className="z-100 bg-dark" id="navbar">
          <NavbarBrand >
            
          </NavbarBrand>
          <Nav className="mr-auto w-100">
            <Button className="w-15 mx-5">
              <nav>
                <Link to="/" element={<Dashboard/>} />
              </nav>
              Dashboard
            </Button>
            
          </Nav>
          <h1 className='text-light mx-4'>{name}</h1>
          <Navbar.Text className="w-20 text-light mr-2">
            Your Balance:
          </Navbar.Text>
          <Navbar.Text className="text-light mr-4 mx-4">
            ${data.balance}
          </Navbar.Text>
          <Button 
            onClick={handleLogout}
            className="w-15 mx-4" >
            Logout
          </Button>
        </Navbar>
        
          <h3 className="text-center mt-3  pb-0">
                Total Value: ${(usrValue).toFixed(2)}
          </h3>
        
       
          <Col  lg="12" className="h-100 m-0 p-0 py-2 px-2">
            <div
              className="rounded w-100 h-100"
              style={{ border: "2px solid grey" }}
            >
              <Card className="h-100 bg-light">
                <Card.Body className="h-12">
                  <Card.Title className="text-center">
                    
                    <h3>Available Coins</h3>
                  </Card.Title>
                </Card.Body>
                <ListGroup variant="flush" className="h-75">
                  <ListGroup.Item
                    
                    className=" py-4  text-light bg-dark d-inline d-flex flex-row justify-content-center"
                  > 
                    <div className="h5 d-inline col-lg-4 d-flex justify-content-center">01 </div>

                    <div className="h5 w-20  d-inline d-flex col-lg-4 justify-content-center" >
                      {" "}
                      <nav>
                        <Link to={`/coin/${"tether"}`}>
                      
                      Tether</Link></nav> <span className="text-secondary mx-5 d-inline  ">USDT</span>
                    </div>
                    <div className="h5 d-inline float-right col-lg-4">
                      ${data.tether}
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item
                    
                    className=" py-4  text-light bg-dark justify-content-center d-flex"
                  >
                    <div className="h5  d-inline col-lg-4 d-flex justify-content-center">02 </div>
                    <div className="h5 w-20  d-inline d-flex col-lg-4 justify-content-center">
                      {" "}
                      <nav>
                        <Link to={`/coin/${"bitcoin"}`}>
                      Bitcoin </Link></nav><span className="text-secondary mx-5 d-inline">BTC</span>
                    </div>
                    <div className="h5 d-inline float-right col-lg-4">
                      ${data.bitcoin}
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item
                   
                    className="h-9 py-4   text-light bg-dark justify-content-center d-flex"
                  >
                    <div className="h5 d-inline col-lg-4 justify-content-center d-flex">03 </div>
                    
                    <div className="h5 w-10  d-inline d-flex col-lg-4 justify-content-center">
                      {" "}
                      <nav>
                        <Link to={`/coin/${"shiba"}`}>
                      Shiba</Link></nav> <span className="text-secondary mx-5">SHIB</span>
                    </div>
                    <div className="h5 d-inline float-right col-lg-4">
                      ${data.shiba}
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item
                    className="h-9 py-4  text-light bg-dark justify-content-center d-flex"
                  >
                    <div className="h5 d-inline d-flex col-lg-4 justify-content-center">04 </div>
                    <div className="h5 w-10 d-inline d-flex col-lg-4 justify-content-center">
                      {" "}
                      <nav>
                        <Link to={`/coin/${"ethereum"}`}>
                      Ethereum</Link></nav> <span className="text-secondary mx-5">ETH</span>
                    </div>
                    <div className="h5 d-inline float-right col-lg-4">
                      ${data.ethereum}
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item

                    className="h-9 py-4 text-center text-light bg-dark justify-content-center d-flex"
                  >
                    <div className="h5 d-inline col-lg-4">05 </div>
                    
                    <div className="h5 w-10  d-inline d-flex col-lg-4 justify-content-center">
                      {" "}
                      <nav>
                        <Link to={`/coin/${"solana"}`}>
                      Solana</Link></nav> <span className="text-secondary mx-5">SOL</span>
                    </div>
                    <div className="h5 d-inline d-flex float-right col-lg-4">
                      ${data.solana}
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item
                    className="h-9 py-4  text-light bg-dark justify-content-center d-flex"
                  >
                    <div className="h5 d-inline d-flex col-lg-4 justify-content-center">06 </div>
                    
                    <div className="h5 w-10 d-inline  d-flex col-lg-4 justify-content-center">
                      {" "}
                      <nav>
                        <Link to={`/coin/${"xrp"}`}>
                      Xrp</Link></nav> <span className="text-secondary mx-5">XRP</span>
                    </div>
                    <div className="h5 d-inline float-right col-lg-4">
                      ${data.xrp}
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item
         
                    className="h-9 py-4  text-light bg-dark justify-content-center d-flex"
                  >
                    <div className="h5 d-inline d-flex col-lg-4 justify-content-center">07 </div>
                    
                    <div className="h5 w-10 d-inline  d-flex col-lg-4 justify-content-center">
                      {" "}
                      <nav>
                        <Link to={`/coin/${"dogecoin"}`}>
                      DogeCoin</Link></nav> <span className="text-secondary mx-5">doge</span>
                    </div>
                    <div className="h5 d-inline float-right col-lg-4">
                      ${data.dogecoin}
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item
                 
                    className="h-9 py-4  text-light bg-dark justify-content-center d-flex"
                  >
                    <div className="h5 d-inline d-flex col-lg-4 justify-content-center" >08 </div>
                  
                    <div className="h5 w-10 d-inline  d-flex col-lg-4 justify-content-center">
                      {" "}
                      <nav>
                        <Link to={`/coin/${"sandbox"}`}>
                      Sandbox</Link></nav> <span className="text-secondary mx-5">SAND</span>
                    </div>
                    <div className="h5 d-inline float-right col-lg-4">
                      ${data.sandbox}
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item
                   
                    className="h-9 py-4  text-light bg-dark d-flex justify-content-center"
                  >
                    <div className="h5 d-inline d-flex justify-content-center col-lg-4">09 </div>
                  
                    <div className="h5 w-10 d-inline col-lg-4 d-flex justify-content-center">
                      {" "}
                      <nav>
                        <Link to={`/coin/${"tron"}`}>
                      Tron</Link></nav> <span className="text-secondary mx-5 ">trx</span>
                    </div>
                    <div className="h5 d-inline float-right col-lg-4">
                      ${data.tron}
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item
                    
                    className="h-9 py-4  text-light bg-dark justify-content-center d-flex "
                  >
                    <div className="h5 w-10 d-inline d-flex justify-content-center col-lg-4">10 </div>     
                    <div className="h5 w-10 d-inline  d-flex col-lg-4 justify-content-center">
                      {" "}
                      <nav>
                        <Link to={`/coin/${"cardano"}`}>
                      Cardano</Link></nav> <span className="text-secondary mx-5 d-inline ">ALD</span>
                    </div>
                    <div className="h5 d-inline float-right col-lg-4">
                      ${data.cardano}
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className="h-10 py-4 text-center d-flex justify-content-center  bg-light">
                    more coins coming soon...
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </div>
          </Col>
          
    </div>
  )
}

export default Dashboard
