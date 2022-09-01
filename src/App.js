import { useState, useEffect } from 'react'
import './App.css';
import { Item } from './components/Item.js'
import stockData from "./items.json"

function App() {
  const [item, setItem] = useState([]);
  const [otherItem, setOtherItem] = useState([])
  const [selectedSide, setSelectedSide] = useState("NONE")
  const [yourValue, setYourValue] = useState(0)
  const [otherValue, setOtherValue] = useState(0)
  const [higher, setHigher] = useState("")

 useEffect(() => {
     if(yourValue > otherValue) {
         setHigher("yourValue")
     } else if(otherValue > yourValue) {
         setHigher("otherValue")
     } else if(yourValue === otherValue) {
         setHigher("tie")
     }
  }, [item, otherItem]);

  const addItem = (a) => {

      let debounce = false
      let debounce2 = false

      if(selectedSide === "NONE") return;
      if(selectedSide === "LEFT") {
          setYourValue(yourValue + Number(a.value))
       const newState = item.map(post => {
          if(post.name === a.name) {
              debounce = true
              return {...post, count: post.count += 1}
          }
         return post
       })
       if(debounce) {
           return setItem(newState)
       }
       setItem([a, ...item]);
      } else if(selectedSide === "RIGHT") {
          setOtherValue(otherValue + Number(a.value))
    const newState = otherItem.map(post => {
          if(post.name === a.name) {
              debounce2 = true
              return {...post, count: post.count += 1}
          }
         return post
       })
       if(debounce2) {
           return setOtherItem(newState)
       }
       setOtherItem([a, ...otherItem]);
      }
  }

  const removeItem = (a) => {
    a.preventDefault();
      let debounce = false
      let deb2 = false
      if(a.target.id.trim()) {
          const data = stockData.find(b => {
              if(b.name === a.target.id) return true;
          })
          if(selectedSide === "LEFT") {
          const newState = item.map(post => {
             if(post.name === data.name) {
                debounce = true
                 if(post.count === 1) {
                     deb2 = true
   setYourValue(yourValue - Number(post.value))
                     return setItem(item.filter(d => d.name !== post.name))
                 } else {

              setYourValue(yourValue - Number(post.value))
                return {...post, count: post.count -= 1}
                 }
              }
         return deb2 ? item.filter(d => d.name !== post.name) : post

       })
         if(debounce && deb2 === false) {

             return setItem(newState)
         }

          } else if(selectedSide === "RIGHT") {
  const newState = otherItem.map(post => {
             if(post.name === data.name) {
                debounce = true
                 if(post.count === 1) {
                     deb2 = true
                     setOtherValue(otherValue - Number(post.value))
                     return setOtherItem(otherItem.filter(d => d.name !== post.name))
                 } else {

                     setOtherValue(otherValue - Number(post.value))
                return {...post, count: post.count -= 1}
                 }
              }
         return deb2 ? otherItem.filter(d => d.name !== post.name) : post

       })
         if(debounce && deb2 === false) {
             return setOtherItem(newState)
         }


          }
      }
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      if(e.target.id.trim()) {

          const data = stockData.find(function(post, index) {
              if(post.name === e.target.id) return true;
          })

          addItem({...item, name: e.target.id, key: Math.random(1, 100), value: data.value, photo: data.photo, count: 1});
      }
  }

  return (
    <div className="App">
      <div onClick={() => setSelectedSide("LEFT")} className="your-side" style={{
          backgroundColor: selectedSide === "LEFT" ? "#303030" : "#202020"
      }}>
   {item.map(data => {
       return (
 <button onClick={removeItem} className="item" id={data.name} key={data.key}>
                <img src={data.photo} alt={data.name}></img>
           <h3>{data.count}</h3>
</button>
       )
   })}

     </div>
      <div onClick={() => setSelectedSide("RIGHT")} className="their-side" style={{
          backgroundColor: selectedSide === "RIGHT" ? "#303030" : "#202020"
      }}>
   {otherItem.map(data => {
       return (
 <button onClick={removeItem} className="item" id={data.name} key={data.key}>
                <img src={data.photo} alt={data.name}></img>

           <h3>{data.count}</h3>
</button>
       )
   })}
      </div>

      <div className="info">
      <div className="yourValue" style={{
          backgroundColor: higher === "yourValue" ? "#88f47c" : higher === "tie" ? "#8ff3f7" :  "#ed6868"
      }}>
      <h2>{yourValue}</h2>
      </div>
     </div>

        <div className="info2">

       <div className="otherValue" style={{
          backgroundColor: higher === "otherValue" ? "#88f47c" : higher === "tie" ? "#8ff3f7" :  "#ed6868"
       }}>
      <h2>{otherValue}</h2>
      </div>
      </div>


         <div className="browser">
{stockData.map((data, key) => {
          return (
                <button onClick={handleSubmit} className="item" id={data.name} key={key}>
                <img src={data.photo} alt={data.name}></img>
              </button>
          )
      })}


      </div>

    </div>
  );
}

export default App;
