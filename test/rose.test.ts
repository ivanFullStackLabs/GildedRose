import GildedRose from '../src';

describe('update', () => {
  it('works', () => {
    expect(new GildedRose()).not.toBeNull();

    const gildedRose = new GildedRose();

    gildedRose.updateQuality();

    console.log(gildedRose.items);
  });
});
