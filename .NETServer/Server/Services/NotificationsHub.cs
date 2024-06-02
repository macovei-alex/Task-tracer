using Microsoft.AspNetCore.SignalR;

namespace Server.Services
{
	/// <summary>
	/// Represents a SignalR hub for notifications.
	/// </summary>
	public class NotificationsHub : Hub
	{
		/// <summary>
		/// Broadcasts a message to all connected clients.
		/// </summary>
		/// <param name="messages">The messages to broadcast.</param>
		/// <returns>A task that represents the asynchronous operation.</returns>
		public async Task BroadcastMessage(object[] messages)
		{
			await Clients.All.SendAsync("message_received", messages);
		}
	}
}
