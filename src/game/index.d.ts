
interface Condition {
  id: number,
  name: string,
  description: string,
}

interface BaseStats {
  strength: number,
  dexterity: number,
  charisma: number,
  luck: number,
}

interface FinalStats {
  strengthDamage: number,
  strengthBlock: number,
  strengthResistance: number,
  dexterityDodge: number,
  dexterityDamage: number,
  dexterityBlock: number,
  dexterityIntitiative: number,
  charismaMagic: number,
  charismaTalking: number,
  luckDamage: number,
  luckDodge: number,
  luckShopInv: number,
  luckEncounter: number,
  luckLoot: number,
  // Chance to apply luck in randomInRange(min, max, luck)
  luckApplyChance: number,
}
