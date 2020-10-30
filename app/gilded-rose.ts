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
    // Using .map to make it cleaner and I won't need to carry over this.items through the loop
    this.items = this.items.map((item) => {
      let { sellIn, quality } = item
      const { name } = item
      // Sulfuras, Hand of Ragnaros never changes so no need to go any further
      if (name === 'Sulfuras, Hand of Ragnaros') {
        return item
      }
      let qualityChange = -1

      // a switch seem more appropriate and easy to read to handle this kind of logic
      switch (name) {
        case 'Aged Brie':
          qualityChange = 1
          break;
        case 'Backstage passes to a TAFKAL80ETC concert':
          qualityChange = 1

          if (sellIn < 11) {
            qualityChange = 2
          }
          if (sellIn < 6) {
            qualityChange = 3
          }
          break;
      }

      sellIn = sellIn - 1

      if (sellIn < 0) {
        // again, a switch seem more appropriate and easy to read to handle this kind of logic
        switch (name) {
          case 'Aged Brie':
            qualityChange++
            break;
          case 'Backstage passes to a TAFKAL80ETC concert':
            qualityChange = -item.quality
            break;
          default:
            // Normal items
            qualityChange--
            break;
        }
      }

      quality = quality + qualityChange

      if (quality > 50) {
        quality = 50
      } else if (quality < 0) {
        quality = 0
      }

      return {name, sellIn, quality}
    })

    return this.items
  }
}
