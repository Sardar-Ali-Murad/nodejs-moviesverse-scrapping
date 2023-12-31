import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cheerio from "cheerio";
let app = express();

// The Initial End Point Starts

// Getting all the movies start

app.get("/movies/:page", async (req, res) => {
  try {
    let movies = [];
    let totalPages;
    const response = await fetch(
      `https://moviesverse.ong/category/movies/hollywood/page/${req.params.page}`
    );
    const html = await response.text();
    const $ = cheerio.load(html);
    totalPages = Number($(".page-numbers:last").prev().text());
    $("article", html).each(function () {
      const link = $(this).find("a").attr("href");
      const text = $(this).find("a").text();
      const img = $(this).find("img").attr("src");
      const id = link.split("/")[3];
      movies = [...movies, { link, text, img, id }];
    });
    // .catch((err) => console.log(err));
    res.json({ movies: movies, totalPages, itemsPerPage: movies.length });
  } catch (error) {
    console.log(error);
  }
});
// Getting all the movies Ends

// Getting the Movies By Genre Starts
app.get("/movies/genre/:genre/:page", async (req, res) => {
  try {
    let movies = [];
    let totalPages;
    const response = await fetch(
      `https://moviesverse.ong/category/genre/${req.params.genre}/page/${req.params.page}`
    );
    const html = await response.text();
    const $ = cheerio.load(html);
    totalPages = Number($(".page-numbers:last").prev().text());
    $("article", html).each(function () {
      const link = $(this).find("a").attr("href");
      const text = $(this).find("a").text();
      const img = $(this).find("img").attr("src");
      const id = link.split("/")[3];
      movies = [...movies, { link, text, img, id }];
    });
    res.json({ movies: movies, totalPages, itemsPerPage: movies.length });
  } catch (error) {
    console.log(error);
  }
});
// Getting the Movies By Genre Ends

// Getting the movies by year Starts
app.get("/movies/year/:year/:page", async (req, res) => {
  try {
    let movies = [];
    let totalPages;
    const response = await fetch(
      `https://moviesverse.ong/category/year/${req.params.year}/page/${req.params.page}`
    );
    const html = await response.text();

    const $ = cheerio.load(html);
    totalPages = Number($(".page-numbers:last").prev().text());
    $("article", html).each(function () {
      const link = $(this).find("a").attr("href");
      const text = $(this).find("a").text();
      const img = $(this).find("img").attr("src");
      const id = link.split("/")[3];
      movies = [...movies, { link, text, img, id }];
    });
    res.json({ movies: movies, totalPages, itemsPerPage: movies.length });
  } catch (error) {
    console.log(error);
  }
});

// Getting the movies by year Ends

// Getting the movie by category starts
app.get("/movies/category/:category/:page", async (req, res) => {
  try {
    let movies = [];
    let totalPages;
    const response = await fetch(
      `https://moviesverse.ong/category/movies/${req.params.category}/page/${req.params.page}`
    );
    const html = await response.text();

    const $ = cheerio.load(html);
    totalPages = Number($(".page-numbers:last").prev().text());
    $("article", html).each(function () {
      const link = $(this).find("a").attr("href");
      const text = $(this).find("a").text();
      const img = $(this).find("img").attr("src");
      const id = link.split("/")[3];
      movies = [...movies, { link, text, img, id }];
    });
    res.json({ movies: movies, totalPages, itemsPerPage: movies.length });
  } catch (error) {
    console.log(error);
  }
});

// Getting the movie by category ends

// Getting the movies by webseries starts
app.get("/movies/webSeries/:webSeries/:page", async (req, res) => {
  try {
    let movies = [];
    let totalPages;
    const response = await fetch(
      `https://moviesverse.ong/category/web-series/${req.params.webSeries}/page/${req.params.page}`
    );
    const html = await response.text();

    const $ = cheerio.load(html);
    totalPages = Number($(".page-numbers:last").prev().text());
    $("article", html).each(function () {
      const link = $(this).find("a").attr("href");
      const text = $(this).find("a").text();
      const img = $(this).find("img").attr("src");
      const id = link.split("/")[3];
      movies = [...movies, { link, text, img, id }];
    });
    res.json({ movies: movies, totalPages, itemsPerPage: movies.length });
  } catch (error) {
    console.log(error);
  }
});

// Getting the movies by webseries ends

// Getting the mobie by Search Starts
app.get("/movies/movieBySearch/:page", async (req, res) => {
  try {
    let movies = [];
    let totalPages;

    const response = await fetch(
      `https://moviesverse.ong/page/${req.params.page}?s=${req.query.search}`
    );
    const html = await response.text();

    const $ = cheerio.load(html);
    $("article", html).each(function () {
      const link = $(this).find("a").attr("href");
      const text = $(this).find("a").text();
      const img = $(this).find("img").attr("src");
      const id = link.split("/")[3];
      movies = [...movies, { link, text, img, id }];
    });
    totalPages = Number($(".page-numbers:last").prev().text());
    res.json({ movies: movies, totalPages, itemsPerPage: movies.length });
  } catch (error) {
    console.log(error);
  }
});
// Getting the mobie by Search Ends

// Getting the single movie Info Starts
app.get("/movie/singleMovie/:id", async (req, res) => {
  try {
    const response = await fetch(`https://moviesverse.ong/${req.params.id}`);
    const html = await response.text();

    let $ = cheerio.load(html);

    let header = $("header").find("h1").text();
    let intro = $('.thecontent p:contains("Download")').text();
    let movieInfo = [];
    $(".imdb_right span", html).each(function () {
      let highlighter = $(this).find("b").text();
      let info = $(this).text().split(highlighter).join("");
      if (highlighter && info) {
        movieInfo = [...movieInfo, { highlighter, info }];
      }
    });

    let extraInfo = [];
    $("article ul li").each(function () {
      let header = $(this).find("strong").text();
      let para = $(this).text().split(header).join("");
      extraInfo = [...extraInfo, { header, para }];
    });

    let storyLine = $("article ul").next().next().text();
    let screenShots = $("article img:eq(1)").attr("src");
    res.json({
      header,
      intro,
      movieInfo,
      extraInfo,
      storyLine,
      screenShots,
    });
  } catch (error) {
    console.log(error);
  }
});
// Getting the single movie Info Ends

// Movies by Page No Ends

app.listen(5000, () => {
  console.log(`App is listening on the Port 5000`);
});
