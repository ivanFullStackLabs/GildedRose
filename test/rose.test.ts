import { Item } from '../src/Item';
import GildedRose from '../src';

describe('update', () => {
  describe('Normal items', () => {
    it('Lowers quality and sellIn every day by one', () => {
      const items: Item[] = [
        new Item('Normal Item 1', 10, 10),
        new Item('Normal Item 2', 9, 9),
        new Item('Normal Item 3', 8, 8),
      ];

      const gildedRose = new GildedRose(items);

      expect(gildedRose).not.toBeNull();

      expect(gildedRose.items).toHaveLength(items.length);
      expect(gildedRose.items).toEqual(items);

      // Number of days to run test
      const daysToRun = 5;

      for (let day = 0; day < daysToRun; day++) {
        gildedRose.updateQuality();

        gildedRose.items.forEach(({quality, sellIn}: Item, index: number) => {
          expect(quality).toEqual(items[index].quality - (day + 1));
          expect(sellIn).toEqual(items[index].sellIn - (day + 1));
        });
      }
    });

    it('Lowers quality twice as fast on sellIn less than zero', () => {
      const items: Item[] = [
        new Item('Normal Item 1', 1, 10),
        new Item('Normal Item 2', -1, 10),
        new Item('Normal Item 3', 10, 10),
      ];

      const gildedRose = new GildedRose(items);

      expect(gildedRose).not.toBeNull();

      expect(gildedRose.items).toHaveLength(items.length);
      expect(gildedRose.items).toEqual(items);

      // First Day
      gildedRose.updateQuality();

      expect(gildedRose.items[0].sellIn).toEqual(0);
      expect(gildedRose.items[0].quality).toEqual(9);

      expect(gildedRose.items[1].sellIn).toEqual(-2);
      expect(gildedRose.items[1].quality).toEqual(8);

      expect(gildedRose.items[2].sellIn).toEqual(9);
      expect(gildedRose.items[2].quality).toEqual(9);

      // Second Day
      gildedRose.updateQuality();

      expect(gildedRose.items[0].sellIn).toEqual(-1);
      expect(gildedRose.items[0].quality).toEqual(7);

      expect(gildedRose.items[1].sellIn).toEqual(-3);
      expect(gildedRose.items[1].quality).toEqual(6);

      expect(gildedRose.items[2].sellIn).toEqual(8);
      expect(gildedRose.items[2].quality).toEqual(8);

      // Third Day
      gildedRose.updateQuality();

      expect(gildedRose.items[0].sellIn).toEqual(-2);
      expect(gildedRose.items[0].quality).toEqual(5);

      expect(gildedRose.items[1].sellIn).toEqual(-4);
      expect(gildedRose.items[1].quality).toEqual(4);

      expect(gildedRose.items[2].sellIn).toEqual(7);
      expect(gildedRose.items[2].quality).toEqual(7);

      // Fourth Day
      gildedRose.updateQuality();

      expect(gildedRose.items[0].sellIn).toEqual(-3);
      expect(gildedRose.items[0].quality).toEqual(3);

      expect(gildedRose.items[1].sellIn).toEqual(-5);
      expect(gildedRose.items[1].quality).toEqual(2);

      expect(gildedRose.items[2].sellIn).toEqual(6);
      expect(gildedRose.items[2].quality).toEqual(6);

      // Fifth Day
      gildedRose.updateQuality();

      expect(gildedRose.items[0].sellIn).toEqual(-4);
      expect(gildedRose.items[0].quality).toEqual(1);

      expect(gildedRose.items[1].sellIn).toEqual(-6);
      expect(gildedRose.items[1].quality).toEqual(0);

      expect(gildedRose.items[2].sellIn).toEqual(5);
      expect(gildedRose.items[2].quality).toEqual(5);

      // Sixth Day
      gildedRose.updateQuality();

      expect(gildedRose.items[0].sellIn).toEqual(-5);
      expect(gildedRose.items[0].quality).toEqual(0);

      expect(gildedRose.items[1].sellIn).toEqual(-7);
      expect(gildedRose.items[1].quality).toEqual(0);

      expect(gildedRose.items[2].sellIn).toEqual(4);
      expect(gildedRose.items[2].quality).toEqual(4);
    });

    it('Quality of an item is never negative', () => {
      const items: Item[] = [
        new Item('Normal Item 1', 0, 1),
        new Item('Normal Item 2', 9, 1),
      ];

      const gildedRose = new GildedRose(items);

      expect(gildedRose).not.toBeNull();

      expect(gildedRose.items).toHaveLength(items.length);
      expect(gildedRose.items).toEqual(items);

      // Number of days to run test
      const daysToRun = 3;

      for (let day = 0; day < daysToRun; day++) {
        gildedRose.updateQuality();

        gildedRose.items.forEach(({quality, sellIn}: Item, index: number) => {
          expect(quality).toEqual(0); // Never negative!
          expect(sellIn).toEqual(items[index].sellIn - (day + 1));
        });
      }
    });
  });
});
