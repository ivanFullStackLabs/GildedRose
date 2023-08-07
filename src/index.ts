import {
  updateAgedBrieItem,
  updateBackstagePassesItem,
  updateConjuredItem,
  updateNormalItem,
  updateSulfurasItem,
} from './ItemHelper';
import { Item } from './Item';
import { ITEM_TYPES } from './Constants';

export default class GildedRose {
  items: Item[] = [];

  constructor(newItems: Item[] = []) {
    if(newItems.length === 0) {
      newItems = this.generateDummyItems();
    }

    this.items = newItems;
  }

  generateDummyItems(): Item[] {
    const dummyItems: Item[] = [];

    dummyItems.push(new Item('+5 Dexterity Vest', 10, 20));
    dummyItems.push(new Item('Aged Brie', 2, 0));
    dummyItems.push(new Item('Elixir of the Mongoose', 5, 7));
    dummyItems.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
    dummyItems.push(
      new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20)
    );
    dummyItems.push(new Item('Conjured Mana Cake', 3, 6));

    return dummyItems;
  }

  updateQuality(): Item[] {
    
    const itemsUpdatedQuality: Item[] = this.items.map((item: Item) => {
      const itemName = item.name.toUpperCase();
      if (itemName.includes(ITEM_TYPES.SULFURAS)) {
        item = updateSulfurasItem(item);
      } else if (itemName.includes(ITEM_TYPES.AGED_BRIE)) {
        item = updateAgedBrieItem(item);
      } else if (itemName.includes(ITEM_TYPES.CONJURED)) {
        item = updateConjuredItem(item);
      } else if (
        itemName.includes(ITEM_TYPES.BACKSTAGE_PASSES)
      ) {
        item = updateBackstagePassesItem(item);
      } else {
        item = updateNormalItem(item);
      }

      return item;
    });

    this.items = itemsUpdatedQuality;

    return this.items
  }
}
