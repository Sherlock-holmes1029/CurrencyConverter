import React from 'react'
import './App.css'
import {Country_List} from "./data"
function App() {
  

  
  const [transfare,setTransfare]=React.useState({
    fromCount:"USD",
    toCount:"JOD",
    fromImg:"https://flagcdn.com/us.svg",
    toImg: "https://flagcdn.com/jo.svg",
    Amount:1,
    rate:1.410
  })

React.useEffect(()=>{
  try{
    async function getRate(){
    const response = await fetch(`https://v6.exchangerate-api.com/v6/04a76875ed3fcb46e2a397dd/latest/${transfare.fromCount}`);
        const result = await response.json();
        const exchangeRate = result.conversion_rates[transfare.toCount];
        setTransfare(prev=>({
          ...prev ,
          rate :exchangeRate
        }))
        console.log(exchangeRate)
        console.log("getRate")
     }
    getRate()
     }
    catch{
    window.alert("the Country is not supported")
     }
  },[transfare.fromCount])


  const CountryCodes=Object.keys(Country_List).map((country)=>{
    return (<option key={country} value={country}>{country}</option>)
  })
  function handleChange(event){
    const {value,name}=event.target
    setTransfare(prev=>({
      ...prev,
      [name]:value
    }))
    console.log(transfare)
    console.log("handle")
  }

  function calculateRate(event){
    event.preventDefault()    
  }

  function change(){
    setTransfare(prev=>({
      fromCount:transfare.toCount,
      toCount:transfare.fromCount,
      fromImg:transfare.toImg,
      toImg: transfare.fromImg,
      Amount:transfare.Amount,
      rate:transfare.rate
    }))
    console.log(transfare)
  }

  return (
    <>
      <div className='Card'>
        <form onSubmit={calculateRate}>
          <div className="">
          <label htmlFor="">Amount:</label>
          <input className='amount' value={transfare.Amount} type="number" name="Amount" id="" onChange={handleChange}/>
          </div>
          <div className="select">
          <label htmlFor="">From</label>
          <img
            src={`https://flagcdn.com/${Country_List[transfare.fromCount].toLowerCase()}.svg`}
            width="30"
            alt="Ukraine"/>
          <select  name="fromCount" value={transfare.fromCount} onChange={handleChange}>
            {CountryCodes}
          </select>
          </div>

          <i className='fas fa-arrow-right-arrow-left' onClick={change}></i>

          <div className="select">
          <label htmlFor="">to</label>
          <img
          src={`https://flagcdn.com/${Country_List[transfare.toCount].toLowerCase()}.svg`}
          width="30"
          alt="Ukraine"/>
          <select name="toCount" value={transfare.toCount} onChange={handleChange}>
          {CountryCodes}
          </select>
          </div>
          <button className='transfare'>Transfare</button>
          <h1 className='result'>{(transfare.Amount*transfare.rate).toFixed(2)}</h1>
        </form>
      </div>
    </>
  )
}

export default App
