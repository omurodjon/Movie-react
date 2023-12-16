import { Link } from 'react-router-dom';
import '../../assets/styles/main.scss';
import React, { useEffect, useState } from 'react';

interface MainProps {
  id: string;
  title: string;
  genre: Genre;
  numberInStock: number;
  dailyRentalRate: number;
}

interface Genre {
  id: string;
  name: string;
}

function GetMovies(props: MainProps) {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(prevLiked => !prevLiked);
  };

  return (
    <tr>
      <td>{props.title}</td>
      <td>{props.genre.name}</td>
      <td>{props.numberInStock}</td>
      <td>{props.dailyRentalRate}</td>
      <td>
        <button className={'btn border-0'} onClick={handleLike}>
          {liked ? '❤️' : '🤍'}
        </button>
      </td>
    </tr>
  );
}

function Movies() {
  const [movies, setMovies] = useState<MainProps[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>('All Genres');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [moviesPerPage] = useState<number>(5);
  const [filteredMovies, setFilteredMovies] = useState<MainProps[]>([]);

  useEffect(() => {
    async function fetchMovies() {
      const data = await fetch('http://localhost:4000/api/movies');
      const response = await data.json();
      setMovies(response);
      setFilteredMovies(response);
    }
    fetchMovies();
  }, []);

  useEffect(() => {
    async function fetchGenres() {
      const data = await fetch('http://localhost:4000/api/genres');
      const response = await data.json();
      setGenres(response);
    }
    fetchGenres();
  }, []);

  const filterMoviesByGenre = (genreName: string) => {
    if (genreName === 'All Genres') {
      setFilteredMovies(movies);
    } else {
      setFilteredMovies(movies.filter(movie => movie.genre.name === genreName));
    }
  };

  const handleGenreClick = (genreName: string) => {
    setSelectedGenre(genreName);
    setCurrentPage(1);
    filterMoviesByGenre(genreName);
    setSearchQuery('');
  };

  const handleSearch = () => {
    filterMoviesByGenre(selectedGenre || 'All Genres');
    setFilteredMovies(prevFilteredMovies =>
      prevFilteredMovies.filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    handleSearch();
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <div className="row">
      <div className="col-3 mt-4">
        <div className="genres">
          <h3>Genres</h3>
          <ul className="list-group">
            <li
              key="All Genres"
              className={`list-group-item ${selectedGenre === 'All Genres' ? 'selected-genre' : ''}`}
              onClick={() => handleGenreClick('All Genres')}
            >
              All Genres
            </li>
            {genres.map(genre => (
              <li
                key={genre.id}
                className={`list-group-item ${selectedGenre === genre.name ? 'selected-genre' : ''}`}
                onClick={() => handleGenreClick(genre.name)}
              >
                {genre.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="col mt-4">
        <p>
          Showing <span className="count-movie">{filteredMovies.length}</span> movies in the database.
        </p>
        <div className="d-flex align-items-center">
          <input
            type="text"
            name="query"
            className="form-control my-3"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <Link className="btn btn-primary" to={'new'}>
          Create New Movie
        </Link>
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="clickable">
                Title <i className="fa fa-sort-asc"></i>
              </th>
              <th className="clickable">Genre</th>
              <th className="clickable">Stock</th>
              <th className="clickable">Rate</th>
              <th className="clickable">Like</th>
            </tr>
          </thead>
          <tbody>
            {currentMovies.map(movie => (
              <GetMovies
                key={movie.id}
                id={movie.id}
                title={movie.title}
                genre={movie.genre}
                numberInStock={movie.numberInStock}
                dailyRentalRate={movie.dailyRentalRate}
              />
            ))}
          </tbody>
        </table>
        <nav>
          <ul className="pagination">
            {Array.from({
              length: Math.ceil(filteredMovies.length / moviesPerPage)
            }).map((_, index) => (
              <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

function Main() {
  return (
    <main className="container">
      <Movies />
    </main>
  );
}

export default Main;
