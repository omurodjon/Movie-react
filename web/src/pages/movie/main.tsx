
import "../../assets/styles/main.scss"
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
  return (
    <tr>
      <td>{props.title}</td>
      <td>{props.genre.name}</td>
      <td>{props.numberInStock}</td>
      <td>{props.dailyRentalRate}</td>
    </tr>
  );
}

function Movies() {
  const [movies, setMovies] = useState<MainProps[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [moviesPerPage] = useState<number>(5);

  useEffect(() => {
    async function fetchMovies() {
      const data = await fetch('http://localhost:4000/api/movies');
      const response = await data.json();
      setMovies(response);
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

  const handleGenreClick = (genreId: string) => {
    setSelectedGenre((prevSelectedGenre) => (prevSelectedGenre === genreId ? null : genreId));
    setCurrentPage(1);
  };

  const filteredMovies = movies
    .filter((movie) => (selectedGenre ? movie.genre.id === selectedGenre : true))
    .filter((movie) => movie.title.toLowerCase().includes(searchQuery.toLowerCase()));

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
            {genres.map((genre) => (
              <li
                key={genre.id}
                className={`list-group-item ${selectedGenre === genre.id ? 'selected-genre' : ''}`}
                onClick={() => handleGenreClick(genre.id)}
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
        <div className="flex">
          <input
            type="text"
            name="query"
            className="form-control my-3"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="clickable">
                Title <i className="fa fa-sort-asc"></i>
              </th>
              <th className="clickable">Genre</th>
              <th className="clickable">Stock</th>
              <th className="clickable">Rate</th>
            </tr>
          </thead>
          <tbody>
            {currentMovies.map((movie) => (
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
            {Array.from({ length: Math.ceil(filteredMovies.length / moviesPerPage) }).map((_, index) => (
              <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                <a onClick={() => paginate(index + 1)} className="page-link" href="#">
                  {index + 1}
                </a>
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
