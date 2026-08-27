export type BrandCategory =
  | "wine"
  | "spirits"
  | "softDrinks";

export interface Brand {
  id: string;

  title: string;

  subtitle: string;

  description: string;

  image: string;

  thumbnail: string;

  type: string;

  link: string;
}

export type BrandCollection = Record<
  BrandCategory,
  Brand[]
>;