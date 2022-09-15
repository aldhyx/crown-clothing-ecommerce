import { useContext } from 'react';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import { CategoriesContext } from '../../contexts/categories.context';
import './shop.style.scss';

const Shop = () => {
    const { categoriesMap } = useContext(CategoriesContext);

    return (
        <div className='shop-container'>
            {Object.keys(categoriesMap).map(title => (
                <CategoryPreview title={title} products={categoriesMap[title]} key={title} />
            ))}
        </div>
    )
}

export default Shop;