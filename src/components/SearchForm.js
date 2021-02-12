import React from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
  const {setSearchTerm} = useGlobalContext();
  const inputSearchRef = React.useRef('')

  const getCocktail=()=> {
    setSearchTerm(inputSearchRef.current.value)
  }

  React.useEffect(()=> {
    inputSearchRef.current.focus();
  },[])

  return (
    <section className='section search'>
      <form action='' className='search-form'>
        <div className='form-control'>
          <label htmlFor='name'>search your favorite cocktail</label>
          <input
            ref={inputSearchRef}
            onChange={getCocktail}
            type='text'
            name='name'
            id='name'
            placeholder='type here...'
          />
        </div>
      </form>
    </section>
  )
}

export default SearchForm


























// const SearchForm = () => {
//   return (
//     <div>
//       <h2>search form component</h2>
//     </div>
//   )
// }

// export default SearchForm