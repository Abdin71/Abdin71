namespace api;

public class Book
{
    public DateOnly? publication_date { get; set; }
    public DateOnly date_added { get; set; }
    public int pages { get; set; }
    public Guid id { get; set; }
    public required string title { get; set; }
    public string? genre { get; set; }
    public string? publisher { get; set; }
    public string? isbn { get; set; }
    public string? author { get; set; }
}

public class NewBook
{
    public DateOnly? publication_date { get; set; }
    public DateOnly date_added { get; set; }
    public int pages { get; set; }
    public required string title { get; set; }
    public string? genre { get; set; }
    public string? publisher { get; set; }
    public string? isbn { get; set; }
    public string? author { get; set; }
}