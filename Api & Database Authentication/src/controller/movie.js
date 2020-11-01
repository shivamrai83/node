const { sequelize } = require("../db/index");
const passport = require('passport');

function Init(app) {
  app.get("/movie", async function (request, response) {
    const movies = await sequelize.models.movies.findAll({});
    response.status(200).send(movies);
  });

  app.get("/movie/:id", async function (request, response) {
    const { id } = request.params;
    const movie = await sequelize.models.movies.findOne({ id });
    response.send({ movie });
  });

  app.delete("/movie/:id", async function (request, response) {
    const { id } = request.params;
    const movie = await sequelize.models.movies.findOne({ id });
    const dest = await movie.destroy();
    response.send({ dest });
  });

  app.post(
    "/movie",
    passport.authenticate("jwt", { session: false }),
    async function (request, response) {
      const { body } = request;
      const { name, language, quality, rating } = body;

      const createdMovie = await sequelize.models.movies.create({
        movie_name: name,
        language,
        quality,
        rating,
      });
      response.status(201).send(createdMovie);
    }
  );

  app.put("/movie/:id", async function (request, response) {
    const { id } = request.params;
    const movie = await sequelize.models.movies.findOne({ id });

    const { body } = request;
    const { name, language, quality, rating } = body;

    movie.movie_name = name ? name : movie.name;
    movie.language = language ? language : movie.language;
    movie.quality = quality ? quality : movie.quality;
    movie.rating = rating ? rating : movie.rating;

    // the name is still "Jane" in the database
    await movie.save();

    response.status(200).send(movie);
  });
}

module.exports = {
  Init,
};
