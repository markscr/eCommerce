using API.Data;
using API.Middleware;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

var specificOrgins = "AppOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: specificOrgins,
        policy =>
        {
            policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
            //policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:3000");
        }
    );
});

builder.Services.AddTransient<ExceptionMiddleware>();

builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) { }

app.UseCors(specificOrgins);

app.MapControllers();

DBInitializer.InitDb(app);

app.Run();
