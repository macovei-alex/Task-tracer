using Server.Models;

namespace Server.Services
{
	/// <summary>
	/// Interface for a service that manages tasks in a collection.
	/// </summary>
	public interface ITasksCollectionService : ICollectionService<TaskModel>
	{
		/// <summary>
		/// Gets tasks by their status.
		/// </summary>
		/// <param name="status">The status of the tasks to get.</param>
		/// <returns>A task that represents the asynchronous operation. The task result contains a list of tasks with the specified status.</returns>
		Task<List<TaskModel>> GetTasksByStatus(string status);
	}
}
