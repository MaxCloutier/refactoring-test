export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

// Hoping that the goblin doesn't have strong feelings about indentation, I'll leave the Item class with a 4 space indentation just to be safe.
export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    // Using .map to make it cleaner, I won't need to carry over this.items through the loop and I can just return what .map returns
    return this.items.map((item) => {
      const { name } = item
      // Sulfuras, Hand of Ragnaros never changes so no need to go any further
      if (name === 'Sulfuras, Hand of Ragnaros') {
        return item
      }

      // a switch seem more appropriate and easy to read to handle this kind of logic
      switch (name) {
        case 'Aged Brie':
          if (item.quality < 50) {
            item.quality = item.quality + 1
          }
          break;
        case 'Backstage passes to a TAFKAL80ETC concert':
          if (item.quality < 50) {
            item.quality = item.quality + 1

            if (item.sellIn < 11) {
              item.quality = item.quality + 1
            }
            if (item.sellIn < 6) {
                item.quality = item.quality + 1
            }
          }
          break;
        default:
          // Normal items
          if (item.quality > 0) {
            item.quality = item.quality - 1
          }
          break;
      }

      item.sellIn = item.sellIn - 1;

      if (item.sellIn < 0) {
        // again, a switch seem more appropriate and easy to read to handle this kind of logic
        switch (name) {
          case 'Aged Brie':
            if (item.quality < 50) {
              item.quality = item.quality + 1
            }
            break;
          case 'Backstage passes to a TAFKAL80ETC concert':
            item.quality = 0
            break;
          default:
            // Normal items
            if (item.quality > 0) {
              item.quality = item.quality - 1
            }
            break;
        }
      }

      return item
    })
  }
}
