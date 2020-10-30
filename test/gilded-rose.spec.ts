import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    /* Items from text tests */
    // new Item("+5 Dexterity Vest", 10, 20), //
    // new Item("Aged Brie", 2, 0), //
    // new Item("Elixir of the Mongoose", 5, 7), //
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

    it('should foo', function() {
        const gildedRose = new GildedRose([ new Item('foo', 0, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('fixme');
    });

});
