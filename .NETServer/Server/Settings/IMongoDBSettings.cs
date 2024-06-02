namespace Server.Settings
{
	/// <summary>
	/// Interface for MongoDB settings.
	/// </summary>
	public interface IMongoDBSettings
	{
		/// <summary>
		/// Gets or sets the name of the tasks collection.
		/// </summary>
		string TasksCollectionName { get; set; }

		/// <summary>
		/// Gets or sets the connection string.
		/// </summary>
		string ConnectionString { get; set; }

		/// <summary>
		/// Gets or sets the name of the database.
		/// </summary>
		string DatabaseName { get; set; }
	}
}
