import CustomImage from "./CustomImage"
import { Link } from "react-router-dom";

export default function RecipeCard({recipe}){
  return(
    <div className="recipe-card">
      <CustomImage imgsrc={recipe.image} pt="65%" />
      <div className="recipe-card-info">
      <img className="author-image" src={recipe.authorImg} alt="" />
      <p className="recipe-title">{recipe.title}</p>
      <p className="recipe-desc">{recipe.description}</p>
       <Link
        to={`/recipe/${recipe.id}`}
       className="view-btn"
      >
        View Recipe
      </Link>
    </div>
    </div>
  )
}
