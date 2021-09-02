const searchResult = document.getElementById('search-result');
const totalREsult = document.getElementById('total-result');
const errorDiv = document.getElementById('error-message');
const errorDiv2 = document.getElementById('error-div');

const searchBooks = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // clear input field 
    searchField.value = ''

    // clear text 
    searchResult.innerHTML = ''
    totalREsult.innerText = ''
    errorDiv.innerText = ''
    if (searchText === '') {
        const p = document.createElement('p');
        p.innerText = `please write something to dispaly `;
        errorDiv.appendChild(p);
    }
    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => totalResult(data))
}

const totalResult = (result) => {
    const p = document.createElement('p');
    p.innerText = ` search result found is ${result.numFound}`
    totalREsult.appendChild(p);
    displayBooks(result);

}

const displayBooks = (result) => {
    const books = result.docs;
    errorDiv2.innerText = ''
    searchResult.textContent = '';
    if (books.length === 0) {
        const p = document.createElement('p');
        p.innerText = `no result found `;
        errorDiv2.appendChild(p);
    }
    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
     <div class="card  border border-2 border-danger rounded d-flex justify-content-center align-items-center">
                <div class="card-body">
                
      <img class ="img-fluid" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                    <h5 class="card-title">${book.title}</h5>
                    <p>Author :${book.author_name}</p>
                    <p class="card-text">Publish Date:${book.first_publish_year}</p>
                     </div>
            </div>
     `;
        searchResult.appendChild(div);
    });

}
