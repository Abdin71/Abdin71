namespace api;
public class Todo
{
    public DateOnly deadline_date { get; set; }
    public DateOnly created_at { get; set; }
    public DateOnly updated_at { get; set; }
    public string? tag { get; set; }
    public Guid id { get; set; }
    public required string title { get; set; }
    public string? priority { get; set; }
    public string? status { get; set; }
}