import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/catagories/category.selector';
import { CategoryContainer, CategoryTitle } from './category.style';

type CategoryRouteParams = {
    category: string
}

const Category = () => {
    const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            {isLoading && <Spinner />}
            {!isLoading && <CategoryContainer>
                {products && products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </CategoryContainer>}
        </>
    )
}

export default Category