
const searchBooks = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = ''
    if (searchText === '') {
        const search = document.getElementById('error-message');
        const p = document.createElement('p');
        p.innerHTML = `please write something to dispaly `;
        search.appendChild(p);
    }
    else {
        const url = `http://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayBooks(data))

    }
}

const displayBooks = data => {
    console.log(data.docs.length);
    const books = data.docs;
    const searchResult = document.getElementById('search-result')
    searchResult.textContent = '';
    if (books.length === 0) {
        const search = document.getElementById('error-message');
        const p = document.createElement('p');
        p.innerHTML = `no result found `;
        search.appendChild(p);
    }
    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
     <div class="card  border border-2 border-danger rounded">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <p>Author :${book.author_name}</p>
                    <p class="card-text">Publish Date:${book.first_publish_year}</p>
                     </div>
            </div>
     `;
        searchResult.appendChild(div);
    });
}

