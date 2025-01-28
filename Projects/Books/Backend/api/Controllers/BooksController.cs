using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private BooksAPIDbContext dbContext;
    private readonly ILogger<BooksController> _logger;
    public BooksController(ILogger<BooksController> logger, BooksAPIDbContext dbContext) {

    _logger = logger;
    this.dbContext = dbContext;
    }

   
    [HttpGet(Name = "getBooks")]
    public async Task < IActionResult > GetBooks() {
    return Ok(await dbContext.Books.ToListAsync());
    }

    [HttpPost(Name = "addBook")]
    public async Task < IActionResult > AddBook(NewBook Book) {
        var book = new Book() {
                id = Guid.NewGuid(),
                title = Book.title,
                publication_date = Book.publication_date,
                date_added = Book.date_added,
                pages = Book.pages,
                genre = Book.genre,
                publisher = Book.publisher,
                isbn = Book.isbn,
                author = Book.author
        };
        await dbContext.Books.AddAsync(book);
        await dbContext.SaveChangesAsync();
        return Ok(book);
    }

    [HttpGet]
    [Route("{id:guid}")]
    public async Task < IActionResult > GetBook([FromRoute] Guid id) {
        var book = await dbContext.Books.FindAsync(id);
        if (book == null) {
            return NotFound();
        }
        return Ok(book);
    }

    [HttpPut]
    [Route("{id:guid}")]
    public async Task < IActionResult > UpdateBook([FromRoute] Guid id, NewBook Book) {
        var book = await dbContext.Books.FindAsync(id);
        if (book != null) {
            book.title = Book.title;
            book.publication_date = Book.publication_date;
            book.date_added = Book.date_added;
            book.pages = Book.pages;
            book.genre = Book.genre;
            book.publisher = Book.publisher;
            book.isbn = Book.isbn;
            book.author = Book.author;
            await dbContext.SaveChangesAsync();
            return Ok(book);
        }
        return NotFound();
    }

    [HttpDelete]
    [Route("{id:guid}")]
    public async Task < IActionResult > DeleteBook(Guid id) {
        var book = await dbContext.Books.FindAsync(id);
        if (book != null) {
            dbContext.Remove(book);
            dbContext.SaveChanges();
            return Ok(book);
        }
        return NotFound();
    }
}
