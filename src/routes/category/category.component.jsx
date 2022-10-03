import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/catagories/category.selector';
import './category.style.scss';

const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            {isLoading && <Spinner />}
            {!isLoading && <div className='category-container'>
                {products && products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>}
        </>
    )
}

export default Category