import { useContext } from 'react';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import { CategoriesContext } from '../../contexts/categories.context';

const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext);

    return (
        <>
            {Object.keys(categoriesMap).map(title => (
                <CategoryPreview title={title} products={categoriesMap[title]} key={title} />
            ))}
        </>
    )
}

export default CategoriesPreview;