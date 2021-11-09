using Microsoft.EntityFrameworkCore;
using AutoMapper;
using MediatR;
using geocity.application.Common;
using geocity.infrastructure;
using System;

var builder = WebApplication.CreateBuilder(args);
var mapperConfig = new MapperConfiguration(mc =>
{
    mc.AddProfile(new MappingProfile());
});

builder.Services.AddSingleton(mapperConfig.CreateMapper());
builder.Services.AddMediatR(AppDomain.CurrentDomain.Load("geocity.application"));
builder.Services.AddDbContext<GeoCityDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("geocity-db")));
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
