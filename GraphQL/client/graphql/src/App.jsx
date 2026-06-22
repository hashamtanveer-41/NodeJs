import { useState } from 'react'

import { gql } from "@apollo/client";
import {useQuery} from "@apollo/client/react";




const query = gql`
  query GetTodosWithUser {
    getTodos {
      id
      title
      completed
      user{
        id
        name
      }
    }
  }
`

function App() {
  const [count, setCount] = useState(0)
  const {data, loading} = useQuery(query);
  if (loading) return <h1>Loading ....</h1>
  return (
    <div className="App">
      <table>
        <tbody>
        {
          data.getTodos.map((todo, index)=>
            <tr key={index}>
              <td>{todo.title}</td>
              <td>{todo?.user?.name}</td>
            </tr>
          )
        }
        </tbody>
      </table>
    </div>
  )
}

export default App
