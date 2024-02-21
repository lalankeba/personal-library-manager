let library = [];

// 1. Add new book

const addBook = (title, author) => {
    library.push( {title, author, readStatus: false} );
}

addBook("Rich Dad Poor Dad", "Robert T. Kiyosaki");
addBook("Madol Duwa", "Martin Wikrmasinghe");
addBook("Ikigai", "Héctor García");
addBook("The Last Train to London", "Meg Waite Clayton");
addBook("Atomic Habits", "James Clear");

console.log(library);

// 2. Mark a book as read

const markAsRead = (title) => {
    let bookIndex = library.findIndex( (currentBook) => currentBook.title === title );
    if (bookIndex > -1) {
        library[bookIndex].readStatus = true;
    }
}

markAsRead("Madol Duwa");
markAsRead("Atomic Habits");

console.log(library);

// 3. Remove a book

const removeBook = (title) => {
    let bookIndex = library.findIndex( (currentBook) => currentBook.title === title );
    if (bookIndex > -1) {
        library.splice(bookIndex, 1);
    }
}

removeBook("Ikigai");

console.log(library);

// 4. List all unread books

const listUnread = () => {
    let unreadBooks = library.filter( (currentBook) => !currentBook.readStatus );
    console.log(unreadBooks);
}

listUnread();

// 5. Find books by author

const findBooksByAuthor = (author) => {
    let booksByAuthor = library.filter( (currentBook) => currentBook.author === author );
    return booksByAuthor;
}

let booksByAuthor = findBooksByAuthor("James Clear");
console.log(booksByAuthor);


// 6. Check if the library includes a book by title

const bookExists = (title) => {
    return library.some( (currentBook) => currentBook.title === title );
}

console.log( "Madol Duwa exists: " + bookExists("Madol Duwa") );
console.log( "Ikigai exists: " + bookExists("Ikigai") );