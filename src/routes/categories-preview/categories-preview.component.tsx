import { useSelector } from 'react-redux';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import Spinner from '../../components/spinner/spinner.component';
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/catagories/category.selector';

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);

    return (
        <>
            {isLoading && <Spinner />}
            {!isLoading && Object.keys(categoriesMap).map(title => (
                <CategoryPreview title={title} products={categoriesMap[title]} key={title} />
            ))}
        </>
    )
}

export default CategoriesPreview;