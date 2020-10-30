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

      if (name != 'Aged Brie' && name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (item.quality > 0) {
          item.quality = item.quality - 1
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1
          if (name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.quality = item.quality + 1
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                item.quality = item.quality + 1
              }
            }
          }
        }
      }
      item.sellIn = item.sellIn - 1;
      if (item.sellIn < 0) {
        if (name != 'Aged Brie') {
          if (name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (item.quality > 0) {
              item.quality = item.quality - 1
            }
          } else {
            item.quality = item.quality - item.quality
          }
        } else {
          if (item.quality < 50) {
            item.quality = item.quality + 1
          }
        }
      }
      return item
    })
  }
}
