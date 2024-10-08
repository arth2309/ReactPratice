﻿
using System.ComponentModel.DataAnnotations.Schema;

namespace PeoplehawkServices.Dto;
public class ChartDTO
{
    
    public int Id { get; set; }

    public int A { get; set; }

    public int C { get; set; }

    public int E { get; set; }

    public int I { get; set; }

    public int R { get; set; }

    public int S { get; set; }

    public string career_code { get; set; }

    [Column(TypeName = "timestamp without time zone")]
    public DateTime created_at { get; set; }
}
