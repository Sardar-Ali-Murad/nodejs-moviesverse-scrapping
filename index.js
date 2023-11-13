import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cheerio from "cheerio";
import axios from "axios";
let app = express();
let PORT = process.env.PORT || 5000;

// The Initial End Point Starts

// Getting all the movies start

app.get("/movies", async (req, res) => {
  try {
    let movies = [];
    let totalPages;
    await axios
      .get(`${process.env.APP_URI}/category/movies/hollywood`)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        $("article", html).each(function () {
          const link = $(this).find("a").attr("href");
          const text = $(this).find("a").text();
          const img = $(this).find("img").attr("src");
          const id = link.split("/")[3];
          movies = [...movies, { link, text, img, id }];
        });
        totalPages = Number($(".page-numbers:last").prev().text());
      })
      .catch((err) => console.log(err));
    res.json({ movies: movies, totalPages, itemsPerPage: movies.length });
  } catch (error) {
    console.log(error);
  }
});
// Getting all the movies Ends

// Getting the Movies By Genre Starts
app.get("/movies/genre/:genre", async (req, res) => {
  try {
    let movies = [];
    let totalPages;
    await axios
      .get(`${process.env.APP_URI}/category/genre/${req.params.genre}`)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        $("article", html).each(function () {
          const link = $(this).find("a").attr("href");
          const text = $(this).find("a").text();
          const img = $(this).find("img").attr("src");
          const id = link.split("/")[3];
          movies = [...movies, { link, text, img, id }];
        });
        totalPages = Number($(".page-numbers:last").prev().text());
      })
      .catch((err) => console.log(err));
    res.json({ movies: movies, totalPages, itemsPerPage: movies.length });
  } catch (error) {
    console.log(error);
  }
});
// Getting the Movies By Genre Ends

// Getting the movies by year Starts
app.get("/movies/year/:year", async (req, res) => {
  try {
    let movies = [];
    let totalPages;
    await axios
      .get(`${process.env.APP_URI}/category/year/${req.params.year}`)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        $("article", html).each(function () {
          const link = $(this).find("a").attr("href");
          const text = $(this).find("a").text();
          const img = $(this).find("img").attr("src");
          const id = link.split("/")[3];
          movies = [...movies, { link, text, img, id }];
        });
        totalPages = Number($(".page-numbers:last").prev().text());
      })
      .catch((err) => console.log(err));
    res.json({ movies: movies, totalPages, itemsPerPage: movies.length });
  } catch (error) {
    console.log(error);
  }
});

// Getting the movies by year Ends

// Getting the movie by category starts
app.get("/movies/category/:category", async (req, res) => {
  try {
    let movies = [];
    let totalPages;
    await axios
      .get(`${process.env.APP_URI}/category/movies/${req.params.category}`)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        $("article", html).each(function () {
          const link = $(this).find("a").attr("href");
          const text = $(this).find("a").text();
          const img = $(this).find("img").attr("src");
          const id = link.split("/")[3];
          movies = [...movies, { link, text, img, id }];
        });
        totalPages = Number($(".page-numbers:last").prev().text());
      })
      .catch((err) => console.log(err));
    res.json({ movies: movies, totalPages, itemsPerPage: movies.length });
  } catch (error) {
    console.log(error);
  }
});

// Getting the movie by category ends

// Getting the movies by webseries starts
app.get("/movies/webSeries/:webSeries", async (req, res) => {
  try {
    let movies = [];
    let totalPages;
    await axios
      .get(`${process.env.APP_URI}/category/web-series/${req.params.webSeries}`)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        $("article", html).each(function () {
          const link = $(this).find("a").attr("href");
          const text = $(this).find("a").text();
          const img = $(this).find("img").attr("src");
          const id = link.split("/")[3];
          movies = [...movies, { link, text, img, id }];
        });
        totalPages = Number($(".page-numbers:last").prev().text());
      })
      .catch((err) => console.log(err));
    res.json({ movies: movies, totalPages, itemsPerPage: movies.length });
  } catch (error) {
    console.log(error);
  }
});

// Getting the movies by webseries ends

// Getting the movie by page No Starts
app.get("/movies/page/:pageNo", async (req, res) => {
  try {
    let movies = [];
    let totalPages;
    await axios
      .get(
        `${process.env.APP_URI}/category/movies/hollywood/page/${req.params.pageNo}`
      )
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        $("article", html).each(function () {
          const link = $(this).find("a").attr("href");
          const text = $(this).find("a").text();
          const img = $(this).find("img").attr("src");
          const id = link.split("/")[3];
          movies = [...movies, { link, text, img, id }];
        });
        totalPages = Number($(".page-numbers:last").prev().text());
      })
      .catch((err) => console.log(err));
    res.json({ movies: movies, totalPages, itemsPerPage: movies.length });
  } catch (error) {
    console.log(error);
  }
});
// Getting the movie by page No Ends

// Getting the mobie by Search Starts
app.get("/movies/movieBySearch", async (req, res) => {
  try {
    let movies = [];
    let totalPages;
    await axios
      .get(`${process.env.APP_URI}/?s=${req.query.search}`)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        $("article", html).each(function () {
          const link = $(this).find("a").attr("href");
          const text = $(this).find("a").text();
          const img = $(this).find("img").attr("src");
          const id = link.split("/")[3];
          movies = [...movies, { link, text, img, id }];
        });
        totalPages = Number($(".page-numbers:last").prev().text());
      })
      .catch((err) => console.log(err));
    res.json({ movies: movies, totalPages, itemsPerPage: movies.length });
  } catch (error) {
    console.log(error);
  }
});
// Getting the mobie by Search Ends

// Getting the single movie Info Starts
app.get("/movie/singleMovie/:id", async (req, res) => {
  try {
    axios
      .get(`${process.env.APP_URI}/${req.params.id}`)
      .then((response) => {
        let html = response.data;
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
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
});
// Getting the single movie Info Ends

// Movies by Page No Ends

app.listen(PORT, () => {
  console.log(`App is listening on the Port ${PORT}`);
});
