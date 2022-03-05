const { nanoid } = require('nanoid');
const book = require('./book');

const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = (pageCount === readPage);

  if (name === undefined) {
      /* JSON : 400
        "status": "fail",
        "message": "Gagal menambahkan buku. Mohon isi nama buku",
      */
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);

    return response;
  }

  if (pageCount < readPage) {
      /* JSON : 400
        "status": "fail",
        "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      */
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);

    return response;
  }

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
  //ditaruh diluar supaya apapun selain isSuccess == True jadi False meski alasan unknown
  response.code(500);

  return response;
};

module.exports = { addBookHandler };