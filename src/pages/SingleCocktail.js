import React from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='


const SingleCocktail = () => {
  const {id} = useParams();
  const [isLoading, setIsLoading] = React.useState(true);
  const [cocktail, setCocktail] = React.useState(null);
  
  React.useEffect(()=> {
    async function getCocktail() {
      setIsLoading(true)
      try{
        const response = await fetch(`${url}${id}`);
        const data = await response.json();
        const {drinks} = data;
        if(drinks) {
          const {
           strDrink: name, 
           strCategory: category, 
           strAlcoholic: type, 
           strGlass: glass, 
           strInstructions: instructions, 
           strDrinkThumb: image, 
           strIngredient1,
           strIngredient2,
           strIngredient3,
           strIngredient4,
           strIngredient5,
          } = drinks[0];

          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ]
          const newCocktail = {
            name, category, type, glass, instructions, image, ingredients
          }
          setCocktail(newCocktail);
        } else {
          setCocktail(null);
        }
        setIsLoading(false);
      }
      catch(error) {
        console.log(error);
        setIsLoading(false)
      }
    }
    getCocktail()
  },[id])
  if(isLoading){
    return (
      <Loading />
    )
  }
 
   if (!cocktail) {
     return (
       <section className='section cocktail-section'>
         <Link className='btn btn-primary' to='/'>
           back home
         </Link>
         <h2 className='section-title'>
           no cocktails matched your search criteria
         </h2>
       </section>
     )
   }

   const { name, category, type, glass, instructions, image, ingredients} = cocktail
  return (
    <section className='section cocktail-section'>
      <Link className='btn btn-primary' to='/'>
        back home
      </Link>
      <h2 className='section-title'>{name}</h2>
      <div className='drink'>
        <img src={image} alt={name} />
        <div className='drink-info'>
          <p>
            <span className='drink-data'>name :</span>
            {name}
          </p>
          <p>
            <span className='drink-data'>category :</span>
            {category}
          </p>
          <p>
            <span className='drink-data'>info :</span>
            {type}
          </p>
          <p>
            <span className='drink-data'>glass :</span>
            {glass}
          </p>
          <p>
            <span className='drink-data'>instructions :</span>
            {instructions}
          </p>
          <p>
            <span className='drink-data'>ingredients :</span>
            {
              ingredients.map((item, index) => {
                return (
                  item? <span key={index}>{item}</span>:
                  null
                )
              })
            }
          </p>
        </div>
      </div>
    </section>
  )
}

export default SingleCocktail















// const SingleCocktail = () => {
//   return (
//     <div>
//       <h2>single cocktail page </h2>
//     </div>
//   )
// }

// export default SingleCocktail




























// const SingleCocktail = () => {
//   return (
//     <div>
//       <h2>single cocktail page </h2>
//     </div>
//   )
// }

// export default SingleCocktail