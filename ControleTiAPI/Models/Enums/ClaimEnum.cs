using System.ComponentModel;

namespace ControleTiAPI.Models.Enums
{
    public enum ClaimEnum
    {
        [Description("ADMIN")]
        ADMIN, // Administrador
        [Description("DEVICES")]
        DEVICES, // Gerencia um equipamento
        [Description("PREVENTIVES")]
        PREVENTIVES // Somente Lista, filtra e adiciona preventivas
    }
}
