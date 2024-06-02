using MongoDB.Driver;

namespace Server.Settings
{
	/// <summary>
	/// Represents the MongoDB settings.
	/// </summary>
	public class MongoDBSettings : IMongoDBSettings
	{
		/// <summary>
		/// Gets or sets the name of the tasks collection.
		/// </summary>
		public string TasksCollectionName { get; set; } = string.Empty;

		/// <summary>
		/// Gets or sets the connection string.
		/// </summary>
		public string ConnectionString { get; set; } = string.Empty;

		/// <summary>
		/// Gets or sets the name of the database.
		/// </summary>
		public string DatabaseName { get; set; } = string.Empty;
	}
}
