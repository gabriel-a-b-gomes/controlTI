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
    internal partial class ServerStorageEntityType
    {
        public static RuntimeEntityType Create(RuntimeModel model, RuntimeEntityType? baseEntityType = null)
        {
            var runtimeEntityType = model.AddEntityType(
                "ControleTiAPI.Models.ServerStorage",
                typeof(ServerStorage),
                baseEntityType);

            var storageId = runtimeEntityType.AddProperty(
                "storageId",
                typeof(int),
                propertyInfo: typeof(ServerStorage).GetProperty("storageId", BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                fieldInfo: typeof(ServerStorage).GetField("<storageId>k__BackingField", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                afterSaveBehavior: PropertySaveBehavior.Throw);
            storageId.AddAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.None);

            var serverHostId = runtimeEntityType.AddProperty(
                "serverHostId",
                typeof(int),
                propertyInfo: typeof(ServerStorage).GetProperty("serverHostId", BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                fieldInfo: typeof(ServerStorage).GetField("<serverHostId>k__BackingField", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                afterSaveBehavior: PropertySaveBehavior.Throw);
            serverHostId.AddAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.None);

            var qtde = runtimeEntityType.AddProperty(
                "qtde",
                typeof(int),
                propertyInfo: typeof(ServerStorage).GetProperty("qtde", BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                fieldInfo: typeof(ServerStorage).GetField("<qtde>k__BackingField", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.DeclaredOnly));
            qtde.AddAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.None);

            var key = runtimeEntityType.AddKey(
                new[] { storageId, serverHostId });
            runtimeEntityType.SetPrimaryKey(key);

            var index = runtimeEntityType.AddIndex(
                new[] { serverHostId });

            return runtimeEntityType;
        }

        public static RuntimeForeignKey CreateForeignKey1(RuntimeEntityType declaringEntityType, RuntimeEntityType principalEntityType)
        {
            var runtimeForeignKey = declaringEntityType.AddForeignKey(new[] { declaringEntityType.FindProperty("serverHostId")! },
                principalEntityType.FindKey(new[] { principalEntityType.FindProperty("id")! })!,
                principalEntityType,
                deleteBehavior: DeleteBehavior.Cascade,
                required: true);

            var host = declaringEntityType.AddNavigation("host",
                runtimeForeignKey,
                onDependent: true,
                typeof(ServerHost),
                propertyInfo: typeof(ServerStorage).GetProperty("host", BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                fieldInfo: typeof(ServerStorage).GetField("<host>k__BackingField", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.DeclaredOnly));

            var storages = principalEntityType.AddNavigation("storages",
                runtimeForeignKey,
                onDependent: false,
                typeof(ICollection<ServerStorage>),
                propertyInfo: typeof(ServerHost).GetProperty("storages", BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                fieldInfo: typeof(ServerHost).GetField("<storages>k__BackingField", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.DeclaredOnly));

            return runtimeForeignKey;
        }

        public static RuntimeForeignKey CreateForeignKey2(RuntimeEntityType declaringEntityType, RuntimeEntityType principalEntityType)
        {
            var runtimeForeignKey = declaringEntityType.AddForeignKey(new[] { declaringEntityType.FindProperty("storageId")! },
                principalEntityType.FindKey(new[] { principalEntityType.FindProperty("id")! })!,
                principalEntityType,
                deleteBehavior: DeleteBehavior.Cascade,
                required: true);

            var storage = declaringEntityType.AddNavigation("storage",
                runtimeForeignKey,
                onDependent: true,
                typeof(Storage),
                propertyInfo: typeof(ServerStorage).GetProperty("storage", BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                fieldInfo: typeof(ServerStorage).GetField("<storage>k__BackingField", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.DeclaredOnly));

            var servers = principalEntityType.AddNavigation("servers",
                runtimeForeignKey,
                onDependent: false,
                typeof(ICollection<ServerStorage>),
                propertyInfo: typeof(Storage).GetProperty("servers", BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly),
                fieldInfo: typeof(Storage).GetField("<servers>k__BackingField", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.DeclaredOnly));

            return runtimeForeignKey;
        }

        public static void CreateAnnotations(RuntimeEntityType runtimeEntityType)
        {
            runtimeEntityType.AddAnnotation("Relational:FunctionName", null);
            runtimeEntityType.AddAnnotation("Relational:Schema", "ti");
            runtimeEntityType.AddAnnotation("Relational:SqlQuery", null);
            runtimeEntityType.AddAnnotation("Relational:TableName", "serverStorage");
            runtimeEntityType.AddAnnotation("Relational:ViewName", null);
            runtimeEntityType.AddAnnotation("Relational:ViewSchema", null);

            Customize(runtimeEntityType);
        }

        static partial void Customize(RuntimeEntityType runtimeEntityType);
    }
}
