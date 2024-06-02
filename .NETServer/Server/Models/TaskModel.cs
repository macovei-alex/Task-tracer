namespace Server.Models
{
	/// <summary>
	/// Represents a task.
	/// </summary>
	public class TaskModel
	{
		/// <summary>
		/// Gets or sets the ID of the task.
		/// </summary>
		public Guid Id { get; set; }

		/// <summary>
		/// Gets or sets the title of the task.
		/// </summary>
		public string Title { get; set; } = string.Empty;

		/// <summary>
		/// Gets or sets the description of the task.
		/// </summary>
		public string Description { get; set; } = string.Empty;

		/// <summary>
		/// Gets or sets the person the task is assigned to.
		/// </summary>
		public string AssignedTo { get; set; } = string.Empty;

		/// <summary>
		/// Gets or sets the status of the task.
		/// </summary>
		public string Status { get; set; } = string.Empty;
	}
}
