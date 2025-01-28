using Microsoft.EntityFrameworkCore;

namespace api;

public class BooksAPIDbContext: DbContext {
    public BooksAPIDbContext(DbContextOptions options): base(options) {}
    public DbSet < Book > Books { get; set;}
     public DbSet < Quote > Quotes { get; set;}
}