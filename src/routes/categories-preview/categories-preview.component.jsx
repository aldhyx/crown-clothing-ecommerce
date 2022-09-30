import { useSelector } from 'react-redux';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import { selectCategoriesMap } from '../../store/catagories/category.selector';

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);

    return (
        <>
            {Object.keys(categoriesMap).map(title => (
                <CategoryPreview title={title} products={categoriesMap[title]} key={title} />
            ))}
        </>
    )
}

export default CategoriesPreview;