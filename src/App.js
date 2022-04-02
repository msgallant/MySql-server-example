import React from 'react'
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';




function App() {

  const [dataName, setDataName] = useState('')
  const [dataValue, setDataValue] = useState('')
  const [dataObjList, setDataObjList] = useState([])
  const [updValue, setUpdValue] = useState('')

  const baseURL = 'http://localhost:3004'
  const insertURL = baseURL + '/api/insert'
  const getURL = baseURL + '/api/get'
  const deleteURL = baseURL + '/api/delete'
  const updateURL = baseURL + '/api/update'


  useEffect(() => {
    axios.get(getURL).then((response) => {
      setDataObjList(response.data)

    })
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    axios.post(insertURL, {dataName: dataName, dataValue: dataValue})
    
    //sql server auto increments id
    const id = dataObjList[dataObjList.length - 1].id + 1
    setDataObjList([...dataObjList, {dataName: dataName, dataValue: dataValue, id: id} ])
  }

  const deleteDataObj = (id) => {
    const delURL = deleteURL + `/${id}`
    axios.delete(delURL)

    const updDataList = dataObjList.filter((ele) => 
      (ele.id !== id))
    setDataObjList(updDataList)
  }

  const updateDataObjValue = (dataObj) => {
    const updURL = updateURL
    dataObj.dataValue = updValue
    axios.put(updURL, dataObj)

    const updDataList = dataObjList.map((ele) => {
      if (ele.id === dataObj.id)
      {
        return dataObj
      }
      return ele
    })
    setDataObjList(updDataList)
    setUpdValue('')
    clearTextInInputs()
  }

  const clearTextInInputs = () => {
    document.getElementById("update-data-value").value = "";
    
  }

  return (
    <div className="App">
      <h1>MYSQL server example</h1>
      <h4>It has create, delete, update and fetch functionality.</h4>
      <div className='form'>
        <label>Data Name:</label>
        <input type="text" value={dataName} onChange={(e) => setDataName(e.target.value)}></input>
        <label>Data Value:</label>
        <input type="text" value={dataValue} onChange={(e) => setDataValue(e.target.value)}></input>
        <button onClick={onSubmit}>Submit</button>
        <br></br>

        {dataObjList.map((dataObj, index) => {return (
          <div key={index} className='border'>
            <br></br>
            <div className='data-list-font sameline'> 
              {dataObj.dataName} : {dataObj.dataValue} &nbsp;

              </div>
            <button className='sameline' onClick={() => {
              deleteDataObj(dataObj.id)
            }}>Delete</button>

            <div>
              <input type="text" id="update-data-value" 
              onChange={(e) => setUpdValue(e.target.value)}/>
            </div>
            <div>
              <button id={'update-button'}
                onClick={() => {
                  updateDataObjValue(dataObj)
                }}>Update</button>
            </div>
            <br></br>
          </div>
        )} )}
      </div>
    </div>
  );
}

export default App;
