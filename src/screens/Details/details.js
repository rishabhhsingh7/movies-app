import React from "react";
import "./Details.css";
import artists from "../../common/artists";
import { useState } from "react";
import { useEffect } from "react";
import YouTube from "react-youtube";
import { Link, useParams } from "react-router-dom";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import Typography from "@material-ui/core/Typography";
import moviesData from "../../common/moviesData";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import { Button, Grid } from "@material-ui/core";
import Rating from "@mui/material/Rating";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
var getYouTubeId = require("get-youtube-id");

const Details = () => {
  const clickedmovie = useParams();
  const [value, setValue] = useState(0);
  let [moviedata, setMoviedata] = useState(moviesData);
  let [artist, setArtist] = useState(artists);

  const opts = {
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    let artistname = "";
    moviedata.forEach((movie) => {
      let isCorrectValue = false;
      if (movie.title === clickedmovie.moviename) {
        isCorrectValue = true;

        artistname =
          movie.artists[0].first_name + " " + movie.artists[0].last_name;
      }
      if (isCorrectValue) {
        setMoviedata(movie);
      }
    });
    artist.forEach((ARTIST) => {
      let isCorrectValue = false;

      if (ARTIST.first_name + " " + ARTIST.last_name === artistname) {
        isCorrectValue = true;
      }
      if (isCorrectValue) {
        setArtist(ARTIST);
      }
    });
  }, []);

  return (
    <div>
      <Link className="btn btn-primary homelink" to="/">
        <ArrowBackIosIcon></ArrowBackIosIcon>
        <span>Back to Home</span>
      </Link>
      <div className="flex-container">
        <div className="leftdata">
          <ImageList style={{ width: "150%" }} rowHeight={250}>
            <ImageListItem>
              <img src={moviedata.poster_url} alt={moviedata.title} />
            </ImageListItem>
          </ImageList>
        </div>

        <div className="middledata">
          <Typography variant="h2">{moviedata.title}</Typography>
          <Typography variant="h5">
            <b>Genres</b>: {moviedata.genres}
          </Typography>
          <Typography variant="h5">
            <b> Duration</b>: {moviedata.duration}
          </Typography>
          <Typography variant="h5">
            <b>Release Date</b>: {moviedata.release_date}
          </Typography>
          <Typography variant="h5">
            <b>Rating</b>: {moviedata.critics_rating}
          </Typography>

          <Typography style={{ marginTop: "16px" }} variant="h5">
            <b>Plot</b>:<a href={moviedata.wiki_url}>(wiki_link)</a>{" "}
            {moviedata.storyline}
          </Typography>
          <Typography style={{ marginTop: "16px" }} variant="h5">
            <b>Trailer</b>:
            <div>
              <YouTube
                videoId={getYouTubeId(moviedata.trailer_url)}
                opts={opts}
              />
            </div>
          </Typography>
        </div>

        <div className="rightdata">
          <Grid>
            <Typography variant="h5">
              Rate this movie:
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
              <Typography variant="h5">Artists:</Typography>
            </Typography>
            <Grid item>
              <ImageList>
                <ImageListItem rowHeight={250}>
                  <img
                    src={artist.profile_url}
                    alt={artist.first_name + " " + artist.last_name}
                  />
                  <ImageListItemBar
                    title={artist.first_name + " " + artist.last_name}
                  />
                </ImageListItem>
              </ImageList>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Details;
