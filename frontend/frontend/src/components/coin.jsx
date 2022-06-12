import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Nav, Navbar, Row, Table } from 'react-bootstrap'
import { Link, useParams, useNavigate} from 'react-router-dom'
import ReactTradingviewWidget from 'react-tradingview-widget'


const Coin = () => {
  const {coin} = useParams()
    console.log(coin);
  const navigate = useNavigate();
  const [name,setName] = useState(JSON.parse(localStorage.getItem("user")).username)
  const [price,setPrice]=useState('')
  const [changeH,setChangeH] = useState(0)
  const [changeD,setChangeD] = useState(0)
  const [changeW,setChangeW] = useState(0)
  const [balance,setBalance] = useState(0)
  const [currentCoinPrice,setCurrentCoinPrice] = useState(0)
  const [coinSymbol,setCoinSymbol] = useState('')
  const [currCoin,setCurrCoin] = useState(coin)
  const [inputUSD,setInputUSD] = useState()
  const [inputCoin,setInputCoin] = useState()
  const [toggle,setToggle] = useState(true)
  const [buySuccess,setBuySuccess] = useState(false)
  const [sellSuccess,setSellSuccess] = useState(false)
  const [coinsBuyed,setCoinsBuyed] = useState()
  const [coinsSold,setCoinsSold] = useState()
    
    useEffect(()=>{
      const fetchPrice =async()=>{
        await axios.get(`http://localhost:8080/exchange/price/${coin}`)
        .then((response)=>{
          console.log(response);
          setPrice(response.data[0].price_usd)
          setChangeH(response.data[0].percent_change_1h)
          setChangeD(response.data[0].percent_change_24h)
          setChangeW(response.data[0].percent_change_7d)
          setCoinSymbol(response.data[0].symbol)
          
        })
        .catch((err)=>{
          console.log("error");
        })
      }
      const fetchBalance= async()=>{
        await axios.post("http://localhost:8080/user/balance",{username:name})
        .then((response)=>{
          setBalance(response.data)
          setCurrCoin(response.data[coin])
          console.log(response.data);
        })
        .catch((err)=>{
          console.log("error");
        })
      }

      fetchPrice()
      fetchBalance()
    },[toggle]);
    
    const onChangeCoin=(e)=>{
      setInputCoin(e.target.value)
      document.getElementById("inUSD").value=(
        price*document.getElementById("inCoin").value
      ).toFixed(2)
    }

    const onChangeUSD=(e)=>{
      setInputUSD(e.target.value)
      document.getElementById("inCoin").value=(
        (1/price) * document.getElementById("inUSD").value
      ).toFixed(5)
    }

    const handleBuy =async()=>{

        await axios.post("http://localhost:8080/user/buy",{
          username:name,
          coin:coin,
          value:inputUSD
        })
        .then((response)=>{
          setBuySuccess(true)
          setCoinsBuyed(response.data.coinBought)
          console.log(response);
          setToggle(!toggle)
        })
        .catch((err)=>{
          console.log(err);
        })
    }

    const handleSell =async()=>{
      await axios.post("http://localhost:8080/user/sell",{
        username:name,
        coin:coin,
        value:inputUSD
      })
      .then((response)=>{
        setSellSuccess(true)
        setCoinsSold(response.data.coinsSold)
        console.log(response.data);
        setToggle(!toggle)
      })
      .catch((err)=>{
        console.log(err);
      })
    }

    

   function getSymbolFromName(coin){
      const symbols ={
            tether : "usdt",
            bitcoin : "btc",
            shiba :"shib",
            ethereum :"eth",
            solana :"sol",
            xrp :"xrp",
            dogecoin :"doge",
            sandbox :"sand",
            tron : "trx",
            cardano :"ada"
      }
      return symbols[coin]
    }
    
  return (
    <div>
      <Container fluid>
      <Navbar className="z-100 bg-light" id="navbar">
          <Navbar.Brand >
            <img  src={""} alt="" />
          </Navbar.Brand>
          <Nav className="mr-auto w-100">
            <Button 
              onClick={()=>navigate('/')}
             className="w-15 mx-4">
              
              dashboard
            </Button>
            
          </Nav>
          <Navbar.Text className=" text-dark ">
            Your Balance:
          </Navbar.Text>
          <Navbar.Text className="text-dark mr-4 mx-4">
            ${balance.balance}
          </Navbar.Text>
          <Button
            onClick={()=>{
              localStorage.removeItem("user")
              navigate("/login")
            }}
           className="w-15 mx-lg-3" >
            Logout
          </Button>
        </Navbar>
        <Row 
          style={{
            height: "calc(100vh - 76px)",
            marginBottom: "0px",
            margin: "0",
            padding: "0",
          }}
        >

      <Col lg="8" md="8" className="h-100 m-0 p-0  bg-dark">
      <div className="rounded w-100 h-100"
              style={{ border: "2px solid grey" }}
        >
      <ReactTradingviewWidget
        autosize
        symbol={getSymbolFromName(coin)+'USD'}
        interval="5"
        timezone="Europe/Berlin"
        theme="Light"
        locale="de_DE"
        toolbar_bg="#f1f3f6"
        //hide_top_toolbar
      />
      </div>
      </Col>
      <Col lg='4'  className="h-100 m-0 p-0 pr-2 py-2 px-2 ">
            <div
              className=""
              // style={{ backgroundColor: "#131821", border: "2px solid grey" }}
            >
              {/* <div className="h-100 w-25 d-flex justify-content-center align-items-center">
                
              </div> */}
              <div className="h-100 w-100  align-items-start ">
                <div className="">
                  <h5 className="text-center">
                    {coin}{" :: "}
                    <span className="text-secondary">
                     {coinSymbol}
                    </span>
                  </h5>
                  
                </div>
              </div>
            </div>
            <div className="h-14_5 pt-2">
              <div
                className="rounded text-center"
                // style={{
                //   backgroundColor: "#131821",
                //   height: "100%",
                //   border: "2px solid grey",
                // }}
              >
                <h5 className="w-100 mt-2">
                  {coinSymbol.toUpperCase()+"  in your portfolio"}
                </h5>
                <Table striped bordered hover  className="w-100x">
                  <tr>
                    <td>{coin}</td>
                    <td>{currCoin } $</td>
                  </tr>
                </Table>
              </div>
            </div>
            <div className="h-28 pt-3">
              <div
                className="rounded text-center"
                // style={{
                //   backgroundColor: "#131821",
                //   height: "100%",
                //   border: "2px solid grey",
                // }}
              >
                <h5 className="w-100 mt-2">Performance</h5>
                <Table striped bordered hover variant="" className="w-100">
                  <tr>
                    <td>Change hour</td>
                    <td id="changeH">{changeH} %</td>
                  </tr>
                  <tr>
                    <td>Change day</td>
                    <td id="changeD">{changeD} %</td>
                  </tr>
                  <tr>
                    <td>Change week</td>
                    <td id="changeW">{changeW} %</td>
                  </tr>
                </Table>
              </div>
            </div>
            <div className="h-30 pt-2">
              <div
                className="rounded"
                // style={{
                //   backgroundColor: "#131821",
                //   height: "100%",
                //   border: "2px solid grey",
                // }}
              >
                <Form className="w-100 h-100">
                  <div className="h-30 text-center pt-1">
                    <h5>Current Price</h5>
                    <h4>
                      <b>${price}</b>
                    </h4>
                  </div>
                
                  <div className="h-15 d-flex justify-content-center pt-3">
                    <Form.Label className="text-center w-25 d-inline mx-5 ">
                     {"Amount "+coinSymbol}
                    </Form.Label>
                    <Form.Label className="text-center w-25 d-inline mx-5">
                      Price USD
                    </Form.Label>
                  </div>
                  <div className="h-25 d-flex justify-content-center">
                    <Form.Control
                      id="inCoin"
                      className="w-45 d-inline mr-3"
                      onChange={onChangeCoin}
                      placeholder="0.00000"
                      type="number"
                    ></Form.Control>
                    <Form.Control
                      id="inUSD"
                      className="w-45 d-inline"
                      onChange={onChangeUSD}
                      placeholder="0.00"
                      type="number"
                    ></Form.Control>
                  </div>
                  <div className="h-30 d-flex justify-content-center">
                    <div className="w-50 h-100 d-flex justify-content-center pt-3">
                      <Button
                        className="w-75 h-100 bg-success border-0"
                         onClick={handleBuy}
                        // disabled={this.state.loading}
                      >
                        <h4 className="m-auto">Buy</h4>
                      </Button>
                    </div>
                    <div className="w-50 h-100 d-flex justify-content-center pt-3">
                      <Button
                        className="w-75 h-90 bg-danger border-0"
                         onClick={handleSell}
                        // disabled={}
                      >
                        <h4 className="m-auto">Sell</h4>
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
          </Row>
        
          <Modal
          // size="sm"
          centered
          show={buySuccess}
          onHide={
            
            ()=>{
              setBuySuccess(false)
            }
          }
        >
          <Modal.Header className="bg-success" closeButton>
            <Modal.Title>Successful purchase!</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark d-flex justify-content-center align-items-center">
            <Table striped bordered hover variant="dark">
              <tr>
                <td>Bought:</td>
               <td>{coinsBuyed + " " + coinSymbol.toUpperCase()}</td>
              </tr>
              <tr>
                <td>Total:</td>
               <td>{currCoin + " " + coinSymbol.toUpperCase()}</td>
              </tr>
              <tr>
                <td>Balance:</td>
                  <td>{balance.balance+" "+"USD"}</td>
              </tr>
            </Table>
          </Modal.Body>
        </Modal>

        <Modal
          // size="sm"
          centered
          show={sellSuccess}
          onHide={
            
            ()=>{
              setSellSuccess(false)
            }
          }
        >
        <Modal.Header className="bg-success" closeButton>
            <Modal.Title>Successful Sale!</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark d-flex justify-content-center align-items-center">
            <Table striped bordered hover variant="dark">
              <tr>
                <td>Sold:</td>
               <td>{coinsSold + " " + coinSymbol.toUpperCase()}</td>
              </tr>
              <tr>
                <td>Total:</td>
               <td>{currCoin + " " + coinSymbol.toUpperCase()}</td>
              </tr>
              <tr>
                <td>Balance:</td>
                  <td>{balance.balance+" "+"USD"}</td>
              </tr>
            </Table>
          </Modal.Body>
        </Modal>

          </Container>
    </div>
  )
}

export default Coin
