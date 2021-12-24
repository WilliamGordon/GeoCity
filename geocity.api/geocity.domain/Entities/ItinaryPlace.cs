using System.ComponentModel.DataAnnotations.Schema;

namespace geocity.domain.Entities
{
    public class ItinaryPlace
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int ItinaryId { get; set; }
        public Itinary Itinary { get; set; }
        public int PlaceId { get; set; }
        public Place Place { get; set; }
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public decimal? Duration { get; set; }
    } 
}
