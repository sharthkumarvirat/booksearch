
import { useEffect, useState } from 'react';
import './App.css'
import Home from './Components/Home'
import Favourite from './Components/Favourite';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const [apiData, setApiData] = useState([]);
  const [pending, setPending] = useState(true);
  const [addFav, setAddFav] = useState([])
  const [search, setSearch] = useState("")

  let url = `https://openlibrary.org/search.json?q=a&limit=10&page=1`
  useEffect(() => {
    if (search !== "") {
      url = `https://openlibrary.org/search.json?q=${search}&limit=10&page=1`
    }
    fetchingData(url)
  }, [search])

  const fetchingData = () => {
    fetch(url)
      .then((resp) => {
        if (resp.ok === false) {
          throw Error("Searching data is not found")
        } return resp.json();
      })
      .then((data) => {
        console.log(data.docs);
        setApiData(data.docs);
        setPending(false);
      })

  }

  const addtoFav = (elment) => {
    let updateBook = [...addFav, elment]
    setAddFav(updateBook);
    localStorage.setItem("books", JSON.stringify(updateBook));
  };

  const deleteFromFav = (id) => {
    const updatedFav = addFav.filter(item => item.key !== id);
    setAddFav(updatedFav);
    localStorage.setItem("books", JSON.stringify(updatedFav));
  };

  if (pending) {
    return (
      <div className='flex items-center justify-center w-screen h-screen'>
        <span className="loading loading-spinner loading-xs h-[5rem] w-[5rem]"></span>
      </div>
    )
  } else {
    return (
      <>
        <BrowserRouter basename='/'>
          <Routes>
            <Route path='/' element={<Home apiData={apiData} pending={pending} addtoFav={addtoFav} setPending={setPending} setSearch={setSearch} />} />
            <Route path='/favourite' element={<Favourite deleteFromFav={deleteFromFav} />} />
          </Routes>
        </BrowserRouter>
      </>
    )
  }

}

export default App
