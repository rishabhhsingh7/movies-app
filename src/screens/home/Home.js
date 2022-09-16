import React from "react";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import "./Home.css";
import Header from "../../common/header/Header";
import moviesData from "../../common/moviesData";
import { useState } from "react";

const Home = () => {
  const [MovieData, setMovieData] = useState(moviesData);

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
          {MovieData.map((movie) => (
            <ImageListItem key={movie.id}>
              <img src={movie.poster_url} alt={movie.title} />
              <ImageListItemBar title={movie.title} />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
      <div className="flex-container">
        <div className="left">
          <ImageList rowHeight={350} cols={4}>
            {MovieData.map((movie) => (
              <ImageListItem key={movie.title}>
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
        <div></div>
      </div>
    </div>
  );
};

export default Home;
