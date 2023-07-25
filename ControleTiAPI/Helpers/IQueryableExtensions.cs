using ControleTiAPI.DTOs;

namespace ControleTiAPI.Helpers
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> Paginate<T>(this IQueryable<T> queryable, PaginationDTO paginate)
        {
            return queryable
                .Skip((paginate.Page - 1) * paginate.RecordsPerPage)
                .Take(paginate.RecordsPerPage);
        }
    }
}
