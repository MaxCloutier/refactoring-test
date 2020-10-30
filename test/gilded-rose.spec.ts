import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

function runTests(test) {
  describe(`Should test ${test.item.name}`, function() {
    const { item: { name, sellIn, quality }, expectedResultsByDay } = test
    const gildedRose = new GildedRose([ new Item(name, sellIn, quality) ]);

    expect(gildedRose.items[0].name).to.equal(name);

    expectedResultsByDay.forEach(({ sellIn, quality }, index) => {
      it(`Day ${index + 1} should return sellIn: ${sellIn} and quality: ${quality}`, function() {
        const items = gildedRose.updateQuality();

        expect(items[0].sellIn).to.equal(sellIn);
        expect(items[0].quality).to.equal(quality);
      });
    });
  });
}

describe('Gilded Rose', function () {
  /* Items from text tests */
  // new Item("Aged Brie", 2, 0), //
  // new Item("Sulfuras, Hand of Ragnaros", 0, 80), //
  // new Item("Sulfuras, Hand of Ragnaros", -1, 80),
  // new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  // new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
  // new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
  // // this conjured item does not work properly yet
  // new Item("Conjured Mana Cake", 3, 6)];

  /* Items targeted in legacy code */
  // Aged Brie
  // Backstage passes to a TAFKAL80ETC concert
  // Sulfuras, Hand of Ragnaros

  /* Rules */
  //  - All items have a SellIn value which denotes the number of days we have to sell the item
  //  - All items have a Quality value which denotes how valuable the item is
  //  - At the end of each day our system lowers both values for every item
  //  - Once the sell by date has passed, Quality degrades twice as fast
  //  - The Quality of an item is never negative
  //  - The Quality of an item is never more than 50

  /* Item specific Rules */
  //  - "Aged Brie" actually increases in Quality the older it gets
  //  - "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
  //    - "Sulfuras" has a quality of 80 and it never alters
  //  - "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
  //    Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
  //    Quality drops to 0 after the concert
  //  - "Conjured" items degrade in Quality twice as fast as normal items

  describe('Normal items', function () {
    // -1 to quality and sellIn each day
    // -2 to quality when sellIn < 0
    // quality never < 0
    const tests = [
      {
        item: {
          name: "+5 Dexterity Vest",
          sellIn: 5,
          quality: 10,
        },
        expectedResultsByDay: [
          {sellIn: 4, quality: 9},
          {sellIn: 3, quality: 8},
          {sellIn: 2, quality: 7},
          {sellIn: 1, quality: 6},
          {sellIn: 0, quality: 5},
          {sellIn: -1, quality: 3},
          {sellIn: -2, quality: 1},
          {sellIn: -3, quality: 0},
          {sellIn: -4, quality: 0},
        ]
      },
      {
        item: {
          name: "Elixir of the Mongoose",
          sellIn: 10,
          quality: 20,
        },
        expectedResultsByDay: [
          {sellIn: 9, quality: 19},
          {sellIn: 8, quality: 18},
          {sellIn: 7, quality: 17},
          {sellIn: 6, quality: 16},
          {sellIn: 5, quality: 15},
        ]
      }
    ];

    tests.forEach(runTests);
  });

  describe('Aged Brie', function () {
    // +1 to quality and -1 sellIn each day
    // +2 to quality when sellIn < 0 ? Not specified in the rules, but it makes sense since quality of a normal product decreases by two
    // quality never > 50

    const tests = [
      {
        item: {
          name: "Aged Brie",
          sellIn: 5,
          quality: 42,
        },
        expectedResultsByDay: [
          {sellIn: 4, quality: 43},
          {sellIn: 3, quality: 44},
          {sellIn: 2, quality: 45},
          {sellIn: 1, quality: 46},
          {sellIn: 0, quality: 47},
          {sellIn: -1, quality: 49},
          {sellIn: -2, quality: 50},
          {sellIn: -3, quality: 50}
        ]
      }
    ];

    tests.forEach(runTests);
  });

  describe('Backstage passes to a TAFKAL80ETC concert', function () {
    // +1 to quality and -1 sellIn each day
    // +2 to quality when sellIn <= 10
    // +3 to quality when sellIn <= 5
    // quality = 0 when sellIn < 0
    // quality never > 50

    const tests = [
      {
        item: {
          name: "Backstage passes to a TAFKAL80ETC concert",
          sellIn: 15,
          quality: 10,
        },
        expectedResultsByDay: [
          {sellIn: 14, quality: 11},
          {sellIn: 13, quality: 12},
          {sellIn: 12, quality: 13},
          {sellIn: 11, quality: 14},
          {sellIn: 10, quality: 15},
          {sellIn: 9, quality: 17},
          {sellIn: 8, quality: 19},
          {sellIn: 7, quality: 21}
        ]
      },
      {
        item: {
          name: "Backstage passes to a TAFKAL80ETC concert",
          sellIn: 11,
          quality: 30,
        },
        expectedResultsByDay: [
          {sellIn: 10, quality: 31},
          {sellIn: 9, quality: 33},
          {sellIn: 8, quality: 35},
          {sellIn: 7, quality: 37},
          {sellIn: 6, quality: 39},
          {sellIn: 5, quality: 41},
          {sellIn: 4, quality: 44},
          {sellIn: 3, quality: 47},
          {sellIn: 2, quality: 50},
          {sellIn: 1, quality: 50},
          {sellIn: 0, quality: 50},
          {sellIn: -1, quality: 0}
        ]
      }
    ];

    tests.forEach(runTests);
  });

  describe('Sulfuras, Hand of Ragnaros', function () {
    // quality always 80
    // sellIn never changes

    const tests = [
      {
        item: {
          name: "Sulfuras, Hand of Ragnaros",
          sellIn: 15,
          quality: 80,
        },
        expectedResultsByDay: [
          {sellIn: 15, quality: 80},
          {sellIn: 15, quality: 80},
          {sellIn: 15, quality: 80},
          {sellIn: 15, quality: 80}
        ]
      }
    ];

    tests.forEach(runTests);
  });

  describe('Conjured Mana Cake', function () {
    // -2 to quality and sellIn each day
    // -4 to quality when sellIn < 0
    // quality never < 0

    // TODO uncomment when script supports it
    const tests = [
      {
        item: {
          name: "Conjured Mana Cake",
          sellIn: 15,
          quality: 20,
        },
        expectedResultsByDay: [
          {sellIn: 14, quality: 18},
          {sellIn: 13, quality: 16},
          {sellIn: 12, quality: 14},
          {sellIn: 11, quality: 12}
        ]
      }
    ];

    tests.forEach(runTests);
  });
});
