using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using PeoplehawkRepositories.Implementation;
using PeoplehawkRepositories.Interface;
using PeoplehawkServices.Implementation;
using PeoplehawkServices.Interface;
using System.Text;

namespace peoplehawk_api;
public static class ConfigurationServices
{
    public static void SystemConfigurationServices(this IServiceCollection services)
    {
        services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
        services.AddScoped<ICourseInterestRepository, CourseInterestRepository>();
        services.AddScoped<IPersonalityReportRepository, PersonalityReportRepository>();
        services.AddScoped<IChartRepository, ChartRepository>();
        services.AddScoped<IResumeFileRepository, ResumeFileRepository>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<ICountryRepository, CountryRepository>();
        services.AddScoped<IQuizRepository, QuizRepository>();
        services.AddScoped<ICompentencyRepository, CompentencyRepository>();
        services.AddScoped<IUserCompentencyDetailRepository, UserCompentencyDetailRepository>();
        services.AddScoped(typeof(IGenericService<>), typeof(GenericService<>));
        services.AddScoped<ICourseInterestService, CourseInterestService>();
        services.AddScoped<IChartService, ChartService>();
        services.AddScoped<IResumeFileService, ResumeFileService>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<ICountryService, CountryService>();
        services.AddScoped<IQuizService, QuizService>();
        services.AddScoped<IPersonalityReportService, PersonalityReportService>();
        services.AddScoped<ICompentencyService, CompentencyService>();
        services.AddScoped<IUserCompentencyDetailService, UserCompentencyDetailService>();

    }

    public static void AuthConfigurationService(this IServiceCollection services, IConfiguration configuration)
    {
        var key = configuration.GetValue<string>("Jwt:Secret");

            services.AddAuthentication(x =>
        {

            x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(x =>
        {
            x.RequireHttpsMetadata = false;
            x.SaveToken = true;
            x.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key)),
                ValidateIssuer = false,
                ValidateAudience = false
            };

        });
    }

    public static void SwaggerConfigurationService(this IServiceCollection services)
    {
        services.AddSwaggerGen(
        options =>
        {
            options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Description = "Bearer yourToken",
                Name = "Authentication",
                In = Microsoft.OpenApi.Models.ParameterLocation.Header,
                Type = SecuritySchemeType.Http,
                Scheme = "Bearer"
            });
            options.AddSecurityRequirement(new OpenApiSecurityRequirement()
{
    {
        new  OpenApiSecurityScheme
        {
             Reference = new OpenApiReference {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
            Name = "Bearer",
            In = ParameterLocation.Header,
            Scheme = "oauth2"
        },

        new List<String> ()
    }
});
        }
        );
    }
}
