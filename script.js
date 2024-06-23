document.addEventListener('DOMContentLoaded', () => {
    const bookForm = document.getElementById('book-form');
    const unreadBooksContainer = document.getElementById('unread-books');
    const readBooksContainer = document.getElementById('read-books');

    const STORAGE_KEY = 'BOOKS_DATA';
    let books = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    function saveBooks() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    }

    function renderBooks() {
        unreadBooksContainer.innerHTML = '';
        readBooksContainer.innerHTML = '';
        
        books.forEach(book => {
            const bookElement = document.createElement('div');
            
            const bookDetails = document.createElement('div');
            bookDetails.classList.add('book-details');
            bookDetails.innerText = `${book.title} - ${book.author} (${book.year})`;
            
            const toggleButton = document.createElement('button');
            toggleButton.innerText = book.isComplete ? 'Belum Selesai membaca' : 'Selesai Membaca';
            toggleButton.addEventListener('click', () => {
                book.isComplete = !book.isComplete;
                saveBooks();
                renderBooks();
            });

            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Hapus data';
            deleteButton.addEventListener('click', () => {
                books = books.filter(b => b.id !== book.id);
                saveBooks();
                renderBooks();
            });

            bookElement.appendChild(bookDetails);
            bookElement.appendChild(toggleButton);
            bookElement.appendChild(deleteButton);

            if (book.isComplete) {
                readBooksContainer.appendChild(bookElement);
            } else {
                unreadBooksContainer.appendChild(bookElement);
            }
        });
    }

    bookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const year = parseInt(document.getElementById('year').value);
        
        const newBook = {
            id: Date.now(),
            title,
            author,
            year,
            isComplete: false,
        };

        books.push(newBook);
        saveBooks();
        renderBooks();

        bookForm.reset();
    });

    renderBooks();
});
