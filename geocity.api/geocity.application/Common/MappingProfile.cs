using AutoMapper;
using geocity.application.Cities.Queries;
using geocity.application.Itinary.Queries;
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
        }
    }
}
