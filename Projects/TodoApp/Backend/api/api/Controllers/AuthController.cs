using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public AuthController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] UserCredentials credentials)
    {
        Console.WriteLine(credentials);
        // Replace with actual user validation logic
        if (credentials.Username != "testuser" || credentials.Password != "password123")
        {
            return Unauthorized("Invalid username or password.");
        }

        // Create claims
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, credentials.Username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        // Get JWT configuration values
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expires = DateTime.Now.AddMinutes(double.Parse(_configuration["Jwt:ExpiresInMinutes"]));

        // Create the token
        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: expires,
            signingCredentials: creds
        );

        return Ok(new { Token = new JwtSecurityTokenHandler().WriteToken(token) });
    }
}

public class UserCredentials
{
    public string Username { get; set; }
    public string Password { get; set; }
}
