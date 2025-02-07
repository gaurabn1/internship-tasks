import {useState } from 'react';


function App() {

  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [address, setAddress] = useState('')

  function postData(e) {
    e.preventDefault();

    fetch("https://api.jsonbin.io/v3/b/67a5ddb2acd3cb34a8d9dd9b", {
      method: "PUT",
      body: JSON.stringify({
        record: {
          name: name,
          age: age,
          address: address
        }
      }),
      headers: {
        "Content-Type" : "application/json",
        "X-Master-Key" : "$2a$10$UVfjGLCWQtXWynVN/BVqUOvnoyc4Io6zE/rEsu1tHzGxFJIMLRlTa"
      }
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
  }

  function displayData(){
    fetch("https://api.jsonbin.io/v3/b/67a5ddb2acd3cb34a8d9dd9b")
    .then(res => res.json())
    .then((data) =>  {
        console.log(data)
        if (data){
        setName(data.record.record.name || '')
        setAge(data.record.record.age || '')
        setAddress(data.record.record.address || '')
        }else{
          console.log("No data found")
        }
    })
  }


  return (
  <>
      <div>
      <h1>Form Data</h1>
      <form onSubmit={(event) => postData(event) }>
        <label> Enter Name:  
          <input type="text"  value={name} onChange={(e) => setName(e.target.value) }  />
        </label>
        <hr />
        <label> Enter Age:  
          <input type="number" min="1" max="100" value={age} onChange={(e) => setAge(e.target.value) }  />
        </label>
        <hr />
        <label htmlFor=""> Enter Address: 
          <input type="text"  value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        <hr />
        <button type="submit" >Submit</button>
      </form>
      </div>

      <button onClick={displayData}>Display Data</button>
      <div>
        <h1>Display Data</h1>
        <p>Name: {name}</p>
        <p>Age: {age}</p>
        <p>Address: {address}</p>
      </div>
    </>
  )

}

export default App
