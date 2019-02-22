import { AbstractProduct } from '../models';

export const dataProducts: AbstractProduct[] = [];

const generateProducts = (): void => {
  for (let i = 0; i < 100; i++) {
    dataProducts.push({
      id: i,
      title: `Some title #${i}`,
      description: `Lorem${i} ipsum dolor sit amet, consectetur adipisicing elit.Aut ex inventore magnam
      molestiae nam neque quia quisquam recusandae unde ut.`,
      price: rand(0, 999),
      date: Date.now() + rand(50000, 11000000000)
    });
  }
};

const rand = (min, max): number => Math.floor(min + (Math.random() * (max + 1 - min)));
generateProducts();
