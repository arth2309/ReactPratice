using System.Net;
using Newtonsoft.Json;


namespace peoplehawk_api
{
    public class ExceptionHandler
    {
        private readonly RequestDelegate _next;

        public ExceptionHandler(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {

            context.Response.StatusCode = (int)GetStatusCodeForException(exception);
            context.Response.ContentType = "application/json";

            var response = new
            {
                error = exception.Message
            };


            var jsonResponse = JsonConvert.SerializeObject(response);
            return context.Response.WriteAsync(jsonResponse);
        }

        private static HttpStatusCode GetStatusCodeForException(Exception exception)
        {
            if (exception is UnauthorizedAccessException)
            {
                return HttpStatusCode.Unauthorized;
            }
            else if (exception is KeyNotFoundException)
            {
                return HttpStatusCode.NotFound;
            }

            else if (exception is ArgumentException)
            {
                return HttpStatusCode.BadRequest;
            }

            else
            {
                return HttpStatusCode.InternalServerError;
            }
        }
    }
}
