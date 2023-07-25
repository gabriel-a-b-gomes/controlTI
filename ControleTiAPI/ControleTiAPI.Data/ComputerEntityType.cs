﻿// <auto-generated />
using System;
using System.Collections.Generic;
using System.Reflection;
using ControleTiAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#pragma warning disable 219, 612, 618
#nullable enable

namespace ControleTiAPI.Data
{
    internal partial class ComputerEntityType
    {
        public static RuntimeEntityType Create(RuntimeModel model, RuntimeEntityType? baseEntityType = null)
        {
            var runtimeEntityType = model.AddEntityType(
                "ControleTiAPI.Models.Computer",
                typeof(Computer),
                baseEntityType);

            var id = runtimeEntityType.AddProperty(
                "id",
                typeof(int),
                propertyInfo: typeof(Computer).GetProperty("id", BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                fieldInfo: typeof(Computer).GetField("<id>k__BackingField", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                valueGenerated: ValueGenerated.OnAdd,
                afterSaveBehavior: PropertySaveBehavior.Throw);
            id.AddAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            var acquisitionDate = runtimeEntityType.AddProperty(
                "acquisitionDate",
                typeof(DateTime?),
                propertyInfo: typeof(Computer).GetProperty("acquisitionDate", BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                fieldInfo: typeof(Computer).GetField("<acquisitionDate>k__BackingField", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                nullable: true);
            acquisitionDate.AddAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.None);

            var assetNumber = runtimeEntityType.AddProperty(
                "assetNumber",
                typeof(string),
                propertyInfo: typeof(Computer).GetProperty("assetNumber", BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                fieldInfo: typeof(Computer).GetField("<assetNumber>k__BackingField", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                nullable: true,
                maxLength: 100);
            assetNumber.AddAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.None);

            var code = runtimeEntityType.AddProperty(
                "code",
                typeof(string),
                propertyInfo: typeof(Computer).GetProperty("code", BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                fieldInfo: typeof(Computer).GetField("<code>k__BackingField", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                maxLength: 100);
            code.AddAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.None);

            var computerType = runtimeEntityType.AddProperty(
                "computerType",
                typeof(int),
                propertyInfo: typeof(Computer).GetProperty("computerType", BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                fieldInfo: typeof(Computer).GetField("<computerType>k__BackingField", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.DeclaredOnly));
            computerType.AddAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.None);

            var createdAt = runtimeEntityType.AddProperty(
                "createdAt",
                typeof(DateTime?),
                propertyInfo: typeof(Computer).GetProperty("createdAt", BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                fieldInfo: typeof(Computer).GetField("<createdAt>k__BackingField", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                nullable: true,
                valueGenerated: ValueGenerated.OnAdd);
            createdAt.AddAnnotation("Relational:DefaultValueSql", "getdate()");
            createdAt.AddAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.None);

            var departmentId = runtimeEntityType.AddProperty(
                "departmentId",
                typeof(int?),
                propertyInfo: typeof(Computer).GetProperty("departmentId", BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                fieldInfo: typeof(Computer).GetField("<departmentId>k__BackingField", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                nullable: true);
            departmentId.AddAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.None);

            var employeeId = runtimeEntityType.AddProperty(
                "employeeId",
                typeof(int?),
                propertyInfo: typeof(Computer).GetProperty("employeeId", BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                fieldInfo: typeof(Computer).GetField("<employeeId>k__BackingField", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                nullable: true);
            employeeId.AddAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.None);

            var isGood = runtimeEntityType.AddProperty(
                "isGood",
                typeof(bool),
                propertyInfo: typeof(Computer).GetProperty("isGood", BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                fieldInfo: typeof(Computer).GetField("<isGood>k__BackingField", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.DeclaredOnly));
            isGood.AddAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.None);

            var lastPreventiveDate = runtimeEntityType.AddProperty(
                "lastPreventiveDate",
                typeof(DateTime?),
                propertyInfo: typeof(Computer).GetProperty("lastPreventiveDate", BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                fieldInfo: typeof(Computer).GetField("<lastPreventiveDate>k__BackingField", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                nullable: true);
            lastPreventiveDate.AddAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.None);

            var memorySize = runtimeEntityType.AddProperty(
                "memorySize",
                typeof(int),
                propertyInfo: typeof(Computer).GetProperty("memorySize", BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                fieldInfo: typeof(Computer).GetField("<memorySize>k__BackingField", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.DeclaredOnly));
            memorySize.AddAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.None);

            var notes = runtimeEntityType.AddProperty(
                "notes",
                typeof(string),
                propertyInfo: typeof(Computer).GetProperty("notes", BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                fieldInfo: typeof(Computer).GetField("<notes>k__BackingField", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                nullable: true);
            notes.AddAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.None);

            var operationalSystem = runtimeEntityType.AddProperty(
                "operationalSystem",
                typeof(string),
                propertyInfo: typeof(Computer).GetProperty("operationalSystem", BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                fieldInfo: typeof(Computer).GetField("<operationalSystem>k__BackingField", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                maxLength: 75);
            operationalSystem.AddAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.None);

            var processorId = runtimeEntityType.AddProperty(
                "processorId",
                typeof(int),
                propertyInfo: typeof(Computer).GetProperty("processorId", BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                fieldInfo: typeof(Computer).GetField("<processorId>k__BackingField", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.DeclaredOnly));
            processorId.AddAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.None);

            var profileId = runtimeEntityType.AddProperty(
                "profileId",
                typeof(int),
                propertyInfo: typeof(Computer).GetProperty("profileId", BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                fieldInfo: typeof(Computer).GetField("<profileId>k__BackingField", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.DeclaredOnly));
            profileId.AddAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.None);

            var rankOperationalSystem = runtimeEntityType.AddProperty(
                "rankOperationalSystem",
                typeof(int),
                propertyInfo: typeof(Computer).GetProperty("rankOperationalSystem", BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                fieldInfo: typeof(Computer).GetField("<rankOperationalSystem>k__BackingField", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.DeclaredOnly));
            rankOperationalSystem.AddAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.None);

            var status = runtimeEntityType.AddProperty(
                "status",
                typeof(int),
                propertyInfo: typeof(Computer).GetProperty("status", BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                fieldInfo: typeof(Computer).GetField("<status>k__BackingField", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.DeclaredOnly));
            status.AddAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.None);

            var storageId = runtimeEntityType.AddProperty(
                "storageId",
                typeof(int),
                propertyInfo: typeof(Computer).GetProperty("storageId", BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                fieldInfo: typeof(Computer).GetField("<storageId>k__BackingField", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.DeclaredOnly));
            storageId.AddAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.None);

            var ticketId = runtimeEntityType.AddProperty(
                "ticketId",
                typeof(string),
                propertyInfo: typeof(Computer).GetProperty("ticketId", BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                fieldInfo: typeof(Computer).GetField("<ticketId>k__BackingField", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                nullable: true,
                maxLength: 100);
            ticketId.AddAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.None);

            var key = runtimeEntityType.AddKey(
                new[] { id });
            runtimeEntityType.SetPrimaryKey(key);

            var index = runtimeEntityType.AddIndex(
                new[] { code },
                unique: true);
            index.AddAnnotation("Relational:Name", "CodeComputerIndex");

            var index0 = runtimeEntityType.AddIndex(
                new[] { departmentId });

            var index1 = runtimeEntityType.AddIndex(
                new[] { employeeId });

            var index2 = runtimeEntityType.AddIndex(
                new[] { processorId });

            var index3 = runtimeEntityType.AddIndex(
                new[] { profileId });

            var index4 = runtimeEntityType.AddIndex(
                new[] { storageId });

            return runtimeEntityType;
        }

        public static RuntimeForeignKey CreateForeignKey1(RuntimeEntityType declaringEntityType, RuntimeEntityType principalEntityType)
        {
            var runtimeForeignKey = declaringEntityType.AddForeignKey(new[] { declaringEntityType.FindProperty("departmentId")! },
                principalEntityType.FindKey(new[] { principalEntityType.FindProperty("id")! })!,
                principalEntityType);

            var department = declaringEntityType.AddNavigation("department",
                runtimeForeignKey,
                onDependent: true,
                typeof(Department),
                propertyInfo: typeof(Computer).GetProperty("department", BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                fieldInfo: typeof(Computer).GetField("<department>k__BackingField", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.DeclaredOnly));

            var computers = principalEntityType.AddNavigation("computers",
                runtimeForeignKey,
                onDependent: false,
                typeof(ICollection<Computer>),
                propertyInfo: typeof(Department).GetProperty("computers", BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                fieldInfo: typeof(Department).GetField("<computers>k__BackingField", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.DeclaredOnly));

            return runtimeForeignKey;
        }

        public static RuntimeForeignKey CreateForeignKey2(RuntimeEntityType declaringEntityType, RuntimeEntityType principalEntityType)
        {
            var runtimeForeignKey = declaringEntityType.AddForeignKey(new[] { declaringEntityType.FindProperty("employeeId")! },
                principalEntityType.FindKey(new[] { principalEntityType.FindProperty("id")! })!,
                principalEntityType);

            var employee = declaringEntityType.AddNavigation("employee",
                runtimeForeignKey,
                onDependent: true,
                typeof(Employee),
                propertyInfo: typeof(Computer).GetProperty("employee", BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                fieldInfo: typeof(Computer).GetField("<employee>k__BackingField", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.DeclaredOnly));

            var computers = principalEntityType.AddNavigation("computers",
                runtimeForeignKey,
                onDependent: false,
                typeof(ICollection<Computer>),
                propertyInfo: typeof(Employee).GetProperty("computers", BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                fieldInfo: typeof(Employee).GetField("<computers>k__BackingField", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.DeclaredOnly));

            return runtimeForeignKey;
        }

        public static RuntimeForeignKey CreateForeignKey3(RuntimeEntityType declaringEntityType, RuntimeEntityType principalEntityType)
        {
            var runtimeForeignKey = declaringEntityType.AddForeignKey(new[] { declaringEntityType.FindProperty("processorId")! },
                principalEntityType.FindKey(new[] { principalEntityType.FindProperty("id")! })!,
                principalEntityType,
                deleteBehavior: DeleteBehavior.NoAction,
                required: true);

            var processingUnit = declaringEntityType.AddNavigation("processingUnit",
                runtimeForeignKey,
                onDependent: true,
                typeof(ProcessingUnit),
                propertyInfo: typeof(Computer).GetProperty("processingUnit", BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                fieldInfo: typeof(Computer).GetField("<processingUnit>k__BackingField", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.DeclaredOnly));

            var computers = principalEntityType.AddNavigation("computers",
                runtimeForeignKey,
                onDependent: false,
                typeof(ICollection<Computer>),
                propertyInfo: typeof(ProcessingUnit).GetProperty("computers", BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                fieldInfo: typeof(ProcessingUnit).GetField("<computers>k__BackingField", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.DeclaredOnly));

            return runtimeForeignKey;
        }

        public static RuntimeForeignKey CreateForeignKey4(RuntimeEntityType declaringEntityType, RuntimeEntityType principalEntityType)
        {
            var runtimeForeignKey = declaringEntityType.AddForeignKey(new[] { declaringEntityType.FindProperty("profileId")! },
                principalEntityType.FindKey(new[] { principalEntityType.FindProperty("id")! })!,
                principalEntityType,
                deleteBehavior: DeleteBehavior.NoAction,
                required: true);

            var profile = declaringEntityType.AddNavigation("profile",
                runtimeForeignKey,
                onDependent: true,
                typeof(ComputerProfile),
                propertyInfo: typeof(Computer).GetProperty("profile", BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                fieldInfo: typeof(Computer).GetField("<profile>k__BackingField", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.DeclaredOnly));

            var computers = principalEntityType.AddNavigation("computers",
                runtimeForeignKey,
                onDependent: false,
                typeof(ICollection<Computer>),
                propertyInfo: typeof(ComputerProfile).GetProperty("computers", BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                fieldInfo: typeof(ComputerProfile).GetField("<computers>k__BackingField", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.DeclaredOnly));

            return runtimeForeignKey;
        }

        public static RuntimeForeignKey CreateForeignKey5(RuntimeEntityType declaringEntityType, RuntimeEntityType principalEntityType)
        {
            var runtimeForeignKey = declaringEntityType.AddForeignKey(new[] { declaringEntityType.FindProperty("storageId")! },
                principalEntityType.FindKey(new[] { principalEntityType.FindProperty("id")! })!,
                principalEntityType,
                deleteBehavior: DeleteBehavior.NoAction,
                required: true);

            var storage = declaringEntityType.AddNavigation("storage",
                runtimeForeignKey,
                onDependent: true,
                typeof(Storage),
                propertyInfo: typeof(Computer).GetProperty("storage", BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                fieldInfo: typeof(Computer).GetField("<storage>k__BackingField", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.DeclaredOnly));

            var computers = principalEntityType.AddNavigation("computers",
                runtimeForeignKey,
                onDependent: false,
                typeof(ICollection<Computer>),
                propertyInfo: typeof(Storage).GetProperty("computers", BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                fieldInfo: typeof(Storage).GetField("<computers>k__BackingField", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.DeclaredOnly));

            return runtimeForeignKey;
        }

        public static void CreateAnnotations(RuntimeEntityType runtimeEntityType)
        {
            runtimeEntityType.AddAnnotation("Relational:FunctionName", null);
            runtimeEntityType.AddAnnotation("Relational:Schema", "ti");
            runtimeEntityType.AddAnnotation("Relational:SqlQuery", null);
            runtimeEntityType.AddAnnotation("Relational:TableName", "computer");
            runtimeEntityType.AddAnnotation("Relational:ViewName", null);
            runtimeEntityType.AddAnnotation("Relational:ViewSchema", null);

            Customize(runtimeEntityType);
        }

        static partial void Customize(RuntimeEntityType runtimeEntityType);
    }
}
