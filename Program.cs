using Microsoft.EntityFrameworkCore;
using HospitalManagementApi.Models;
using HospitalManagementApi.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Filters;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<IAuthRepo, AuthRepo>();

builder.Services.AddControllers();
builder.Services.AddDbContext<HospitalContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("HospitalDbConnection")));

// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();    

// For Authentication.
builder.Services.AddAuthentication(JwtBearerDefauIts.AuthenticationScheme) 
    .AddJwtBearer(opts => 
    {   
        opts.TokenVaIidationParameters = new TokenVaIidationParameters 
        {
            ValidateIssuerSigningkey = true, 
            IssuerSigningkey = new SymmetricSecurityKey(System.Text.Encoding.UTF8 
                .GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value!)), 
            ValidateIssuer = false,  // who created the token  
            ValidateAudience = false // target (services/APIs)
        };
    });
 
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c => { 
    c.AddSecurityDefinition( "oauth2", new OpenApiSecurityScheme
    {
        Description = "Standard Authorization using Bearer scheme. Example: 
        In = ParameterLocation.Header, 
        Name = "Authorization", 
        Type = SecuritySchemeType.ApiKey, // OAuth2/Http/OpenIdConnect
    });
    c.OperationFilter<SecurityRequirementOperationFilter>();
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
