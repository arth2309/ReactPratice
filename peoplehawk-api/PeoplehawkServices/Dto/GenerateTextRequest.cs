using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeoplehawkServices.Dto
{
    public class GenerateTextRequest
    {
        public string Prompt { get; set; }
        public double Temperature { get; set; } = 0.7; // Adjust temperature for different levels of creativity
        public int TopP { get; set; } = 1; // Adjust top_p for controlling randomness
        public int Length { get; set; } = 100; // Adjust length for desired output length
        public string StopSequence { get; set; } = null; // Optional stop sequence to terminate generation
        public string Format { get; set; } = "text"; // Output format (text, json)
    }
}
