import React, { ChangeEvent, useState } from 'react'
import { Product } from '../types/Product'

interface SearchBarProps {
    products: Product[];
    setFilteredProducts: (products: Product[]) => void
}

const SearchBar: React.FC<SearchBarProps> = ({products, setFilteredProducts}) => {
    const [text, setText] = useState('');

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("function calling")
        setText(e.target.value)
        const searchTerm = e.target.value.toLowerCase();

        if(searchTerm === ''){
            setFilteredProducts(products);
            return;
        }
        const filtered = products.filter(product => 
            product.title.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
        setFilteredProducts(filtered);
    }
    
  return (
    <div className='text-center mt-6'>
       <input
        type='text'
        placeholder='Search by category or name'
        className='w-full sm:w-[60%] border-2 border-green-700 rounded-2xl p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-600'
        value={text}
        onChange={handleSearch}
       />

    </div>
  )
}

export default SearchBar