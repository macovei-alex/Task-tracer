namespace Server.Services
{
	/// <summary>
	/// Interface for a collection service.
	/// </summary>
	/// <typeparam name="T">The type of the items in the collection.</typeparam>
	public interface ICollectionService<T>
	{
		/// <summary>
		/// Gets all items in the collection.
		/// </summary>
		/// <returns>A task that represents the asynchronous operation. The task result contains a list of items in the collection.</returns>
		Task<List<T>> GetAll();

		/// <summary>
		/// Gets an item by its identifier.
		/// </summary>
		/// <param name="id">The identifier of the item.</param>
		/// <returns>A task that represents the asynchronous operation. The task result contains the item if found, null otherwise.</returns>
		Task<T> Get(Guid id);

		/// <summary>
		/// Creates a new item in the collection.
		/// </summary>
		/// <param name="model">The item to create.</param>
		/// <returns>A task that represents the asynchronous operation. The task result contains a boolean indicating whether the creation was successful.</returns>
		Task<bool> Create(T model);

		/// <summary>
		/// Updates an existing item in the collection.
		/// </summary>
		/// <param name="id">The identifier of the item to update.</param>
		/// <param name="model">The updated item.</param>
		/// <returns>A task that represents the asynchronous operation. The task result contains a boolean indicating whether the update was successful.</returns>
		Task<bool> Update(Guid id, T model);

		/// <summary>
		/// Deletes an item from the collection.
		/// </summary>
		/// <param name="id">The identifier of the item to delete.</param>
		/// <returns>A task that represents the asynchronous operation. The task result contains a boolean indicating whether the deletion was successful.</returns>
		Task<bool> Delete(Guid id);
	}
}
