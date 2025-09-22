import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_SPOON_KEY}`
        );
        const data = await res.json();
        setRecipe(data);
      } catch (err) {
        console.error("Error fetching recipe details:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [id]);

  if (!recipe) return <p>loading...</p>

  return (
    <div className="details-container">
      <h1 className="title">{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="recipe-image"
      />

      <h2 className="ingredient-text">Ingredients</h2>
      <ul className="ingredient-list">
        {recipe.extendedIngredients?.map((ingredients) => (
          <li key={ingredients.id}>{ingredients.original}</li>
        ))}
      </ul>

      <h2 className="instruction-text">Instructions</h2>
      <p className="recipe-instructions">
        {recipe.instructions
          ? recipe.instructions.replace(/<\/?[^>]+(>|$)/g, "") // strip HTML
          : "No instructions available."}
      </p>
    </div>
  );
}
