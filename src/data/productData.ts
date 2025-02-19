import af1 from "../assets/airforce1.png"
import speedcat from "../assets/speedcat.avif"
import samba from "../assets/sambas.avif"
import { Product } from "../types/Product";


const products: Product[] = [
    {
        _id: 1,
        image: af1,
        name: "Air Force 1",
        description: "Red Sneakers.",
        star_rating: 5,
        price: 9999
    },
    {
        _id: 2,
        image: speedcat,
        name: "Puma Speedcat",
        description: "Brown Sneakers.",
        star_rating: 4.1,
        price: 8999
    },
    {
        _id: 3,
        image: samba,
        name: "Adidas Samba",
        description: "White Sneakers.",
        star_rating: 4.5,
        price: 11999
    },
];

export default products;