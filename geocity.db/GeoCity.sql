USE [master]
GO
/****** Object:  Database [GeoCity]    Script Date: 02-06-22 19:02:07 ******/
CREATE DATABASE [GeoCity]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'GeoCity', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.GEOCITY\MSSQL\DATA\GeoCity.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'GeoCity_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.GEOCITY\MSSQL\DATA\GeoCity_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [GeoCity] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [GeoCity].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [GeoCity] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [GeoCity] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [GeoCity] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [GeoCity] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [GeoCity] SET ARITHABORT OFF 
GO
ALTER DATABASE [GeoCity] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [GeoCity] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [GeoCity] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [GeoCity] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [GeoCity] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [GeoCity] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [GeoCity] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [GeoCity] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [GeoCity] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [GeoCity] SET  DISABLE_BROKER 
GO
ALTER DATABASE [GeoCity] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [GeoCity] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [GeoCity] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [GeoCity] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [GeoCity] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [GeoCity] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [GeoCity] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [GeoCity] SET RECOVERY FULL 
GO
ALTER DATABASE [GeoCity] SET  MULTI_USER 
GO
ALTER DATABASE [GeoCity] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [GeoCity] SET DB_CHAINING OFF 
GO
ALTER DATABASE [GeoCity] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [GeoCity] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [GeoCity] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'GeoCity', N'ON'
GO
ALTER DATABASE [GeoCity] SET QUERY_STORE = OFF
GO
USE [GeoCity]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 02-06-22 19:02:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cities]    Script Date: 02-06-22 19:02:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cities](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[Latitude] [decimal](38, 18) NOT NULL,
	[Longitude] [decimal](38, 18) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[ModifiedDate] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Cities] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Itinaries]    Script Date: 02-06-22 19:02:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Itinaries](
	[Id] [uniqueidentifier] NOT NULL,
	[Day] [int] NOT NULL,
	[Duration] [int] NULL,
	[Distance] [decimal](18, 2) NULL,
	[Geodata] [nvarchar](max) NULL,
	[TripId] [uniqueidentifier] NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[ModifiedDate] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Itinaries] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ItinaryPointOfCrossings]    Script Date: 02-06-22 19:02:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ItinaryPointOfCrossings](
	[Id] [uniqueidentifier] NOT NULL,
	[Description] [nvarchar](max) NULL,
	[ItinaryId] [uniqueidentifier] NOT NULL,
	[PointOfCrossingId] [uniqueidentifier] NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[ModifiedDate] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_ItinaryPointOfCrossings] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ItinaryPointOfInterests]    Script Date: 02-06-22 19:02:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ItinaryPointOfInterests](
	[Id] [uniqueidentifier] NOT NULL,
	[Description] [nvarchar](max) NULL,
	[Duration] [int] NULL,
	[Price] [decimal](18, 2) NULL,
	[ItinaryId] [uniqueidentifier] NOT NULL,
	[PointOfInterestId] [uniqueidentifier] NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[ModifiedDate] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_ItinaryPointOfInterests] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PointOfCrossing]    Script Date: 02-06-22 19:02:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PointOfCrossing](
	[Id] [uniqueidentifier] NOT NULL,
	[Latitude] [decimal](38, 18) NOT NULL,
	[Longitude] [decimal](38, 18) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[ModifiedDate] [datetime2](7) NOT NULL,
	[CityId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_PointOfCrossing] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PointOfInterest]    Script Date: 02-06-22 19:02:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PointOfInterest](
	[Id] [uniqueidentifier] NOT NULL,
	[OsmId] [nvarchar](max) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[Category] [nvarchar](max) NOT NULL,
	[Latitude] [decimal](38, 18) NOT NULL,
	[Longitude] [decimal](38, 18) NOT NULL,
	[IsSuggestion] [bit] NOT NULL,
	[CityId] [uniqueidentifier] NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[ModifiedDate] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_PointOfInterest] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Trips]    Script Date: 02-06-22 19:02:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Trips](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[Days] [int] NOT NULL,
	[Description] [nvarchar](max) NULL,
	[IsPublished] [bit] NOT NULL,
	[Link] [uniqueidentifier] NOT NULL,
	[CityId] [uniqueidentifier] NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[ModifiedDate] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Trips] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TripUserFavorites]    Script Date: 02-06-22 19:02:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TripUserFavorites](
	[Id] [uniqueidentifier] NOT NULL,
	[TripId] [uniqueidentifier] NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
	[IsOwner] [bit] NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[ModifiedDate] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_TripUserFavorites] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TripUserRatings]    Script Date: 02-06-22 19:02:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TripUserRatings](
	[Id] [uniqueidentifier] NOT NULL,
	[TripId] [uniqueidentifier] NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
	[Rating] [int] NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[ModifiedDate] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_TripUserRatings] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TripUsers]    Script Date: 02-06-22 19:02:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TripUsers](
	[Id] [uniqueidentifier] NOT NULL,
	[TripId] [uniqueidentifier] NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
	[IsOwner] [bit] NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[ModifiedDate] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_TripUsers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 02-06-22 19:02:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [nvarchar](450) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[ModifiedDate] [datetime2](7) NOT NULL,
	[Lastname] [nvarchar](max) NOT NULL,
	[Firstname] [nvarchar](max) NOT NULL,
	[Email] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Index [IX_Itinaries_TripId]    Script Date: 02-06-22 19:02:07 ******/
CREATE NONCLUSTERED INDEX [IX_Itinaries_TripId] ON [dbo].[Itinaries]
(
	[TripId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_ItinaryPointOfCrossings_ItinaryId]    Script Date: 02-06-22 19:02:07 ******/
CREATE NONCLUSTERED INDEX [IX_ItinaryPointOfCrossings_ItinaryId] ON [dbo].[ItinaryPointOfCrossings]
(
	[ItinaryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_ItinaryPointOfCrossings_PointOfCrossingId]    Script Date: 02-06-22 19:02:07 ******/
CREATE NONCLUSTERED INDEX [IX_ItinaryPointOfCrossings_PointOfCrossingId] ON [dbo].[ItinaryPointOfCrossings]
(
	[PointOfCrossingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_ItinaryPointOfInterests_ItinaryId]    Script Date: 02-06-22 19:02:07 ******/
CREATE NONCLUSTERED INDEX [IX_ItinaryPointOfInterests_ItinaryId] ON [dbo].[ItinaryPointOfInterests]
(
	[ItinaryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_ItinaryPointOfInterests_PointOfInterestId]    Script Date: 02-06-22 19:02:07 ******/
CREATE NONCLUSTERED INDEX [IX_ItinaryPointOfInterests_PointOfInterestId] ON [dbo].[ItinaryPointOfInterests]
(
	[PointOfInterestId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_PointOfCrossing_CityId]    Script Date: 02-06-22 19:02:07 ******/
CREATE NONCLUSTERED INDEX [IX_PointOfCrossing_CityId] ON [dbo].[PointOfCrossing]
(
	[CityId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_PointOfInterest_CityId]    Script Date: 02-06-22 19:02:07 ******/
CREATE NONCLUSTERED INDEX [IX_PointOfInterest_CityId] ON [dbo].[PointOfInterest]
(
	[CityId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Trips_CityId]    Script Date: 02-06-22 19:02:07 ******/
CREATE NONCLUSTERED INDEX [IX_Trips_CityId] ON [dbo].[Trips]
(
	[CityId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_TripUserFavorites_TripId]    Script Date: 02-06-22 19:02:07 ******/
CREATE NONCLUSTERED INDEX [IX_TripUserFavorites_TripId] ON [dbo].[TripUserFavorites]
(
	[TripId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_TripUserFavorites_UserId]    Script Date: 02-06-22 19:02:07 ******/
CREATE NONCLUSTERED INDEX [IX_TripUserFavorites_UserId] ON [dbo].[TripUserFavorites]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_TripUserRatings_TripId]    Script Date: 02-06-22 19:02:07 ******/
CREATE NONCLUSTERED INDEX [IX_TripUserRatings_TripId] ON [dbo].[TripUserRatings]
(
	[TripId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_TripUserRatings_UserId]    Script Date: 02-06-22 19:02:07 ******/
CREATE NONCLUSTERED INDEX [IX_TripUserRatings_UserId] ON [dbo].[TripUserRatings]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_TripUsers_TripId]    Script Date: 02-06-22 19:02:07 ******/
CREATE NONCLUSTERED INDEX [IX_TripUsers_TripId] ON [dbo].[TripUsers]
(
	[TripId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_TripUsers_UserId]    Script Date: 02-06-22 19:02:07 ******/
CREATE NONCLUSTERED INDEX [IX_TripUsers_UserId] ON [dbo].[TripUsers]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Cities] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[Cities] ADD  DEFAULT (getdate()) FOR [ModifiedDate]
GO
ALTER TABLE [dbo].[Itinaries] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[Itinaries] ADD  DEFAULT (getdate()) FOR [ModifiedDate]
GO
ALTER TABLE [dbo].[ItinaryPointOfCrossings] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[ItinaryPointOfCrossings] ADD  DEFAULT (getdate()) FOR [ModifiedDate]
GO
ALTER TABLE [dbo].[ItinaryPointOfInterests] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[ItinaryPointOfInterests] ADD  DEFAULT (getdate()) FOR [ModifiedDate]
GO
ALTER TABLE [dbo].[PointOfCrossing] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[PointOfCrossing] ADD  DEFAULT (getdate()) FOR [ModifiedDate]
GO
ALTER TABLE [dbo].[PointOfCrossing] ADD  DEFAULT ('00000000-0000-0000-0000-000000000000') FOR [CityId]
GO
ALTER TABLE [dbo].[PointOfInterest] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[PointOfInterest] ADD  DEFAULT (getdate()) FOR [ModifiedDate]
GO
ALTER TABLE [dbo].[Trips] ADD  DEFAULT (newid()) FOR [Link]
GO
ALTER TABLE [dbo].[Trips] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[Trips] ADD  DEFAULT (getdate()) FOR [ModifiedDate]
GO
ALTER TABLE [dbo].[TripUserFavorites] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[TripUserFavorites] ADD  DEFAULT (getdate()) FOR [ModifiedDate]
GO
ALTER TABLE [dbo].[TripUserRatings] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[TripUserRatings] ADD  DEFAULT (getdate()) FOR [ModifiedDate]
GO
ALTER TABLE [dbo].[TripUsers] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[TripUsers] ADD  DEFAULT (getdate()) FOR [ModifiedDate]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT (getdate()) FOR [ModifiedDate]
GO
ALTER TABLE [dbo].[Itinaries]  WITH CHECK ADD  CONSTRAINT [FK_Itinaries_Trips_TripId] FOREIGN KEY([TripId])
REFERENCES [dbo].[Trips] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Itinaries] CHECK CONSTRAINT [FK_Itinaries_Trips_TripId]
GO
ALTER TABLE [dbo].[ItinaryPointOfCrossings]  WITH CHECK ADD  CONSTRAINT [FK_ItinaryPointOfCrossings_Itinaries_ItinaryId] FOREIGN KEY([ItinaryId])
REFERENCES [dbo].[Itinaries] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ItinaryPointOfCrossings] CHECK CONSTRAINT [FK_ItinaryPointOfCrossings_Itinaries_ItinaryId]
GO
ALTER TABLE [dbo].[ItinaryPointOfCrossings]  WITH CHECK ADD  CONSTRAINT [FK_ItinaryPointOfCrossings_PointOfCrossing_PointOfCrossingId] FOREIGN KEY([PointOfCrossingId])
REFERENCES [dbo].[PointOfCrossing] ([Id])
GO
ALTER TABLE [dbo].[ItinaryPointOfCrossings] CHECK CONSTRAINT [FK_ItinaryPointOfCrossings_PointOfCrossing_PointOfCrossingId]
GO
ALTER TABLE [dbo].[ItinaryPointOfInterests]  WITH CHECK ADD  CONSTRAINT [FK_ItinaryPointOfInterests_Itinaries_ItinaryId] FOREIGN KEY([ItinaryId])
REFERENCES [dbo].[Itinaries] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ItinaryPointOfInterests] CHECK CONSTRAINT [FK_ItinaryPointOfInterests_Itinaries_ItinaryId]
GO
ALTER TABLE [dbo].[ItinaryPointOfInterests]  WITH CHECK ADD  CONSTRAINT [FK_ItinaryPointOfInterests_PointOfInterest_PointOfInterestId] FOREIGN KEY([PointOfInterestId])
REFERENCES [dbo].[PointOfInterest] ([Id])
GO
ALTER TABLE [dbo].[ItinaryPointOfInterests] CHECK CONSTRAINT [FK_ItinaryPointOfInterests_PointOfInterest_PointOfInterestId]
GO
ALTER TABLE [dbo].[PointOfCrossing]  WITH CHECK ADD  CONSTRAINT [FK_PointOfCrossing_Cities_CityId] FOREIGN KEY([CityId])
REFERENCES [dbo].[Cities] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[PointOfCrossing] CHECK CONSTRAINT [FK_PointOfCrossing_Cities_CityId]
GO
ALTER TABLE [dbo].[PointOfInterest]  WITH CHECK ADD  CONSTRAINT [FK_PointOfInterest_Cities_CityId] FOREIGN KEY([CityId])
REFERENCES [dbo].[Cities] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[PointOfInterest] CHECK CONSTRAINT [FK_PointOfInterest_Cities_CityId]
GO
ALTER TABLE [dbo].[Trips]  WITH CHECK ADD  CONSTRAINT [FK_Trips_Cities_CityId] FOREIGN KEY([CityId])
REFERENCES [dbo].[Cities] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Trips] CHECK CONSTRAINT [FK_Trips_Cities_CityId]
GO
ALTER TABLE [dbo].[TripUserFavorites]  WITH CHECK ADD  CONSTRAINT [FK_TripUserFavorites_Trips_TripId] FOREIGN KEY([TripId])
REFERENCES [dbo].[Trips] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[TripUserFavorites] CHECK CONSTRAINT [FK_TripUserFavorites_Trips_TripId]
GO
ALTER TABLE [dbo].[TripUserFavorites]  WITH CHECK ADD  CONSTRAINT [FK_TripUserFavorites_Users_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[TripUserFavorites] CHECK CONSTRAINT [FK_TripUserFavorites_Users_UserId]
GO
ALTER TABLE [dbo].[TripUserRatings]  WITH CHECK ADD  CONSTRAINT [FK_TripUserRatings_Trips_TripId] FOREIGN KEY([TripId])
REFERENCES [dbo].[Trips] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[TripUserRatings] CHECK CONSTRAINT [FK_TripUserRatings_Trips_TripId]
GO
ALTER TABLE [dbo].[TripUserRatings]  WITH CHECK ADD  CONSTRAINT [FK_TripUserRatings_Users_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[TripUserRatings] CHECK CONSTRAINT [FK_TripUserRatings_Users_UserId]
GO
ALTER TABLE [dbo].[TripUsers]  WITH CHECK ADD  CONSTRAINT [FK_TripUsers_Trips_TripId] FOREIGN KEY([TripId])
REFERENCES [dbo].[Trips] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[TripUsers] CHECK CONSTRAINT [FK_TripUsers_Trips_TripId]
GO
ALTER TABLE [dbo].[TripUsers]  WITH CHECK ADD  CONSTRAINT [FK_TripUsers_Users_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[TripUsers] CHECK CONSTRAINT [FK_TripUsers_Users_UserId]
GO
USE [master]
GO
ALTER DATABASE [GeoCity] SET  READ_WRITE 
GO
