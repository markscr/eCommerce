using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BasketController(StoreContext context) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            Basket? basket = await RetrieveBasket();

            if (basket is null)
                return NoContent();

            return basket.ToDto();
        }

        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(Guid productId, int quantity)
        {
            Basket? basket = await RetrieveBasket();

            basket ??= CreateBasket();

            Product? product = await context.Products.FindAsync(productId);

            if (product is null)
                return BadRequest("Problem adding item to basket");

            basket.AddItem(product, quantity);

            var result = await context.SaveChangesAsync() > 0; // If anything changed result is > 0

            if (result)
                return CreatedAtAction(nameof(GetBasket), basket.ToDto());

            return BadRequest("Problem updating basket");
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(Guid productId, int quantity)
        {
            Basket? basket = await RetrieveBasket();

            if (basket is null)
                return BadRequest("Unable to retrieve basket");

            basket.RemoveItem(productId, quantity);

            var result = await context.SaveChangesAsync() > 0;

            if (result)
                return Ok();

            return BadRequest("Problem updating basket");
        }

        private async Task<Basket?> RetrieveBasket()
        {
            return await context
                .Baskets.Include(x => x.Items)
                .ThenInclude(x => x.Product)
                .FirstOrDefaultAsync(x => x.BasketId == Request.Cookies["BasketId"]);
        }

        private Basket CreateBasket()
        {
            string basketId = Guid.NewGuid().ToString();
            CookieOptions cookieOptions = new()
            {
                IsEssential = true,
                Expires = DateTime.UtcNow.AddDays(30),
            };

            Response.Cookies.Append("BasketId", basketId, cookieOptions);
            Basket basket = new() { BasketId = basketId };
            context.Baskets.Add(basket);

            return basket;
        }
    }
}
