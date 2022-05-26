using AutoMapper;
using geocity.application.User.Queries;
using geocity.application.Itinary.Queries;
using geocity.application.Trip.Queries;
using geocity.application.TripUser.Queries;
using geocity.domain.Entities;
using geocity.application.Entities.ItinaryPointOfInterest.Queries;
using geocity.application.Entities.PointOfInterest.Queries;
using geocity.application.Entities.PointOfCrossing.Queries;
using geocity.application.Entities.TripUserFavorite.Queries;
using geocity.application.Entities.TripUserRating.Queries;
using geocity.application.City.Queries;

namespace geocity.application.Common
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<geocity.domain.Entities.City, CityDto>();
            CreateMap<CityDto, geocity.domain.Entities.City>();

            CreateMap<geocity.domain.Entities.Itinary, ItinaryDto>();
            CreateMap<ItinaryDto, geocity.domain.Entities.Itinary>();

            CreateMap<geocity.domain.Entities.ItinaryPointOfInterest, ItinaryPointOfInterestDto>();
            CreateMap<ItinaryPointOfInterestDto, geocity.domain.Entities.ItinaryPointOfInterest>();

            CreateMap<geocity.domain.Entities.PointOfCrossing, PointOfCrossingDto>();
            CreateMap<PointOfCrossingDto, geocity.domain.Entities.PointOfCrossing>();

            CreateMap<geocity.domain.Entities.PointOfInterest, PointOfInterestDto>();
            CreateMap<PointOfInterestDto, geocity.domain.Entities.PointOfInterest>();

            CreateMap<geocity.domain.Entities.Trip, TripDto>();
            CreateMap<TripDto, geocity.domain.Entities.Trip>();

            CreateMap<geocity.domain.Entities.TripUser, TripUserDto>();
            CreateMap<TripUserDto, geocity.domain.Entities.TripUser>();

            CreateMap<geocity.domain.Entities.TripUserFavorite, TripUserFavoriteDto>();
            CreateMap<TripUserFavoriteDto, geocity.domain.Entities.TripUserFavorite>();

            CreateMap<geocity.domain.Entities.TripUserRating, TripUserRatingDto>();
            CreateMap<TripUserRatingDto, geocity.domain.Entities.TripUserRating>();

            CreateMap<geocity.domain.Entities.User, UserDto>();
            CreateMap<UserDto, geocity.domain.Entities.User>();
        }
    }
}
