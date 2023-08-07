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

    it('Quality of an item is never more than 50', () => {
      const items: Item[] = [
        new Item('Extreme quality item', 10, 999),
      ];

      const gildedRose = new GildedRose(items);

      expect(gildedRose).not.toBeNull();

      expect(gildedRose.items).toHaveLength(items.length);
      expect(gildedRose.items).toEqual(items);

      // First Day
      gildedRose.updateQuality();

      expect(gildedRose.items[0].quality).toBe(49);
      expect(gildedRose.items[0].sellIn).toBe(9);

      // Second Day
      gildedRose.updateQuality();

      expect(gildedRose.items[0].quality).toBe(48);
      expect(gildedRose.items[0].sellIn).toBe(8);

    });
  });

  describe('Aged Brie', () => {

    it('Increase quality the older it gets', () => {
      const items: Item[] = [
        new Item('Aged Brie high quality', 10, 100),
        new Item('Aged Brie normal quality', 9, 10),
      ];

      const gildedRose = new GildedRose(items);

      expect(gildedRose).not.toBeNull();

      expect(gildedRose.items).toHaveLength(items.length);
      expect(gildedRose.items).toEqual(items);

      // First Day
      gildedRose.updateQuality();

      expect(gildedRose.items[0].quality).toBe(50);
      expect(gildedRose.items[0].sellIn).toBe(9);

      expect(gildedRose.items[1].quality).toBe(11);
      expect(gildedRose.items[1].sellIn).toBe(8);

      // Second Day
      gildedRose.updateQuality();

      expect(gildedRose.items[0].quality).toBe(50);
      expect(gildedRose.items[0].sellIn).toBe(8);

      expect(gildedRose.items[1].quality).toBe(12);
      expect(gildedRose.items[1].sellIn).toBe(7);
    });

  });

  describe('Sulfuras', () => {
    it('Never has to be sold nor does it decrease in quality', () => {
      const items: Item[] = [
        new Item('Red Sulfuras', 10, 90),
        new Item('Blue Sulfuras', 9, 80),
      ];

      const gildedRose = new GildedRose(items);

      expect(gildedRose).not.toBeNull();

      expect(gildedRose.items).toHaveLength(items.length);
      expect(gildedRose.items).toEqual(items);


      // Number of days to run test
      const daysToRun = 50;

      for (let day = 0; day < daysToRun; day++) {
        gildedRose.updateQuality();

        gildedRose.items.forEach(({quality, sellIn}: Item, index: number) => {
          expect(quality).toEqual(80);
          expect(sellIn).toEqual(items[index].sellIn);
        });
      }
    });
  });

  describe('Backstage passes', () => {
    it('Increase in quality as its sellIn value decreases', () => {
      const items: Item[] = [
        new Item('Hozier Backstage passes', 20, 10),
        new Item('Kaleo Backstage passes', 20, 9),
      ];

      const gildedRose = new GildedRose(items);

      expect(gildedRose).not.toBeNull();

      expect(gildedRose.items).toHaveLength(items.length);
      expect(gildedRose.items).toEqual(items);

      // Number of days to run test
      const daysToRun = 9;

      for (let day = 0; day < daysToRun; day++) {
        gildedRose.updateQuality();

        gildedRose.items.forEach(({quality, sellIn}: Item, index: number) => {
          expect(quality).toEqual(items[index].quality + (day + 1));
          expect(sellIn).toEqual(items[index].sellIn - (day + 1));
        });
      }
    });

    it('Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but drops to 0 after the concert', () => {
      const items: Item[] = [
        new Item('Hozier Backstage passes', 20, 10),
        new Item('Kaleo Backstage passes', 20, 9),
      ];

      const gildedRose = new GildedRose(items);

      expect(gildedRose).not.toBeNull();

      expect(gildedRose.items).toHaveLength(items.length);
      expect(gildedRose.items).toEqual(items);
      
      // Normal behavior
      let daysToRun = 9;

      for (let day = 0; day < daysToRun; day++) {
        gildedRose.updateQuality();

        gildedRose.items.forEach(({quality, sellIn}: Item, index: number) => {
          expect(quality).toEqual(items[index].quality + (day + 1));
          expect(sellIn).toEqual(items[index].sellIn - (day + 1));
        });
      }

      // Less than 10 days
      daysToRun = 5;
      let itemsSnapshot: Item[] = gildedRose.items.slice(0);

      for (let day = 0; day < daysToRun; day++) {
        gildedRose.updateQuality();

        gildedRose.items.forEach(({quality, sellIn}: Item, index: number) => {
          expect(quality).toEqual(itemsSnapshot[index].quality + ((day + 1) * 2));
          expect(sellIn).toEqual(itemsSnapshot[index].sellIn - (day + 1));
        });
      }

      // Less than 5 days
      daysToRun = 6;
      itemsSnapshot = gildedRose.items;

      for (let day = 0; day < daysToRun; day++) {
        gildedRose.updateQuality();
        
        gildedRose.items.forEach(({quality, sellIn}: Item, index: number) => {
          expect(quality).toEqual(itemsSnapshot[index].quality + ((day + 1) * 3));
          expect(sellIn).toEqual(itemsSnapshot[index].sellIn - (day + 1));
        });
      }

      // Less than 0 days
      daysToRun = 10;
      itemsSnapshot = gildedRose.items;

      for (let day = 0; day < daysToRun; day++) {
        gildedRose.updateQuality();

        gildedRose.items.forEach(({quality, sellIn}: Item, index: number) => {
          expect(quality).toEqual(0);
          expect(sellIn).toEqual(itemsSnapshot[index].sellIn - (day + 1));
        });
      }
    });

    it('Quality never be more than 50', () => {
      const items: Item[] = [
        new Item('Rag N Bone Man Backstage passes', 999, 50),
        new Item('Imagine Dragons Backstage passes', 999, 49),
      ];

      const gildedRose = new GildedRose(items);

      expect(gildedRose).not.toBeNull();

      expect(gildedRose.items).toHaveLength(items.length);
      expect(gildedRose.items).toEqual(items);

      // First day
      gildedRose.updateQuality();

      expect(gildedRose.items[0].quality).toEqual(50);
      expect(gildedRose.items[0].sellIn).toEqual(998);

      expect(gildedRose.items[1].quality).toEqual(50);
      expect(gildedRose.items[1].sellIn).toEqual(998);

      // Normal behavior
      let daysToRun = 50;

      for (let day = 0; day < daysToRun; day++) {
        gildedRose.updateQuality();

        gildedRose.items.forEach(({quality, sellIn}: Item, index: number) => {
          expect(quality).toEqual(50);
          expect(sellIn).toEqual(items[index].sellIn - (day + 2));
        });
      }
    })
  });

  describe('Conjured items', () => {

  })
});
