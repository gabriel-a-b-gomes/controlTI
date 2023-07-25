using Azure.Identity;
using ControleTiAPI.DTOs;
using ControleTiAPI.Models.Preventives;
using Microsoft.AspNetCore.Server.IIS.Core;
using Microsoft.Identity.Client;
using Microsoft.Identity.Client.Extensions.Msal;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Runtime.CompilerServices;

namespace ControleTiAPI.Models
{
    public class Computer
    {
        public int id { get; set; }
        [StringLength(maximumLength: 100)]
        public string code { get; set; } = string.Empty;
        public int computerType { get; set; }
        public int memorySize { get; set; }
        [StringLength(maximumLength: 75)]
        public string operationalSystem { get; set; } = String.Empty;
        public int rankOperationalSystem { get; set; }
        public bool isGood { get; private set; }
        public int status { get; set; }
        [StringLength(maximumLength: 100)]
        public string? assetNumber { get; set; }
        public DateTime? acquisitionDate { get; set; }
        public DateTime? lastPreventiveDate { get; set; }
        [StringLength(maximumLength: 100)]
        public string? ticketId { get; set; }
        public string? notes { get; set; }
        public DateTime? createdAt { get; set; }

        public int? departmentId { get; set; }
        public int? employeeId { get; set; }
        public int profileId { get; set; }
        public int processorId { get; set; }
        public int storageId { get; set; }

        public virtual Department? department { get; set; }
        public virtual Employee? employee { get; set; }
        public virtual ComputerProfile profile { get; set; }
        public virtual ProcessingUnit processingUnit { get; set; }
        public virtual Storage storage { get; set; }

        public virtual ICollection<ComputerLog> logs { get; private set; }
        public virtual ICollection<ComputerMemory> memories { get; set; }
        public virtual ICollection<ComputerPreventive> preventives { get; set; }

        public Computer()
        {
            logs = new HashSet<ComputerLog>();
            memories = new HashSet<ComputerMemory>();
            preventives = new HashSet<ComputerPreventive>();
        }

        public Computer(ComputerCreationDTO computer)
        {
            if (computer.id != null)
            {
                this.id = computer.id.GetValueOrDefault();
            }

            this.code = computer.code;
            this.computerType = computer.computerType;
            this.memorySize = computer.memorySize;
            this.operationalSystem = computer.operationalSystem;
            this.rankOperationalSystem = computer.rankOperationalSystem;
            this.status = computer.status;
            this.assetNumber = computer.assetNumber;
            this.acquisitionDate = computer.acquisitionDate;
            this.lastPreventiveDate = computer.lastPreventiveDate;
            this.ticketId = computer.ticketId;
            this.notes = computer.notes;

            if (computer.departmentId != null && computer.departmentId > 0)
            {
                this.departmentId = computer.departmentId;
            }

            if (computer.employeeId != null && computer.employeeId > 0)
            {
                this.employeeId = computer.employeeId;
            }

            this.profileId = computer.profileId;

            this.processingUnit = new ProcessingUnit(computer.processingUnit);

            this.storage = new Storage(computer.storage);

            this.memories = new HashSet<ComputerMemory>();

            foreach (var memory in computer.memories)
            {
                this.memories.Add(new ComputerMemory(memory, this));
            }

            this.logs = new HashSet<ComputerLog>();
        }

        /// <summary>
        /// Verify if a computer is considering good or not. 
        /// </summary>
        /// <exception cref="Exception">If the profile, processor and storage is null, it generate an error</exception>
        public void setIsGood()
        {
            try
            {
                if (profile != null && processingUnit != null && storage != null)
                {
                    if (
                        this.memorySize >= profile.memoryMinSize &&
                        this.storage.storageSize >= profile.storageMinSize &&
                        !(this.storage.type == "HD" && profile.storageType == "SSD") &&
                        this.processingUnit.rankProcessingUnit >= profile.rankOfProcessingUnit &&
                        this.rankOperationalSystem >= profile.rankOfOperationSystem
                        )
                        isGood = true;
                    else
                        isGood = false;
                }
                else
                    throw new Exception("Perfil de uso, processador ou o armazenamento é vazio.");
            }
            catch (Exception ex)
            {
                throw new Exception("Problemas para setar É Recomendável > " + ex.Message);
            }
        }

        /// <summary>
        /// Set the computer logs with a newLogs
        /// </summary>
        /// <param name="newLogs">New computer logs to be set</param>
        /// <exception cref="Exception">An error is up when the conversion is not possible</exception>
        public void setLogs(ICollection<ComputerLog> newLogs)
        {
            try
            {
                this.logs = newLogs;
            }
            catch (Exception ex)
            {
                throw new Exception("Erro em set logs > " + ex.Message);
            }
        }
    }
}
