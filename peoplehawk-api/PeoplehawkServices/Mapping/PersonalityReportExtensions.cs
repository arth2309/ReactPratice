﻿using PeoplehawkRepositories.Models;
using PeoplehawkServices.Dto;

namespace PeoplehawkServices.Mapping;
public static class PersonalityReportExtensions
{

    public static PersonalityReportDTO ToDto(this PersonalityReport personalityReport) 
    {
        return new PersonalityReportDTO
        {
            Id = personalityReport.Id,
            UserId = personalityReport.UserId,
            QuizId = personalityReport.QuizId,
            Answer = personalityReport.Answer,
            TestNo = personalityReport.TestNo,
        };
    }

    public static PersonalityReport FromDto(this PersonalityReportDTO personalityReportDTO)
    {
        return new PersonalityReport
        {
            UserId = personalityReportDTO.UserId,
            QuizId = personalityReportDTO.QuizId,
            Answer = personalityReportDTO.Answer,
            TestNo = personalityReportDTO.TestNo,

        };
    }

    public static List<PersonalityReportDTO> ToDtoList(this List<PersonalityReport> personalityReports) 
    {
        return personalityReports.Select(p => p.ToDto()).OrderBy(x=>x.Id).ToList();
    }
}
