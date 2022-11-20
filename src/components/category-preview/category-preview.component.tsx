import { FC } from 'react';
import { Link } from 'react-router-dom';
import { CategoryItem } from '../../store/catagories/category.types';
import ProductCard from '../product-card/product-card.component';
import { CategoryPreviewContainer } from './category-preview.style.jsx';

type CategoryPreviewProps = {
    title: string
    products: CategoryItem[]
}

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <Link className='title' to={title}>
                    {title.toUpperCase()}
                </Link>
            </h2>

            <div className='preview'>
                {products.map((product, i) => i < 4 ? (
                    <ProductCard key={product.id} product={product} />
                ) : null)}
            </div>
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview