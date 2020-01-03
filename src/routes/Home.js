import React from 'react';
import axios from 'axios';
import Movie from '../components/Movie.js/'
import "./Home.css"


class Home extends React.Component {
  state = {
    isLoding: true,
    movies: []
  };

  async componentDidMount() {
    const {
      data: {
        data: { movies }
      }
    } = await axios.get("https://yts.lt/api/v2/list_movies.json?sort_by=rating");
    this.setState({ movies, isLoding: false });
  }

  render() {
    const { isLoding, movies } = this.state
    return (
      <section className="container">
        {isLoding ? (
          <div className="loader">
            <span className="loader_text">loding...</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map(movie => (
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
              />
            ))}
          </div>
        )}
      </section>
    )
  }
}

export default Home;
