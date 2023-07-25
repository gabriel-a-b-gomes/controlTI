global using Microsoft.EntityFrameworkCore;
global using ControleTiAPI.Models;
global using ControleTiAPI.Data;
using ControleTiAPI.IServices;
using ControleTiAPI.Services;
using System.Text.Json.Serialization;
using Microsoft.Identity.Web;
using ControleTiAPI.APIBehavior;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using ControleTiAPI.Configuration;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");


builder.Services.AddDbContext<DataContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddDbContext<IdentityContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("ADMIN", policy => policy.RequireClaim("ROLE", "ADMIN"));
    options.AddPolicy("EVERYONE", policy => policy.RequireClaim("ROLE", "PREVENTIVES", "DEVICES", "ADMIN"));
    options.AddPolicy("DEVICES", policy => policy.RequireClaim("ROLE", "DEVICES", "ADMIN"));
});

builder.Services.AddControllers().ConfigureApiBehaviorOptions(BadRequestsBehavior.Parse);
builder.Services.AddControllers().AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();


builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IDepartmentService, DepartmentService>();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<INobreakService, NobreakService>();
builder.Services.AddScoped<ISwitchService, SwitchService>();
builder.Services.AddScoped<IDVRService, DVRService>();
builder.Services.AddScoped<IRouterService, RouterService>();
builder.Services.AddScoped<IPrinterService, PrinterService>();
builder.Services.AddScoped<INetworkNodeService, NetworkNodeService>();
builder.Services.AddScoped<ICellphoneService, CellPhoneService>();
builder.Services.AddScoped<IChipService, ChipService>();
builder.Services.AddScoped<IRamalService, RamalService>();
builder.Services.AddScoped<IMemoryService, MemoryService>();
builder.Services.AddScoped<IProcessingUnitService, ProcessingUnitService>();
builder.Services.AddScoped<IStorageService, StorageService>();
builder.Services.AddScoped<IProfileService, ProfileService>();
builder.Services.AddScoped<IComputerService, ComputerService>();
builder.Services.AddScoped<INetworkDeviceService, NetworkDeviceService>();
builder.Services.AddScoped<IHomeService, HomeService>();
builder.Services.AddScoped<IPingService, PingService>();
builder.Services.AddScoped<IFunctionalityService, FunctionalityService>();
builder.Services.AddScoped<IServerHostService, ServerHostService>();
builder.Services.AddScoped<IServerVMService, ServerVMService>();

builder.Services.AddHttpContextAccessor();

builder.Services.AddCors(options =>
{
    var frontendURL = builder.Configuration.GetValue<string>("frontend_url");
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins(frontendURL).AllowAnyMethod().AllowAnyHeader().AllowCredentials()
            .WithExposedHeaders(new string[] { "totalamountofrecords" });
    });
    options.AddPolicy("corsapp", builder =>
    {
        builder.WithOrigins("*").AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthentication();

app.UseUserClaimsMiddleware();

app.UseAuthorization();

app.MapControllers();

app.Run();