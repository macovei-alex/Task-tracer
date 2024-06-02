using Microsoft.Extensions.Options;
using Server.Services;
using Server.Settings;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSwaggerGen(c =>
{
	var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
	var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
	c.IncludeXmlComments(xmlPath);
});

builder.Services.AddSingleton<ITasksCollectionService, TasksCollectionService>();

builder.Services.Configure<MongoDBSettings>(builder.Configuration.GetSection(nameof(MongoDBSettings)));
builder.Services.AddSingleton<IMongoDBSettings>(serviceProvider => serviceProvider.GetRequiredService<IOptions<MongoDBSettings>>().Value);

builder.Services.AddCors(options =>
{
	options.AddPolicy(name: "CorsPolicy", policy =>
	{
		policy.WithOrigins("http://localhost:4200")
		.AllowAnyHeader()
		.AllowAnyMethod()
		.AllowCredentials();
	});
});
builder.Services.AddSignalR();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");
app.UseWebSockets(new WebSocketOptions
{
	KeepAliveInterval = TimeSpan.Zero,
});

app.UseRouting();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
	endpoints.MapHub<NotificationsHub>("/hub/notifications");
});

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
