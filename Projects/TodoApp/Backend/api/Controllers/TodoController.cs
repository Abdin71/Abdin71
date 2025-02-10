using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]

public class TodoController : ControllerBase
{
    private TodoAPIDbContext dbContext;
    private readonly ILogger<TodoController> _logger;
    public TodoController(ILogger<TodoController> logger, TodoAPIDbContext dbContext)
    {

        _logger = logger;
        this.dbContext = dbContext;
    }


    [HttpGet(Name = "getTodoS")]
    public async Task<IActionResult> GetTodos()
    {
        return Ok(await dbContext.Todo.ToListAsync());
    }

    [HttpPost(Name = "addTodo")]
    public async Task<IActionResult> AddTodo(Todo Todo)
    {
        var todo = new Todo()
        {
            id = Guid.NewGuid(),
            title = Todo.title,
            deadline_date = Todo.deadline_date,
            created_at = Todo.created_at,
            updated_at = Todo.updated_at,
            tag = Todo.tag,
            priority = Todo.priority,
            status = Todo.status,
        };
        await dbContext.Todo.AddAsync(todo);
        await dbContext.SaveChangesAsync();
        return Ok(todo);
    }

    [HttpGet]
    [Route("{id:guid}")]
    public async Task<IActionResult> GetTodo([FromRoute] Guid id)
    {
        var todo = await dbContext.Todo.FindAsync(id);
        if (todo == null)
        {
            return NotFound();
        }
        return Ok(todo);
    }

    [HttpPut]
    [Route("{id:guid}")]
    public async Task<IActionResult> UpdateTodo([FromRoute] Guid id, Todo Todo)
    {
        var todo = await dbContext.Todo.FindAsync(id);
        if (todo != null)
        {
            todo.title = Todo.title;
            todo.deadline_date = Todo.deadline_date;
            todo.created_at = Todo.created_at;
            todo.updated_at = Todo.updated_at;
            todo.tag = Todo.tag;
            todo.priority = Todo.priority;
            todo.status = Todo.status;

            await dbContext.SaveChangesAsync();
            return Ok(todo);
        }
        return NotFound();
    }

    [HttpDelete]
    [Route("{id:guid}")]
    public async Task<IActionResult> DeleteTodo(Guid id)
    {
        var todo = await dbContext.Todo.FindAsync(id);
        if (todo != null)
        {
            dbContext.Remove(todo);
            dbContext.SaveChanges();
            return Ok(todo);
        }
        return NotFound();
    }
}