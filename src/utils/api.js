const url = `http://nyx.vima.ekt.gr:3000/api/books`;

export const fetchBooks = (page) => {
    return fetch(
        url,
        {
            method: 'POST',
            body: JSON.stringify({ page }),
        }
    ).then(response => response.json());
}
