import { MAX_QUALITY, MIN_QUALITY, SULFURAS_QUALITY } from './Constants';
import { Item } from './Item';

const increaseQuality = (item: Item, amount: number = 1): Item => {
  if (item.quality + amount < MAX_QUALITY) {
    item.quality = item.quality + amount;
  } else {
    item.quality = MAX_QUALITY;
  }

  return item;
};

const dropQualityToZero = (item: Item): Item => {
  item.quality = 0;
  return item;
};

const decreaseQuality = (item: Item, amount: number = 1): Item => {
  if (item.quality - amount > MIN_QUALITY) {
    item.quality = item.quality - amount;
  } else {
    item.quality = MIN_QUALITY;
  }

  return item;
};

const decreaseSellIn = (item: Item, amount: number = 1): Item => {
    item.sellIn = item.sellIn - amount;
    return item;
}

export const updateNormalItem = (item: Item): Item => {
  item = decreaseSellIn(item);
  if (item.sellIn < 0) {
    item = decreaseQuality(item, 2);

  } else {
    item = decreaseQuality(item);
  }
  return item;
};

export const updateConjuredItem = (item: Item): Item => {
  item = decreaseSellIn(item);
  if (item.sellIn < 0) {
    item = decreaseQuality(item, 4);
  } else {
    item = decreaseQuality(item, 2);
  }

  return item;
};

export const updateAgedBrieItem = (item: Item): Item => {
  item = decreaseSellIn(item);
  item = increaseQuality(item);
  return item;
};

export const updateSulfurasItem = (item: Item): Item => {
    item.quality = SULFURAS_QUALITY;
    return item;
}
export const updateBackstagePassesItem = (item: Item): Item => {
  item = decreaseSellIn(item);
  if (item.sellIn < 0) {
    item = dropQualityToZero(item);
  } else if (item.sellIn <= 5) {
    item = increaseQuality(item, 3);
  } else if (item.sellIn <= 10) {
    item = increaseQuality(item, 2);
  } else {
    item = increaseQuality(item);
  }
  return item;
};
