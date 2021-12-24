using AutoMapper;
using geocity.application.Cities.Queries;
using geocity.application.Itinary.Queries;
using geocity.application.ItinaryPlace.Queries;
using geocity.application.Place.Queries;
using geocity.application.Trip.Queries;
using geocity.application.TripUser.Queries;
using geocity.domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Common
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<City, CityDto>();
            CreateMap<CityDto, City>();
            CreateMap<geocity.domain.Entities.Itinary, ItinaryDto>();
            CreateMap<ItinaryDto, geocity.domain.Entities.Itinary>();
            CreateMap<geocity.domain.Entities.Trip, TripDto>();
            CreateMap<TripDto, geocity.domain.Entities.Trip>();
            CreateMap<geocity.domain.Entities.TripUser, TripUserDto>();
            CreateMap<TripUserDto, geocity.domain.Entities.TripUser>();
            CreateMap<geocity.domain.Entities.ItinaryPlace, ItinaryPlaceDto>();
            CreateMap<ItinaryPlaceDto, geocity.domain.Entities.ItinaryPlace>();
            CreateMap<geocity.domain.Entities.Place, PlaceDto>();
            CreateMap<PlaceDto, geocity.domain.Entities.Place>();
        }
    }
}
