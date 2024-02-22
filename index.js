let library = [];

// 1. Add new book

const addBook = (title, author) => {
    library.push( {title, author, readStatus: false} );
}

// 2. Mark a book as read

const markAsRead = (title) => {
    let bookIndex = library.findIndex( (currentBook) => currentBook.title === title );
    if (bookIndex > -1) {
        library[bookIndex].readStatus = true;
    }
}

// 3. Remove a book

const removeBook = (title) => {
    let bookIndex = library.findIndex( (currentBook) => currentBook.title === title );
    if (bookIndex > -1) {
        library.splice(bookIndex, 1);
    }
}

// 4. List all unread books

const listUnread = () => {
    let unreadBooks = library.filter( (currentBook) => !currentBook.readStatus );
    return unreadBooks;
}

// 5. Find books by author

const findBooksByAuthor = (author) => {
    let booksByAuthor = library.filter( (currentBook) => currentBook.author === author );
    return booksByAuthor;
}

// 6. Check if the library includes a book by title

const bookExists = (title) => {
    return library.some( (currentBook) => currentBook.title === title );
}

// -------------------------- providing ui interactions --------------------------

const addBookBtn = document.getElementById("add-book");
const booksTblBdy = document.getElementById("books-table-body");
const listUnreadBooksBtn = document.getElementById("list-unread-books");
const unreadBooksList = document.getElementById("unread-books");
const findBooksByAuthorBtn = document.getElementById("find-books-by-author");
const booksByAuthorList = document.getElementById("books-by-author");
const checkBooksByTitleBtn = document.getElementById("check-books-by-title");
const booksByTitle = document.getElementById("books-by-title");

function addBookBtnClick() {
    let bookTitle = document.getElementById("title");
    let bookAuthor = document.getElementById("author");

    if (bookTitle.value != "" && bookAuthor.value != "") {
        addBook(bookTitle.value, bookAuthor.value);

        bookTitle.value = "";
        bookAuthor.value = "";
        
        displayBooks();
    } else {
        alert("Enter book title and author");
    }    
}

addBookBtn.addEventListener("click", addBookBtnClick);

function removeBookBtnClick(evt) {
    removeBook(evt.currentTarget.bookTitle);

    displayBooks();
}

function readBookBtnClick(evt) {
    markAsRead(evt.currentTarget.bookTitle);

    displayBooks();
}

function displayBooks() {
    booksTblBdy.innerHTML = "";

    library.map( (currentBook) => {
        const tr = document.createElement("tr");
        const tdTitle = document.createElement("td");
        const tdAuthor = document.createElement("td");
        const tdRead = document.createElement("td");
        const tdAction = document.createElement("td");

        const removeBookBtn = document.createElement("button");
        const imgRemove = document.createElement("img");
        imgRemove.setAttribute("src", "images/bin.png");
        imgRemove.setAttribute("class", "btn-image");

        removeBookBtn.bookTitle = currentBook.title;
        removeBookBtn.setAttribute("title", "Remove");
        removeBookBtn.addEventListener("click", removeBookBtnClick);

        tdTitle.textContent = currentBook.title;
        tdAuthor.textContent = currentBook.author;
        tdRead.textContent = currentBook.readStatus;

        removeBookBtn.appendChild(imgRemove);
        tdAction.appendChild(removeBookBtn);

        if (!currentBook.readStatus) {
            const readBookBtn = document.createElement("button");
            const img = document.createElement("img");
            img.setAttribute("src", "images/book.png");
            img.setAttribute("class", "btn-image");
            
            readBookBtn.bookTitle = currentBook.title;
            readBookBtn.setAttribute("title", "Read");
            readBookBtn.addEventListener("click", readBookBtnClick);

            readBookBtn.appendChild(img);
            tdAction.appendChild(readBookBtn);
        }

        tr.appendChild(tdTitle);
        tr.appendChild(tdAuthor);
        tr.appendChild(tdRead);
        tr.appendChild(tdAction);

        booksTblBdy.appendChild(tr);

    } );

}

function listUnreadBooks() {
    let unreadBooks = listUnread();

    unreadBooksList.innerHTML = "";

    unreadBooks.map( (currentBook) => {
        const dt = document.createElement("dt");
        const dd = document.createElement("dd");

        dt.textContent = currentBook.title;
        dd.textContent = currentBook.author;

        unreadBooksList.appendChild(dt);
        unreadBooksList.appendChild(dd);
    } );
}

listUnreadBooksBtn.addEventListener("click", listUnreadBooks);

function listBooksByAuthor() {
    booksByAuthorList.innerHTML = "";

    let authorInput = document.getElementById("find-author");

    let booksByAuthor = findBooksByAuthor(authorInput.value);

    booksByAuthor.map( (currentBook) => {
        const li = document.createElement("li");

        li.textContent = currentBook.title;

        booksByAuthorList.appendChild(li);
    } );

    if (booksByAuthor.length == 0) {
        booksByAuthorList.innerHTML = "";
    }

}

findBooksByAuthorBtn.addEventListener("click", listBooksByAuthor);

function checkBooksByTitle() {
    booksByTitle.innerHTML = "";

    let titleInput = document.getElementById("check-title");

    if (bookExists(titleInput.value)) {
        booksByTitle.innerHTML = "Books available with title: " + titleInput.value;
    } else {
        booksByTitle.innerHTML = "Books not available with title: " + titleInput.value;
    }
}

checkBooksByTitleBtn.addEventListener("click", checkBooksByTitle);