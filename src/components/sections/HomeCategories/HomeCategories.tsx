import { Carousel } from '@/components/cells';
import { CategoryCard } from '@/components/organisms';
import { PARENT_CATEGORIES } from '@/const';
import { listCategories } from '@/lib/data/categories';
import { HttpTypes } from '@medusajs/types';

export const HomeCategories = async ({
  heading,
}: {
  heading: string;
}) => {
  const { categories } = (await listCategories({
    headingCategories: PARENT_CATEGORIES,
  })) as {
    categories: HttpTypes.StoreProductCategory[];
  };

  return (
    <section className='bg-primary py-8 w-full'>
      <div className='mb-6'>
        <h2 className='heading-lg text-primary uppercase'>
          {heading}
        </h2>
      </div>
      <Carousel
        items={categories?.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
          />
        ))}
      />
    </section>
  );
};
