using Microsoft.EntityFrameworkCore;
using PeoplehawkRepositories;
using PeoplehawkRepositories.Implementation;
using PeoplehawkRepositories.Interface;
using PeoplehawkServices;
using PeoplehawkServices.Implementation;
using PeoplehawkServices.Interface;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultSQLConnection"));
});
builder.Services.AddAutoMapper(typeof(MappingConfig));
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<ICourseInterestRepository , CourseInterestRepository>();
builder.Services.AddScoped<IChartRepository , ChartRepository>();
builder.Services.AddScoped<IResumeFileRepository, ResumeFileRepository>();
builder.Services.AddTransient(typeof(IGenericService<,>), typeof(GenericService<,>));
builder.Services.AddTransient<ICourseInterestService, CourseInterestService>();
builder.Services.AddTransient<IChartService, ChartService>();
builder.Services.AddTransient<IResumeFileService, ResumeFileService>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
