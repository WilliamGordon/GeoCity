using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace geocity.application.Exceptions.Trip
{
    public class AllRouteNoteGeneratedException : Exception
    {
        public AllRouteNoteGeneratedException()
        {

        }

        public AllRouteNoteGeneratedException(string message) : base(message)
        {

        }

        public AllRouteNoteGeneratedException(string message, Exception innerException) : base(message, innerException)
        {

        }
    }
}
