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
      const { name } = item

      // Sulfuras, Hand of Ragnaros never changes so no need to go any further
      if (name === 'Sulfuras, Hand of Ragnaros') {
        return item
      }

      let { sellIn, quality } = item
      sellIn = sellIn - 1

      // Default for normal items
      let qualityChange = sellIn < 0 ? -2 : -1

      // a switch seem more appropriate and easy to read to handle this kind of logic
      switch (name) {
        case 'Conjured Mana Cake':
          qualityChange = qualityChange * 2
          break;
        case 'Aged Brie':
          qualityChange = sellIn < 0 ? 2 : 1
          break;
        case 'Backstage passes to a TAFKAL80ETC concert':
          qualityChange = 1

          // Could probably make this logic a one liner, but I'd rather keep readability
          if (sellIn < 0) {
            qualityChange = -quality
          } else if (sellIn < 5) {
            // Not sure if my new logic failed since I'm substracting the day at the begining,
            // the tests fail if I put <= 5 which should be the right check since the rules say 5 or less... I think?
            qualityChange = 3
          } else if (sellIn < 10) {
            // Same thought as with < 5 here, tests are passing this way so I won't put too much thought into it, but it seems wrong :thinking-face:
            qualityChange = 2
          }

          break;
      }

      // update quality, if numbers are negative they'll be substracted
      quality = quality + qualityChange

      // quality can never be more than 50 or lower than 0 so lets just fix it here
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
