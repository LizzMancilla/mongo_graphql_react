import './App.css';
import { useQuery,gql } from "@apollo/client";
import { useState } from 'react';

const ALL_PRODUCTS = gql`
  {
    products{
      code
      position
      quantity
      image
      price
      description
    }
  }
`

function App() {
  const [ iniData, setIni ] = useState()
  const [ productsData, setData ] = useState()
  const [ sortConfig, setSortConfig ] = useState()
  const [ order, setOrder ] = useState("ASC")
  const [ filterValue, setFilterValue ] = useState("")
  const { loading, error, data } = useQuery(
    ALL_PRODUCTS
    ,{onCompleted: data =>{
      setData(data)
      setIni(data)
    }})

  const sorting = (col) => {
    var data = productsData.products
    if (order === "ASC"){
      const sorted = [...data].sort((a,b) =>
        a[col] > b[col] ? 1 : -1
      );
      setData({products: sorted})
      setOrder("DSC")
      setSortConfig({ col:col, order:"dsc" })
    }
    if (order === "DSC"){
      const sorted = [...data].sort((a,b) =>
        a[col] < b[col] ? 1 : -1
      );
      setData({products: sorted})
      setOrder("ASC")
      setSortConfig({ col:col, order:"asc" })
    }
  }

  const getClassNamesFor = (col) => {
    if (!sortConfig) {
      return "both";
    }
    return sortConfig.col === col ? sortConfig.order : "both";
  };

  const searching = e =>{
    setFilterValue(e.target.value)
    filter(e.target.value)
  }

  const filter = (filterValue) =>{
    var filtered = [...iniData.products].filter((obj)=>{
      if( obj.code.toString().toLowerCase().includes(filterValue.toLowerCase())
        || obj.description.toString().toLowerCase().includes(filterValue.toLowerCase())
      )
        return obj
    })
    setData({products: filtered})
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error !!!!!</p>

  return (
    <div className="container">
      <h2>Products</h2>
      <input
        className='filterBar'
        value={filterValue}
        placeholder='Search ...'
        onChange={searching}
      />
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th><button onClick={() => sorting("code")} className={getClassNamesFor("code")}>code</button></th>
            <th><button onClick={() => sorting("position")} className={getClassNamesFor("position")}>position</button></th>
            <th><button onClick={() => sorting("quantity")} className={getClassNamesFor("quantity")}>quantity</button></th>
            <th><button onClick={() => sorting("image")} className={getClassNamesFor("image")}>image</button></th>
            <th><button onClick={() => sorting("price")} className={getClassNamesFor("price")}>price</button></th>
            <th><button onClick={() => sorting("description")} className={getClassNamesFor("description")}>description</button></th>
          </tr>
        </thead>
        <tbody>
        { productsData !== undefined ?
            productsData.products.map((d) =>(
              <tr key={d.code}>
                <td>{d.code}</td>
                <td>{d.position}</td>
                <td>{d.quantity}</td>
                <td><img src={require('/tmp/images/'+d.image)} /></td>
                <td>{d.price}</td>
                <td>{d.description}</td>
              </tr>
            ))
          :
          data.products.map((d) =>(
            <tr key={d.code}>
              <td>{d.code}</td>
              <td>{d.position}</td>
              <td>{d.quantity}</td>
              <td>{d.image}</td>
              <td>{d.price}</td>
              <td>{d.description}</td>
            </tr>
          ))

        }
        </tbody>
      </table>
    </div>
  )
}

export default App;
