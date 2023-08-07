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
    this.items = newItems;
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
