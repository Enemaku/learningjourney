import { useEffect, useState } from "react";
import PreviousSearches from "../components/PreviousSearches";
import RecipeCard from "../components/RecipeCard";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");

  const fetchRecipes = async (searchTerm = "popular") => {
    try {
      const response = await fetch(
  `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOON_KEY}&number=12&addRecipeInformation=true`
);

      const data = await response.json();

      const apiRecipes = (data.results || []).map((recipe) => ({
        id: recipe.id,
        title: recipe.title,
        image: "/img/gallery/img_4.jpg",
        authorImg: "/img/top-chiefs/img_1.jpg",
        description: recipe.summary 
  ? recipe.summary.replace(/<[^>]*>?/gm, '').slice(0, 120) + "..." 
  : "No description available",
      }));
      setRecipes(apiRecipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);


  return (
    <div>
      <PreviousSearches
        query={query}
        setQuery={setQuery}
        fetchRecipes={fetchRecipes}
      />
      <div className="recipes-container">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}