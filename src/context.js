import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()


// make sure use


const AppProvider = ({ children }) => {

  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('a');
  const [cocktails, setCocktails] = useState([]);

  const fetchCocktails = useCallback(async()=> {
    setIsLoading(true);
    try {
      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();
      const {drinks} = data;
      if(drinks) {
        const cocktails = drinks.map(drink=> {
          const {idDrink, strDrink, strGlass, strAlcoholic, strDrinkThumb}= drink
          return {
            id: idDrink,
            name: strDrink,
            glass: strGlass,
            type: strAlcoholic,
            image: strDrinkThumb
          }
        })
        setCocktails(cocktails)
      }
      else {
        setCocktails([])
      }
      setIsLoading(false);
    } catch(error){
      console.log(error);
      setIsLoading(false)
    }
  },[searchTerm])



useEffect(()=> {
  fetchCocktails();
},[searchTerm, fetchCocktails])




  return (
    <AppContext.Provider value={{isLoading, setSearchTerm, cocktails}}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }






export const useGlobalContext = () => {
  return useContext(AppContext)
}























// export const useGlobalContext = () => {
//   return useContext(AppContext)
// }

// export { AppContext, AppProvider }