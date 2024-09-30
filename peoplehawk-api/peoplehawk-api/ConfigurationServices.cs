using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using PeoplehawkRepositories.Interface;
using PeoplehawkServices.Interface;
using System.Text;

namespace peoplehawk_api;
public static class ConfigurationServices
{
    public static void SystemConfigurationServices(this IServiceCollection services)
    {

        services.Scan(selector => selector
             .FromAssemblies(
             typeof(IGenericRepository<>).Assembly,
             typeof(IGenericService<>).Assembly
             )
         .AddClasses()
         .AsMatchingInterface()
         .WithScopedLifetime());
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
                In = ParameterLocation.Header,
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
