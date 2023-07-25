namespace ControleTiAPI.Helpers.AAD
{
    public interface IAadEndpoint
    {
        Task<string> GetUserFromAad(string email);
    }
}
