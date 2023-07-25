using Microsoft.AspNetCore.Http;

namespace ControleTiAPI.Helpers
{
    public static class HttpContextExtensions
    {
        public async static Task InsertParameterPaginationInHeader<T>(this HttpContext httpContext, IQueryable<T> queryable)
        {
            if (httpContext == null) throw new ArgumentNullException(nameof(httpContext));

            double count = await queryable.CountAsync();
            httpContext.Response.Headers.Add("totalamountofrecords", count.ToString());
        }
    }
}
