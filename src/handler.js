const { nanoid } = require('nanoid');
const book = require('./book');

const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = (pageCount === readPage);

  const createBook = {
    id, name, year,
    author, summary, publisher,
    pageCount, readPage,
    finished, reading,
    insertedAt, updatedAt,
  };

  book.push(createBook);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
      /* JSON :
        "status": "success",
        "message": "Buku berhasil ditambahkan",
        "data": {
        "bookId": "1L7ZtDUFeGs7VlEt"
        }
      */
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);

    return response;
  }

  const response = h.response({
      /* JSON :
        "status": "error",
        "message": "Buku gagal ditambahkan"
      */
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);

  return response;
};

module.exports = { addBookHandler };