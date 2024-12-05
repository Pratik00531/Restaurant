async function searchRecipes() {
  const apiKey = 'hKQKh4deDf9v2HgFmL508n6G2t6CP3m9';
  const recipeName = document.getElementById('recipeNameInput').value;

  const myHeaders = new Headers();
  myHeaders.append("apikey", apiKey);

  const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
  };

  try {
      const response = await fetch(`https://api.apilayer.com/spoonacular/recipes/autocomplete?query=${recipeName}`,requestOptions);
      const data = await response.json();
      
      const recipeContainer = document.getElementById('recipeContainer');
      recipeContainer.innerHTML = ''; // Clear previous search results

      data.forEach(recipe => {
          const recipeElement = document.createElement('div');
          recipeElement.classList.add('recipe');
          const imageUrl = recipe.imageType === 'jpg' ? `https://api.apilayer.com/spoonacular/recipes/${recipe.id}/image.jpg` : ''; // Assuming imageType is 'jpg'
          recipeElement.innerHTML = `
              <h3>${recipe.title}</h3>
              <img src="${imageUrl}" alt="${recipe.title} Image">
              <p><a href="#" onclick="viewRecipe(${recipe.id})">View Recipe</a></p>
          `;
          recipeContainer.appendChild(recipeElement);
      });
  } catch (error) {
      console.error('Error fetching recipes:',error);
  }
}

function viewRecipe(recipeId) {
  window.open(`https://api.apilayer.com/spoonacular/recipes/${recipeId}`);
}
