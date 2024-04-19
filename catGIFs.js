/* This catGIFs.js file fetches a random cat GIF from an API URL using async/await.
   If successful it logs the GIF URL to the console, if not it logs an error message.
The following resources were used to complete this assignment:
 - https://stackoverflow.com/questions/56974852/how-to-catch-the-status-code-when-fetch-fails-using-async-await
 - https://itnext.io/error-handling-with-async-await-in-js-26c3f20bc06a
 - https://www.youtube.com/watch?v=cuEtnrL9-H0&t=13s
For more information about this please visit https://github.com/IronMike4/promises_async_await.git */

// Function to fetch a random cat GIF from the API
async function fetchRandomCatGif() {
  // Define the URL for fetching random cat GIFs
  const catApiUrl = "http://thecatapi.com/api/images/get?format=src&type=gif";

  try {
    // Fetch the cat GIF from the API
    const response = await fetch(catApiUrl);

    // Check if the response is successful
    if (!response.ok) {
      // If not successful, throw an error
      throw new Error(
        "Sorry, couldn't fetch a cat GIF this time. Please try again later."
      );
    }

    // Extract the URL of the cat GIF from the response
    const imageURL = response.url;

    // Log the URL of the cat GIF to the console
    console.log("Here's a great cat GIF:", imageURL);
  } catch (error) {
    // If an error occurs during fetching, log the error message
    console.error("Oops! Something went wrong:", error.message);
  }
}

// Fetch a random cat GIF
fetchRandomCatGif();
