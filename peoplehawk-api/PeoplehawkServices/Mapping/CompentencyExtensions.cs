using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeoplehawkServices.Mapping
{
    public static class CompentencyExtensions
    {
        public static CompetencyDTO? ToDto(this Competency competency)
        {
            return new CompetencyDTO
            {
               Id = competency.Id,
               Title = competency.Title,
               Competency_part = competency.Competency_part,
            };
        }

        public static Competency? FromDto(this CompetencyDTO competencyDTO)

        {
 
            return new Competency
            {
                Title = competencyDTO.Title,
                Competency_part = competencyDTO.Competency_part,

            };
        }
        public static List<CompetencyDTO>? ToDtoList(this List<Competency> competencys)
        {
            return competencys.Select(quiz => quiz.ToDto()).OrderBy(a => a.Id).ToList();
        }

    }
}
