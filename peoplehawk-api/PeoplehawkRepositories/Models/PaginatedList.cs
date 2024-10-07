namespace PeoplehawkRepositories.Models;
public class PaginatedList<T> where T : class
{
    public int Page { get; set; }   
    public int TotalCount { get; set; } 
    public int PageSize { get; set; }   
    public List<T> items { get; set; }
}
