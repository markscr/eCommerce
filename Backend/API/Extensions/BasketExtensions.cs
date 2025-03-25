using System;
using API.DTOs;
using API.Entities;

namespace API.Extensions;

public static class BasketExtensions
{
    public static BasketDto ToDto(this Basket basket)
    {
        return new BasketDto
        {
            BasketId = basket.BasketId,
            Items = basket
                .Items.Select(x => new BasketItemDto
                {
                    ProductId = x.ProductId,
                    Brand = x.Product.Brand,
                    Description = x.Product.Description,
                    Name = x.Product.Name,
                    PictureUrl = x.Product.PictureUrl,
                    Price = x.Product.Price,
                    Type = x.Product.Type,
                    Quantity = x.Quantity,
                })
                .ToList(),
        };
    }
}
