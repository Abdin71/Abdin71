using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuotesController : ControllerBase
{
    private BooksAPIDbContext dbContext;
    private readonly ILogger<QuotesController> _logger;
    public QuotesController(ILogger<QuotesController> logger, BooksAPIDbContext dbContext) {

    _logger = logger;
    this.dbContext = dbContext;
    }

    [HttpGet(Name = "getQuotes")]
    public async Task < IActionResult > GetQuotes() {
    return Ok(await dbContext.Quotes.OrderByDescending(q => q.date_added).Take(5).ToListAsync());
    }

    [Authorize]
    [HttpPost(Name = "addQuote")]
    public async Task < IActionResult > AddQuote(CreateQuote Quote) {
        var quote = new Quote() {
                id = Guid.NewGuid(),
                quote = Quote.quote,
                author = Quote.author,
                book = Quote.book,
                date_added = Quote.date_added
                
        };
        await dbContext.Quotes.AddAsync(quote);
        await dbContext.SaveChangesAsync();
        return Ok(quote);
    }

    [HttpPut]
    [Route("{id:guid}")]
    public async Task < IActionResult > UpdateQuote([FromRoute] Guid id, CreateQuote Quote) {
        var quote = await dbContext.Quotes.FindAsync(id);
        if (quote != null) {
            quote.quote = Quote.quote;
            quote.author = Quote.author;
            quote.book = Quote.book;
        
            await dbContext.SaveChangesAsync();
            return Ok(quote);
        }
        return NotFound();
    }

    [HttpDelete]
    [Route("{id:guid}")]
    public async Task < IActionResult > DeleteQuote(Guid id) {
        var quote = await dbContext.Quotes.FindAsync(id);
        if (quote != null) {
            dbContext.Remove(quote);
            dbContext.SaveChanges();
            return Ok(quote);
        }
        return NotFound();
    }
}