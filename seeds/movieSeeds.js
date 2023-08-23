const Models = require("../models");

const data = [
  {
    title: "Terminator 2",
    synopsis: "Judgement Day for all carbon based lifeforms",
    image: "https://m.media-amazon.com/images/M/MV5BMGU2NzRmZjUtOGUxYS00ZjdjLWEwZWItY2NlM2JhNjkxNTFmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg"
  },
  {
    title: "Hackers",
    synopsis: "Completely realistic movie about what hacking is like",
    image: "https://m.media-amazon.com/images/M/MV5BNmExMTkyYjItZTg0YS00NWYzLTkwMjItZWJiOWQ2M2ZkYjE4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg"
  },
  {
    title: "The Usual Suspect",
    synopsis: "It's always the ones you least expect",
    image: "https://m.media-amazon.com/images/I/51ANy73yJuL._AC_UF894,1000_QL80_.jpg"
  },
  {
    title: "Die Hard",
    synopsis: "Christmas themed movie at Nakatomi Plaza",
    image: "https://cdn.shopify.com/s/files/1/1057/4964/products/Die-Hard-Vintage-Movie-Poster-Original-1-Sheet-27x41-7126.jpg?v=1672462859"
  },
  {
    title: "Bambi",
    synopsis: "Only you can start forest fires",
    image: "https://cdn.shopify.com/s/files/1/1057/4964/products/bambi-vintage-movie-poster-original-22x32.jpg?v=1598907672"
  },
  {
    title: "The Brave Little Toaster",
    synopsis: "Ambitious kitchen appliance",
    image: "https://m.media-amazon.com/images/I/511g5bZdDDL._AC_UF894,1000_QL80_.jpg"
  }
];

const seedMovies = async () => {
  // Loop over data, await is important to resolve the promise (I promise you that the findAll method is a promise)
  for await (const element of data) {
    // Check if the user exists in the DB already
    const movie = await Models.Movie.findAll({
      where: {
        title: element.title,
        synopsis: element.synopsis,
      },
      raw: true,
    })
      .then((data) => {
        // If a movie is found the length will be > 1, else 0
        return data;
      })
      .catch((err) => {
        console.log("Error:", err);
        throw err;
      });

    // Check if the data returned has a movie or not
    if (movie.length === 0) {
      // If no movie, add one
      Models.Movie.create(element)
        .then((data) => {
          console.log("Added", element);
        })
        .catch((err) => {
          console.log("Error:", err);
          throw err;
        });
    } else {
      console.log("movie exists", movie[0].title);
      //Run update
    }
  }
};

module.exports = {
  seedMovies,
};
