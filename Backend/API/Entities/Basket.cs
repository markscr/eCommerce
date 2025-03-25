using System;

namespace API.Entities;

public class Basket
{
    public Guid Id { get; set; }
    public required string BasketId { get; set; }
    public List<BasketItem> Items { get; set; } = [];

    public void AddItem(Product product, int quantity)
    {
        if (product is null)
            ArgumentNullException.ThrowIfNull(product);
        if (quantity <= 0)
            throw new ArgumentException("Quantity should be greater than zero", nameof(quantity));

        BasketItem? existingItem = FindItem(product.Id);

        if (existingItem is null)
        {
            Items.Add(new() { Product = product, Quantity = quantity });
        }
        else
        {
            existingItem.Quantity += quantity;
        }
    }

    public void RemoveItem(Guid productId, int quantity)
    {
        if (quantity <= 0)
            throw new ArgumentException("Quantity should be greater than zero", nameof(quantity));

        BasketItem? item = FindItem(productId);
        if (item is null)
            return;

        item.Quantity -= quantity;
        if (item.Quantity <= 0)
            Items.Remove(item);
    }

    private BasketItem? FindItem(Guid productId)
    {
        return Items.FirstOrDefault(item => item.ProductId == productId);
    }
}
