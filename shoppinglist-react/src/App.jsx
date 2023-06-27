import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
  databaseURL: "https://shopping-list-b31a4-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")




function App() {
  
  const [item, setItem] = useState('');

  function updateItem (e) {
    setItem(e.target.value)
  
  }
  let currentItemArray = ""
  console.log(currentItemArray)
  function pushItemToDB () {
    push(shoppingListInDB, item);
    setItem("");
  }

  onValue(shoppingListInDB, function(snapshot){
    let shoppingArray = Object.values(snapshot.val())
    shoppingArray.forEach((item) => {
        currentItemArray += `<li>${item}</li>`
    })
  })

  return (
    <>
        <div className='container'>
          <img src="/src/assets/shoppingcart.png"></img>
          <input type="text" id="input-field" placeholder='Bread' onChange={updateItem} value={item}></input>
          <button onClick={pushItemToDB} id="add-button">Add to Cart</button>
          <div>
          <ul dangerouslySetInnerHTML={{__html: currentItemArray}}>
          </ul>
        </div>
        </div>
        
    </>
  )
}

export default App
