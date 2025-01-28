namespace api;

public class Quote
{
    public Guid id { get; set; }
    public string? quote { get; set; }
    public string? author { get; set; }
    public string? book { get; set; }
    public DateOnly date_added { get; set; }

}

public class CreateQuote
{
    public string? quote { get; set; }
    public string? author { get; set; }
    public string? book { get; set; }
    public DateOnly date_added { get; set; }

}