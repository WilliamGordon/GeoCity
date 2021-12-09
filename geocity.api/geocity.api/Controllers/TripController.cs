﻿using geocity.application.Cities.Commands.CreateCity;
using geocity.application.Composit;
using geocity.application.Itinary.Commands.CreateItinary;
using geocity.application.Trip.Commands.CreateTrip;
using geocity.application.Trip.Queries;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace geocity.api.Controllers
{
    public class TripController : ApiControllerBase
    {
        // GET: CityController/Details/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TripDto>> Details(int id)
        {
            return await Mediator.Send(new GetTripQuery { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<int>> PostAsync(CreateTripDto tripData)
        {
            // First create the city if not already
            var cityId = await Mediator.Send(new CreateCityCommand 
            { 
                Name = tripData.CityName,
                Latitude = tripData.CityLatitude,
                Longitude = tripData.CityLongitude,
            });

            // Second create the Trip itself
            var tripId = await Mediator.Send(new CreateTripCommand
            {
                CityId = cityId,
                Name = tripData.Name,
                Description = tripData.Description,
                NbDays = tripData.NbDays,
            });

            // Create the itinaries depending on the number of days selected
            for (int i = 1; i <= tripData.NbDays; i++)
            {
                await Mediator.Send(new CreateItinaryCommand
                {
                    TripId = tripId,
                    Day = i,
                });
            }

            return tripId;
        }
    }
}