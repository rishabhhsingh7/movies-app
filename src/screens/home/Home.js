import React from "react";
import "./Home.css";
import Header from "../../common/header/Header";
import moviesData from "../../common/moviesData";
import { useState } from "react";
import { createTheme } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {
  FormControl,
  MenuItem,
  Select,
  FormGroup,
  Checkbox,
  Button,
  InputLabel,
  Input,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const Home = () => {
  const theme = createTheme();
  const [MovieData, setMovieData] = useState(moviesData);
  const [filterData, setFilterData] = useState(moviesData);
  const [inputValue, setInputValue] = useState({
    Moviename: "",
    Genres: "",
    Artists: "",
    ReleaseDatestart: "",
    ReleaseDateEnd: "",
  });
  const {
    Moviename,
    Genres,
    Artists,
    ReleaseDateEnd,
    ReleaseDatestart,
  } = inputValue;

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setInputValue({ ...inputValue, [e.target.name]: [e.target.value] });
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();

      let filteredMovie = [];

      moviesData.forEach((movie) => {
        let isCorrectValue = false;
        if (inputValue.Moviename) {
          if (movie.title === inputValue.Moviename[0]) {
            isCorrectValue = true;
          }
        } else if (inputValue.Artists) {
          movie.artists.forEach((singledata) => {
            if (
              singledata.first_name + " " + singledata.last_name ===
              inputValue.Artists[0]
            ) {
              isCorrectValue = true;
            }
          });
        } else if (inputValue.Genres) {
          console.log(movie.genres + ":" + inputValue.Genres[0]);

          if (inputValue.Genres[0].join() == movie.genres.join()) {
            isCorrectValue = true;
          }
        }

        if (isCorrectValue) {
          filteredMovie.push(movie);
        }
      });
      console.log(filteredMovie);
      setFilterData(filteredMovie);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <h1>
        <span>Upcoming Movies</span>
      </h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          overflow: "hidden",
        }}
      >
        <ImageList
          style={{
            flexWrap: "nowrap",
            transform: "translateZ(0)",
          }}
          rowHeight={250}
          cols={6}
        >
          {MovieData.map((movie, index) => (
            <ImageListItem key={`${index}_movie`}>
              <img src={movie.poster_url} alt={movie.title} />
              <ImageListItemBar title={movie.title} />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
      <div className="flex-container">
        <div className="left">
          <ImageList rowHeight={350} cols={4}>
            {filterData.map((movie, index) => (
              <ImageListItem key={`${index}_movie1`}>
                <a href="">
                  <img src={movie.poster_url} alt={movie.title} />{" "}
                </a>

                <ImageListItemBar
                  title={movie.title}
                  subtitle={
                    <span>
                      Release Date:{movie.release_date.substring(0, 10)}
                    </span>
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>
        </div>
        <div className="right">
          <Card>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                  direction="column"
                >
                  <Typography
                    style={{
                      color: theme.palette.primary.light,
                      margin: theme.spacing(1, "auto"),
                    }}
                  >
                    FIND MOVIES BY:
                  </Typography>
                  <Grid item>
                    <FormControl
                      style={{
                        minWidth: 240,
                        maxWidth: 240,
                        margin: theme.spacing(1, "auto"),
                      }}
                    >
                      <InputLabel htmlFor="MovieName" variant="standard">
                        Movie Name
                      </InputLabel>
                      <Input
                        value={Moviename}
                        onChange={(e) => handleInputChange(e)}
                        name="Moviename"
                        id="MovieName"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl
                      variant="standard"
                      style={{
                        minWidth: 240,
                        maxWidth: 240,
                        margin: theme.spacing(1, "auto"),
                      }}
                    >
                      <InputLabel id="Genres-label">Genres</InputLabel>
                      <Select
                        name="Genres"
                        id="Genres"
                        defaultValue=""
                        labelId="Genres-label"
                        onChange={(e) => handleInputChange(e)}
                      >
                        {MovieData.map((Movie, index) => {
                          return (
                            <MenuItem
                              name="Genres"
                              key={`${index}_Movie2`}
                              value={Movie.genres}
                            >
                              {Movie.genres}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl
                      variant="standard"
                      style={{
                        minWidth: 240,
                        maxWidth: 240,
                        margin: theme.spacing(1, "auto"),
                      }}
                    >
                      <InputLabel id="Artists">Artists</InputLabel>
                      <Select
                        name="Artists"
                        defaultValue=""
                        labelId="Artists"
                        onChange={(e) => handleInputChange(e)}
                      >
                        {MovieData.map((Movie, index) => {
                          return (
                            <MenuItem
                              key={`${index}_Movie3`}
                              value={
                                Movie.artists[0].first_name +
                                " " +
                                Movie.artists[0].last_name
                              }
                            >
                              {Movie.artists[0].first_name +
                                " " +
                                Movie.artists[0].last_name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl
                      style={{
                        minWidth: 240,
                        maxWidth: 240,
                        margin: theme.spacing(1, "auto"),
                      }}
                    >
                      <InputLabel
                        shrink={true}
                        htmlFor="ReleaseDateStart"
                        variant="standard"
                        id="ReleaseDateStart"
                      >
                        Release Date Start
                      </InputLabel>
                      <Input
                        value={ReleaseDatestart}
                        name="ReleaseDatestart"
                        onChange={(e) => handleInputChange(e)}
                        type="Date"
                        id="ReleaseDateStart"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item>
                    <FormControl
                      style={{
                        minWidth: 240,
                        maxWidth: 240,
                        margin: theme.spacing(1, "auto"),
                      }}
                    >
                      <InputLabel
                        shrink={true}
                        htmlFor="ReleaseDateEnd"
                        variant="standard"
                        id="ReleaseDateEnd"
                      >
                        Release Date End
                      </InputLabel>
                      <Input
                        value={ReleaseDateEnd}
                        name="ReleaseDateEnd"
                        onChange={(e) => handleInputChange(e)}
                        type="Date"
                        id="ReleaseDateEnd"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      style={{
                        minWidth: 240,
                        maxWidth: 240,
                        backgroundColor: "Blue",
                        margin: theme.spacing(1, "auto"),
                      }}
                    >
                      APPLY
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
