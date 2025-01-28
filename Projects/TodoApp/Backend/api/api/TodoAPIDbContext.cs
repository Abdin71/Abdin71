using Microsoft.EntityFrameworkCore;

namespace api;

public class TodoAPIDbContext : DbContext
{
    public TodoAPIDbContext(DbContextOptions options) : base(options) { }
    public DbSet<Todo> Todo { get; set; }
}