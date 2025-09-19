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

  if (loading) return <p className="p-4">Loading recipe...</p>;
  if (!recipe) return <p className="p-4">Recipe not found.</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="rounded-lg mb-4 w-full max-h-[400px] object-cover"
      />

      <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
      <ul className="list-disc pl-6 mb-6">
        {recipe.extendedIngredients?.map((ing) => (
          <li key={ing.id}>{ing.original}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mb-2">Instructions</h2>
      <p className="leading-relaxed">
        {recipe.instructions
          ? recipe.instructions.replace(/<\/?[^>]+(>|$)/g, "") // strip HTML
          : "No instructions available."}
      </p>
    </div>
  );
}
