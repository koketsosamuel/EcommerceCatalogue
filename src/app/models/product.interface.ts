export default interface IProduct {
    name: string;
    category: string;
    price: number;
    salePrice: number | null;
    imgSrc: string;
}