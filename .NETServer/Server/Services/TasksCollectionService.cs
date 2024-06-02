using MongoDB.Driver;
using Server.Models;
using Server.Settings;

namespace Server.Services
{
	/// <summary>
	/// Service for managing tasks in a MongoDB collection.
	/// </summary>
	public class TasksCollectionService : ITasksCollectionService
	{
		private readonly IMongoCollection<TaskModel> _collection;

		/// <summary>
		/// Initializes a new instance of the <see cref="TasksCollectionService"/> class.
		/// </summary>
		/// <param name="settings">The MongoDB settings.</param>
		public TasksCollectionService(IMongoDBSettings settings)
		{
			var client = new MongoClient(settings.ConnectionString);
			var database = client.GetDatabase(settings.DatabaseName);

			_collection = database.GetCollection<TaskModel>(settings.TasksCollectionName);
		}

		/// <summary>
		/// Creates a new task.
		/// </summary>
		/// <param name="task">The task to create.</param>
		/// <param name="keepId">Whether to keep the existing ID of the task.</param>
		/// <returns>A task that represents the asynchronous operation. The task result contains a boolean indicating whether the creation was successful.</returns>
		public async Task<bool> Create(TaskModel task, bool keepId)
		{
			if (task.Id == Guid.Empty || keepId == false)
			{
				task.Id = Guid.NewGuid();
			}

			if (await Exists(task.Id))
			{
				return false;
			}

			_collection.InsertOneAsync(task);
			return true;
		}

		/// <summary>
		/// Creates a new task.
		/// </summary>
		/// <param name="task">The task to create.</param>
		/// <returns>A task that represents the asynchronous operation. The task result contains a boolean indicating whether the creation was successful.</returns>
		public async Task<bool> Create(TaskModel task)
		{
			return await Create(task, false);
		}

		/// <summary>
		/// Deletes a task.
		/// </summary>
		/// <param name="id">The ID of the task to delete.</param>
		/// <returns>A task that represents the asynchronous operation. The task result contains a boolean indicating whether the deletion was successful.</returns>
		public async Task<bool> Delete(Guid id)
		{
			var result = await _collection.DeleteOneAsync(t => t.Id == id);
			if (!result.IsAcknowledged && result.DeletedCount == 0)
			{
				return false;
			}
			return true;
		}

		/// <summary>
		/// Gets a task.
		/// </summary>
		/// <param name="id">The ID of the task to get.</param>
		/// <returns>A task that represents the asynchronous operation. The task result contains the task if found, null otherwise.</returns>
		public async Task<TaskModel> Get(Guid id)
		{
			return (await _collection.FindAsync(t => t.Id == id)).FirstOrDefault();
		}

		/// <summary>
		/// Gets all tasks.
		/// </summary>
		/// <returns>A task that represents the asynchronous operation. The task result contains a list of all tasks.</returns>
		public async Task<List<TaskModel>> GetAll()
		{
			return (await _collection.FindAsync(taskModel => true)).ToList();
		}

		/// /// <summary>
		/// Updates a task.
		/// </summary>
		/// <param name="id">The ID of the task to update.</param>
		/// <param name="taskModel">The updated task.</param>
		/// <returns>A task that represents the asynchronous operation. The task result contains a boolean indicating whether the update was successful.</returns>
		public async Task<bool> Update(Guid id, TaskModel taskModel)
		{
			taskModel.Id = id;
			var result = await _collection.ReplaceOneAsync(t => t.Id == id, taskModel);
			if (!result.IsAcknowledged && result.ModifiedCount == 0)
			{
				await _collection.InsertOneAsync(taskModel);
				return false;
			}

			return true;
		}

		/// <summary>
		/// Gets tasks by status.
		/// </summary>
		/// <param name="status">The status of the tasks to get.</param>
		/// <returns>A task that represents the asynchronous operation. The task result contains a list of tasks with the specified status.</returns>
		public async Task<List<TaskModel>> GetTasksByStatus(string status)
		{
			return (await _collection.FindAsync(t => t.Status == status)).ToList();
		}

		/// <summary>
		/// Checks if a task exists.
		/// </summary>
		/// <param name="id">The ID of the task to check.</param>
		/// <returns>A task that represents the asynchronous operation. The task result contains a boolean indicating whether the task exists.</returns>
		public async Task<bool> Exists(Guid id)
		{
			return (await Get(id)) != null;
		}
	}
}
