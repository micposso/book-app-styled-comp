import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

//import SearchComponent from './components/SearchComponent.js'
import BookShelfComponent from './components/BookShelfComponent'
import './css/App.css'
//import { getAll } from './BooksAPI.js';

class BooksApp extends React.Component {
  state = {
    books: [],
    message: "You dont have any books on this shelf",
    searchQuery: '',
    displayBooks: [],
  }

  updateSearch = (query) => {

    if ( query.length >= 0 ) {
        this.setState({
            searchQuery: query
        });
        BooksAPI.search(query, 20).then((searchedBooks) => {
            const displayBooks = searchedBooks ? searchedBooks : [];
            if ( searchedBooks.length > 0 ) {
                const books = this.state.books;
                    for ( const displayBook of displayBooks) {
                        const shelfBook = books.find(book => book.id === displayBook.id )
                        if ( shelfBook ) {
                            displayBook.shelf = shelfBook.shelf;
                        }
                        this.setState({ displayBooks });
                    }
            }
            
        })
    } else {
        this.setState({
            displayBooks: []
        });
    }

}

  handleChangeShelve(book, shelf) {
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then((books) => {
        this.setState({ books });
      })
    })
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then(books => this.setState({ books }))
    .catch(err => console.log('this is an error in the book API', err))
  }

  render() {
    return (
      <div className="app">

              {/* start of the seach component */}
              <div>
                <div className="search-books">
                    <div className="search-books-bar">
                        {/*<Link to="/" className="close-search">Close</Link>*/}
                        <div className="search-books-input-wrapper">
                            <input 
                                type="text"
                                value={this.state.searchQuery}
                                onChange={(event) => this.updateSearch(event.target.value)}
                            />
                        </div>
                    </div>
                <div className="search-books-results">
                <ol className="books-grid">
                <h2>{this.state.notFound}</h2>
                { this.state.displayBooks ? 
                this.state.displayBooks.map((book, index) => 
                <li key={index}>
                    <div className="book">
                        <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                            <select onChange={(e) => this.props.handleChangeShelve(book, e.target.value)}>
                                <option>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                            </div>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                </li>
                ) : <h2>Type a search term to display books</h2> }
            </ol>
                </div>
                </div>
          </div>{/* end of the seach component */}


          <div>
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                  <BookShelfComponent headline={'Currently Reading'} message={this.state.message} handleChangeShelve={this.handleChangeShelve.bind(this)} books={this.state.books.filter( book => book.shelf === "currentlyReading")} />
                  <BookShelfComponent headline={'Want To Read'} message={this.state.message} handleChangeShelve={this.handleChangeShelve.bind(this)} books={this.state.books.filter( book => book.shelf === "wantToRead")} />
                  <BookShelfComponent headline={'Read Books'} message={this.state.message} handleChangeShelve={this.handleChangeShelve.bind(this)} books={this.state.books.filter( book => book.shelf === "read")} />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
        </div>
        
      </div>
    )
  }
}

export default BooksApp

