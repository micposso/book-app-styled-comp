import React, { Component } from 'react'
import styled, { css } from 'styled-components';
import dropArrow from '../icons/arrow-drop.svg';

const ShelveSelection = styled.div`
    position: absolute;
    right: 0;
    bottom: -10px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #60ac5d;
    background-image: url(${dropArrow});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 20px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    & > select {
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
      }
`;


class BookShelfComponent extends Component{
    render(){
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.headline}</h2>
                <div className="bookshelf-books">        
                    <ol className="books-grid">
                        {this.props.books.length ?
                        this.props.books.map((book, index) => 
                        <li key={index}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})` }}></div>
                                    <ShelveSelection>
                                        <select value={book.shelf} onChange={(e) => this.props.handleChangeShelve(book, e.target.value)}>
                                            <option value="none">Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </ShelveSelection>
                                </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors}</div>
                        </li>
                    )
                    :
                    <h2>{this.props.message}</h2>
                    }
                    </ol>
                </div>
          </div>
        )
    }
}


export default BookShelfComponent