import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

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

    describe('General items', function () {
      const tests = [{
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
      }]

      tests.forEach(test => {
        describe(`Should test ${test.item.name}`, function() {
          const { item: { name, sellIn, quality }, expectedResultsByDay } = test
            const gildedRose = new GildedRose([ new Item(name, sellIn, quality) ]);
            expect(gildedRose.items[0].name).to.equal(name);
            expectedResultsByDay.forEach(({ sellIn, quality }, index) => {
              it(`Day ${index + 1} should return sellIn: ${quality} and quality: ${quality}`, function() {
                const items = gildedRose.updateQuality();
                expect(items[0].sellIn).to.equal(sellIn);
                expect(items[0].quality).to.equal(quality);
              });
            });
        });
      });
    });
});
