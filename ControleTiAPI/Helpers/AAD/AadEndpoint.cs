using Azure.Identity;
using Microsoft.Graph;
using Microsoft.Identity.Client;
using Microsoft.IdentityModel.Clients;

namespace ControleTiAPI.Helpers.AAD
{
    public class AadEndpoint : IAadEndpoint
    {
        readonly string _instance;
        readonly string _domain;
        readonly string _clientId;
        readonly string _tenantId;
        readonly string _secret;

        #region Constructor
        public AadEndpoint(IConfiguration configuration)
        {
            var aad = configuration.GetSection("AzureAd");
            _instance = aad.GetSection("Instance").Value!;
            _domain = aad.GetSection("Domain").Value!;
            _clientId = aad.GetSection("ClientId").Value!;
            _tenantId = aad.GetSection("TenantId").Value!;
            _secret = aad.GetSection("Secret").Value!;
        }
        #endregion

        public async Task<string> GetUserFromAad(string email)
        {
            string retorno = string.Empty;

            try
            {
                var scopes = new[] { "https://graph.microsoft.com/.default" };
                var clientSecretCredential = new ClientSecretCredential(
                                _tenantId, _clientId, _secret);
                var graphClient = new GraphServiceClient(clientSecretCredential, scopes);
                var users = await graphClient.Users.GetAsync();
                if (users?.Value?.Count == 1)
                {
                    retorno = users.Value[0].DisplayName;
                }
            }
            catch (Exception ex)
            {

            }

            return retorno;
        }
    }
}
