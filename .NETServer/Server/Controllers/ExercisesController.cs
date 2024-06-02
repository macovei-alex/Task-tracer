using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
	/// <summary>
	/// An exercise controller.
	/// </summary>
	[ApiController]
	[Route("[controller]")]
	public class ExercisesController
	{
		/*
		private static List<string> strings = ["one", "two", "three", "four", "five"];

		[HttpGet("2-numbers/{param1}&{param2}")]
		public IActionResult GetSum([FromRoute] double param1, [FromRoute] double param2)
		{
			return new OkObjectResult($"{param1 + param2} = {param1} + {param2}");
		}

		[HttpPost("number-list")]
		public IActionResult GetSumList([FromBody] List<double> numbers)
		{
			if (numbers == null || numbers.Count == 0)
				return new BadRequestObjectResult("No numbers provided");

			return new OkObjectResult($"{numbers.Sum()}");
		}

		[HttpGet("strings")]
		public IActionResult GetStrings()
		{
			return new OkObjectResult(strings);
		}

		[HttpPut("strings/{index}")]
		public IActionResult ChangeStrings([FromRoute] int index, [FromBody] string newString)
		{
			if (index < 0 || index >= strings.Count)
			{
				return new BadRequestObjectResult("Index out of range");
			}

			strings[index] = newString;

			return new OkObjectResult(strings);
		}

		[HttpDelete("delete-string/{index}")]
		public IActionResult DeleteStrings(int index)
		{
			if (index < 0 || index >= strings.Count)
			{
				return new BadRequestObjectResult("Index out of range");
			}

			strings.RemoveAt(index);
			return new OkObjectResult(strings);
		}
		*/
	}
}
