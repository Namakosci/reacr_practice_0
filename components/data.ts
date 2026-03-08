export type fruit = {
    id: number;
    name: string;
    scientificName: string;
    order: string;
    family: string;
    genus: string;
    image: string;
};

export const fruits: fruit[] = [
    {
        id: 1,
        name: "リンゴ",
        scientificName: "Malus domestica",
        order: "Rosales",
        family: "Rosaceae",
        genus: "Malus",
        image: "apple.png",
    },{
        id: 2,
        name: "ブドウ",
        scientificName: "Vitis vinifera",
        order: "Vitales",
        family: "Vitaceae",
        genus: "Vitis",
        image: "grape.png",
    },{
        id: 3,
        name: "オレンジ",
        scientificName: "Citrus sinensis",
        order: "Sapindales",
        family: "Rutaceae",
        genus: "Citrus",
        image: "orange.png",
    },{
        id: 4,
        name: "柿",
        scientificName: "Diospyros kaki",
        order: "Ericales",
        family: "Ebenaceae",
        genus: "Diospyros",
        image: "kaki.png",
    },{
        id: 5,
        name: "モモ",
        scientificName: "Prunus persica",
        order: "Rosales",
        family: "Rosaceae",
        genus: "Prunus",
        image: "momo.png",
    }
]