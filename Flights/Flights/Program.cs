using Flights;
using Flights.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<Entities>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddSwaggerGen(c =>
{
    c.DescribeAllParametersInCamelCase();
    c.AddServer(new OpenApiServer
    {
        Description = "Development Server",
        Url = "https://localhost:7272"
    });

    c.CustomOperationIds(x => $"{x.ActionDescriptor.RouteValues["action"] + x.ActionDescriptor.RouteValues["controller"]}");
});

builder.Services.AddScoped<Entities>();

var app = builder.Build();
var entities = app.Services.CreateScope().ServiceProvider.GetService<Entities>();

void SeedData(IHost app) {
    Seed seed = new Seed(entities);
    seed.SeedData();

    entities.SaveChanges();
}



app.UseCors(c => c.WithOrigins("*").AllowAnyMethod().AllowAnyHeader());

entities.Database.EnsureCreated(); 

app.UseSwagger().UseSwaggerUI();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
