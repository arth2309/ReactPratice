using Microsoft.EntityFrameworkCore;
using PeoplehawkRepositories.Interface;
using System.Linq.Expressions;

namespace PeoplehawkRepositories.Implementation;
public class GenericRepository<T> : IGenericRepository<T> where T : class
{
    private  readonly ApplicationDbContext _context;
    private readonly DbSet<T> _dbSet;

    public GenericRepository(ApplicationDbContext context)
    {
        _context = context;
        _dbSet = _context.Set<T>();
    }
    public async Task<List<T>> GetAllAsync()
    {
        return await _dbSet.ToListAsync();
    }

    public async Task<List<T>> GetAllWithIncludesAsync(params Expression<Func<T, object>>[] includeProperties)
{
    IQueryable<T> query = _dbSet;

    foreach (var includeProperty in includeProperties)
    {
        query = query.Include(includeProperty);
    }

    return await query.ToListAsync();
}

    public async Task<T> FirstOrDefaultWithIncludesAsync( Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties)
    {
        IQueryable<T> query = _dbSet;

        foreach (var includeProperty in includeProperties)
        {
            query = query.Include(includeProperty);
        }

        return await query.FirstOrDefaultAsync(predicate);
    }

    public async Task<T> GetByIdAsync(int id)
    {
        return await _dbSet.FindAsync(id);
    }

    public async Task<T> AddAsync(T entity)
    {
        await  _dbSet.AddAsync(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate)
    {
        return await _dbSet.FirstOrDefaultAsync(predicate);
    }

    public async Task<T> LastOrDefaultAsync(Expression<Func<T, bool>> predicate)
    {
        return await _dbSet .Where(predicate) .OrderByDescending(x => x) .FirstOrDefaultAsync();
    }

    public async Task<T> DeleteAsync(Expression<Func<T, bool>> predicate)
    {
        T entity = await _dbSet.FirstOrDefaultAsync(predicate);
         _dbSet.Remove(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<T> UpdateAsync(T entity)
    {
        _dbSet.Attach(entity);
        _context.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<List<T>> GetByCriteriaAsync(
        Expression<Func<T, bool>>? filter = null,
        Func<IQueryable<T>?, IOrderedQueryable<T>>? orderBy = null,
        int? page = null,
        int? pageSize = null,
         Func<IQueryable<T>?, IQueryable<T>>? thenInclude = null,
        params Expression<Func<T, object>>[]? includes
       
    )
    {
        IQueryable<T> query = _dbSet;

        if (includes != null)
        {
            foreach (var include in includes)
            {
                query = query.Include(include);
            }
        }

        if (thenInclude != null)
        {
            query = thenInclude(query);
        }

        if (filter != null)
        {
            query = query.Where(filter);
        }

        if (orderBy != null)
        {
            query = orderBy(query);
        }

        if (page.HasValue && pageSize.HasValue)
        {
            query = query.Skip((page.Value - 1) * pageSize.Value).Take(pageSize.Value);
        }
        return await query.ToListAsync();
    }

}
