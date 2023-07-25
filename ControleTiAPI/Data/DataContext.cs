using ControleTiAPI.Models;
using ControleTiAPI.Models.Preventives;
using Librame.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Numerics;
using System.Runtime.InteropServices;
using System.Runtime.Intrinsics.X86;

namespace ControleTiAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<User> user { get; set; }
        public DbSet<UserClaims> userClaims { get; set; }
        public DbSet<Employee> employee { get; set; }
        public DbSet<Department> department { get; set; }
        public DbSet<SkypeEmployee> skypeEmployee { get; set; }
        public DbSet<VpnEmployee> vpnEmployee { get; set; }
        public DbSet<DVR> dvr { get; set; }
        public DbSet<Nobreak> nobreak { get; set; }
        public DbSet<Router> router { get; set; }
        public DbSet<Switches> switches { get; set; }
        public DbSet<NetworkNode> networkNode { get; set; }
        public DbSet<CellPhone> cellPhone { get; set; }
        public DbSet<Chip> chip { get; set; }
        public DbSet<Ramal> ramal { get; set; }
        public DbSet<Printer> printer { get; set; }

        public DbSet<ComputerProfile> profile { get; set; }
        public DbSet<Computer> computer { get; set; }
        public DbSet<ComputerLog> computerLog { get; set; }
        public DbSet<ComputersReport> computerReport { get; set; }
        public DbSet<Memory> memory { get; set; }
        public DbSet<Storage> storage { get; set; }
        public DbSet<ProcessingUnit> processingUnit { get; set; }
        public DbSet<ComputerMemory> computerMemory { get; set; }

        public DbSet<ServerHost> serverHost { get; set; }
        public DbSet<ServerVM> serverVM { get; set; }
        public DbSet<ServerStorage> serverStorage { get; set; }
        public DbSet<ServerMemory> serverMemory { get; set; }
        public DbSet<ServerFunctionality> serverFunctionality { get; set; }

        public DbSet<ComputerPreventive> computerPreventive { get; set; }
        public DbSet<DVRPreventive> dvrPreventive { get; set; }
        public DbSet<NobreakPreventive> nobreakPreventive { get; set; }
        public DbSet<ServerPreventive> serverPreventive { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
                    => optionsBuilder
                        .UseModel(ControleTiAPI.Data.DataContextModel.Instance);
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("ti");

            modelBuilder.Entity<User>(b =>
            {
                b.HasKey(u => u.id);
                b.HasIndex(u => u.email).HasDatabaseName("EmailUserIndex").IsUnique();

                b.HasMany(u => u.userClaims)
                    .WithOne(uc => uc.user)
                    .HasForeignKey(uc => uc.userId)
                    .OnDelete(DeleteBehavior.Cascade).IsRequired();
            });

            modelBuilder.Entity<DVR>(b =>
            {
                b.HasKey(d => d.id);
                b.HasIndex(d => d.code).HasDatabaseName("CodeDVRIndex").IsUnique();

                b.HasMany(d => d.preventives)
                    .WithOne(p => p.dvr)
                    .HasForeignKey(p => p.dvrId)
                    .OnDelete(DeleteBehavior.Cascade).IsRequired();

                b.ToTable("dvr", "ti");
            });

            modelBuilder.Entity<Nobreak>(b =>
            {
                b.HasKey(n => n.id);
                b.HasIndex(n => n.code).HasDatabaseName("CodeNobreakIndex").IsUnique();

                b.HasMany(n => n.preventives)
                    .WithOne(p => p.nobreak)
                    .HasForeignKey(p => p.nobreakId)
                    .OnDelete(DeleteBehavior.Cascade).IsRequired();

                b.ToTable("nobreak", "ti");
            });

            modelBuilder.Entity<Router>(b =>
            {
                b.HasKey(r => r.id);
                b.HasIndex(r => r.code).HasDatabaseName("CodeRouterIndex").IsUnique();

                b.ToTable("router", "ti");
            });

            modelBuilder.Entity<Switches>(b =>
            {
                b.HasKey(s => s.id);
                b.HasIndex(s => s.code).HasDatabaseName("CodeSwitchIndex").IsUnique();

                b.ToTable("switches", "ti");
            });

            modelBuilder.Entity<Employee>(b =>
            {
                b.HasKey(e => e.id);

                b.HasIndex(e => e.name).HasDatabaseName("UserNameEmployee").IsUnique();

                b.HasOne(e => e.department)
                    .WithMany(d => d.employees)
                    .HasForeignKey(e => e.departmentId);

                b.ToTable("employee", "ti");
            });  

            modelBuilder.Entity<SkypeEmployee>(b =>
            {
                b.HasKey(s => s.id);

                b.HasOne(s => s.employee)
                    .WithOne(e => e.skype)
                    .HasForeignKey<SkypeEmployee>(s => s.employeeId)
                    .OnDelete(DeleteBehavior.Cascade).IsRequired();

                b.ToTable("skypeEmployee", "ti");
            }); 

            modelBuilder.Entity<VpnEmployee>(b =>
            {
                b.HasKey(v => v.id);

                b.HasOne(v => v.employee)
                    .WithOne(e => e.vpn)
                    .HasForeignKey<VpnEmployee>(v => v.employeeId)
                    .OnDelete(DeleteBehavior.Cascade).IsRequired();

                b.ToTable("vpnEmployee", "ti");
            });


            modelBuilder.Entity<NetworkNode>(b => 
            {
                b.HasKey(n => n.id);

                b.HasIndex(n => n.code).HasDatabaseName("CodeNetworkNodeIndex").IsUnique();

                b.HasOne(n => n.switchOfNode)
                    .WithMany(s => s.networkNodes)
                    .HasForeignKey(n => n.switchId)
                    .OnDelete(DeleteBehavior.Cascade).IsRequired();
                b.HasOne(n => n.employeeNetworkNode)
                    .WithMany(e => e.networkNodes)
                    .HasForeignKey(n => n.employeeId)
                    .OnDelete(DeleteBehavior.NoAction);

                b.ToTable("networkNode", "ti");
            });

            modelBuilder.Entity<Chip>(b =>
            {
                b.Property(c => c.id).ValueGeneratedOnAdd();
                b.Property(c => c.createdAt).HasDefaultValueSql("getdate()");
                b.Property(c => c.updatedAt).HasDefaultValueSql("getdate()").ValueGeneratedOnAddOrUpdate();
                
                b.HasIndex(c => c.number).HasDatabaseName("ChipNumberIndex").IsUnique();

                b.ToTable("chip", "ti");

                b.HasOne<CellPhone>(ch => ch.cellPhone)
                    .WithMany(cp => cp.chips)
                    .HasForeignKey(ch => ch.cellphoneId);
                b.HasOne<Employee>(ch => ch.employee)
                    .WithMany(e => e.chips)
                    .HasForeignKey(ch => ch.employeeId);
                b.HasOne<Department>(ch => ch.department)
                    .WithMany(d => d.chips)
                    .HasForeignKey(ch => ch.departmentId);

                b.ToTable("chip", "ti");
            });

            modelBuilder.Entity<Ramal>(b =>
            {
                b.Property(r => r.id).ValueGeneratedOnAdd();
                b.Property(r => r.createdAt).HasDefaultValueSql("getdate()");
                b.Property(r => r.updatedAt).HasDefaultValueSql("getdate()").ValueGeneratedOnAddOrUpdate();

                b.HasIndex(r => r.number).HasDatabaseName("RamalNumberIndex").IsUnique();

                b.HasKey(r => r.id);

                b.ToTable("ramal", "ti");

                b.HasOne<Department>(r => r.department)
                    .WithMany(d => d.ramals)
                    .HasForeignKey(r => r.departmentId).IsRequired();
                b.HasOne<Employee>(r => r.employee)
                    .WithMany(e => e.ramals)
                    .HasForeignKey(r => r.employeeId);
            });

            modelBuilder.Entity<Printer>(b =>
            {
                b.HasIndex(p => p.code).HasDatabaseName("PrinterCodeUniqueIndex").IsUnique();
            });

            modelBuilder.Entity<Computer>(b =>
            {
                b.Property(c => c.createdAt).HasDefaultValueSql("getdate()");

                b.HasIndex(c => c.code).HasDatabaseName("CodeComputerIndex").IsUnique();

                b.HasOne(c => c.profile)
                    .WithMany(p => p.computers)
                    .HasForeignKey(c => c.profileId)
                    .OnDelete(DeleteBehavior.NoAction).IsRequired();

                b.HasOne(c => c.processingUnit)
                    .WithMany(p => p.computers)
                    .HasForeignKey(c => c.processorId)
                    .OnDelete(DeleteBehavior.NoAction).IsRequired();

                b.HasOne(c => c.storage)
                    .WithMany(s => s.computers)
                    .HasForeignKey(c => c.storageId)
                    .OnDelete(DeleteBehavior.NoAction).IsRequired();

                b.HasMany(c => c.logs)
                    .WithOne(l => l.computer)
                    .HasForeignKey(l => l.computerId)
                    .OnDelete(DeleteBehavior.Cascade).IsRequired();

                b.HasMany(c => c.preventives)
                    .WithOne(p => p.computer)
                    .HasForeignKey(p => p.computerId)
                    .OnDelete(DeleteBehavior.Cascade).IsRequired();

                b.ToTable("computer", "ti");
            });

            modelBuilder.Entity<ComputerProfile>(b =>
            {
                b.HasIndex(p => p.name).HasDatabaseName("NameProfileIndex").IsUnique();
            });

            modelBuilder.Entity<ComputerLog>(b =>
            {
                b.Property(l => l.updatedAt).HasDefaultValueSql("getdate()");
            });

            modelBuilder.Entity<ComputerMemory>(b =>
            {
                b.HasKey(cm => new { cm.memoryId, cm.computerId });

                b.HasOne(cm => cm.computer)
                    .WithMany(c => c.memories)
                    .HasForeignKey(cm => cm.computerId);
                b.HasOne(cm => cm.memory)
                    .WithMany(m => m.computers)
                    .HasForeignKey(cm => cm.memoryId);
            });

            modelBuilder.Entity<VMFunctionalities>(b =>
            {
                b.HasKey(vf => new { vf.vmId, vf.functionalityId });

                b.HasOne(vf => vf.virtualMachine)
                    .WithMany(sv => sv.functionalities)
                    .HasForeignKey(vf => vf.vmId);
                b.HasOne(vf => vf.functionality)
                    .WithMany(f => f.virtualMachines)
                    .HasForeignKey(vf => vf.functionalityId);
            });

            modelBuilder.Entity<ServerVM>(b =>
            {
                b.HasIndex(sv => sv.code).HasDatabaseName("CodeVMIndex").IsUnique();

                b.HasOne(sv => sv.host)
                    .WithMany(sh => sh.virtualMachines)
                    .HasForeignKey(sv => sv.serverHostId)
                    .OnDelete(DeleteBehavior.Cascade).IsRequired();

                b.ToTable("serverVM", "ti");
            });

            modelBuilder.Entity<HostFuncionalities>(b =>
            {
                b.HasKey(hf => new { hf.hostId, hf.functionalityId });

                b.HasOne(hf => hf.host)
                    .WithMany(sh => sh.functionalities)
                    .HasForeignKey(hf => hf.hostId);
                b.HasOne(hf => hf.functionality)
                    .WithMany(f => f.hosts)
                    .HasForeignKey(hf => hf.functionalityId);
            });

            modelBuilder.Entity<ServerMemory>(b =>
            {
                b.HasKey(sm => new { sm.memoryId, sm.serverHostId });

                b.HasOne(sm => sm.host)
                    .WithMany(sh => sh.memories)
                    .HasForeignKey(sm => sm.serverHostId);
                b.HasOne(sm => sm.memory)
                    .WithMany(m => m.servers)
                    .HasForeignKey(sm => sm.memoryId);
            });

            modelBuilder.Entity<ServerStorage>(b =>
            {
                b.HasKey(ss => new { ss.storageId, ss.serverHostId });

                b.HasOne(ss => ss.host)
                    .WithMany(sh => sh.storages)
                    .HasForeignKey(ss => ss.serverHostId);
                b.HasOne(ss => ss.storage)
                    .WithMany(s => s.servers)
                    .HasForeignKey(ss => ss.storageId);
            });

            modelBuilder.Entity<ServerHost>(b =>
            {
                b.HasIndex(sh => sh.code).HasDatabaseName("CodeSrvHostIndex").IsUnique();

                b.HasMany(sh => sh.preventives)
                    .WithOne(p => p.host)
                    .HasForeignKey(p => p.hostId)
                    .OnDelete(DeleteBehavior.Cascade).IsRequired();

                b.ToTable("serverHost", "ti");
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
