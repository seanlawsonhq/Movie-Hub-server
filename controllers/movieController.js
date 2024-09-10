const Movie = require("../models/movies");

// ========Controller to find all Shows===========

const allShows = async (req, res) => {
  const shows =  await Movie.find({});
  res.status(200).json({ shows: shows });
};

//======== Controller to Find (same as GET) only all the Series===========

const allSeries = async(req, res) => {
  const series = await Movie.find({ type: "series" });
  res.status(200).json({ shows: series });
};

//===========Controller for find (same as GET) only all the Movies=========

const allMovies = async(req, res) => {
    const movies = await Series.find({ type: "movie"});
    res.status(200).json({shows: movies});
};

module.exports ={allShows, allSeries, allMovies}
