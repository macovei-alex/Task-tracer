using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;

namespace Server.Controllers
{
	/// <summary>
	/// Controller for managing tasks.
	/// </summary>
	[ApiController]
	[Route("[controller]")]
	public class TasksController : ControllerBase
	{
		private ITasksCollectionService _tasksCollectionService;

		/// <summary>
		/// Initializes a new instance of the <see cref="TasksController"/> class.
		/// </summary>
		/// <param name="taskCollectionService">The service for managing tasks in a collection.</param>
		/// <exception cref="ArgumentNullException">Thrown when taskCollectionService is null.</exception>
		public TasksController(ITasksCollectionService taskCollectionService)
		{
			ArgumentNullException.ThrowIfNull(taskCollectionService);
			_tasksCollectionService = taskCollectionService;
		}

		/// <summary>
		/// Gets all tasks.
		/// </summary>
		/// <returns>A list of tasks.</returns>
		[HttpGet]
		public async Task<IActionResult> GetTasks()
		{
			List<TaskModel> tasks = await _tasksCollectionService.GetAll();
			return Ok(tasks);
		}

		/// <summary>
		/// Creates a new task.
		/// </summary>
		/// <param name="task">The task to create.</param>
		/// <returns>The created task.</returns>
		[HttpPost]
		public async Task<IActionResult> CreateTask([FromBody] TaskModel task)
		{
			if (task == null)
			{
				return BadRequest("Task cannot be null");
			}

			if (!await _tasksCollectionService.Create(task))
			{
				return BadRequest(task);
			}
			return Ok(task);
		}

		/// <summary>
		/// Updates an existing task.
		/// </summary>
		/// <param name="task">The task to update.</param>
		/// <returns>The updated task.</returns>
		[HttpPut]
		public async Task<IActionResult> UpdateTask([FromBody] TaskModel task)
		{
			if (task == null)
			{
				return BadRequest("Task cannot be null");
			}

			var foundTask = _tasksCollectionService.Get(task.Id);
			if (foundTask == null)
			{
				return NotFound($"Task with ID={task.Id} not found");
			}

			if (await _tasksCollectionService.Update(task.Id, task))
			{
				return Ok(task);
			}
			return BadRequest(task);
		}

		/// <summary>
		/// Deletes a task.
		/// </summary>
		/// <param name="id">The ID of the task to delete.</param>
		/// <returns>A list of tasks after deletion.</returns>
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteTask([FromRoute] string id)
		{
			Guid guid = Guid.Parse(id);
			var foundTask = await _tasksCollectionService.Get(guid);
			if (foundTask == null)
			{
				return NotFound($"Task with ID={guid} not found");
			}

			if (await _tasksCollectionService.Delete(guid))
			{
				return Ok(foundTask);
			}
			return BadRequest(foundTask);
		}
	}
}
