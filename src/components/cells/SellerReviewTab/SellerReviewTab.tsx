import {
  SellerReviewList,
  SellerScore,
} from '@/components/molecules';
import { seller } from '@/data/sellerMock';

export const SellerReviewTab = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-4 mt-8'>
      <div className='border rounded-sm p-4'>
        <SellerScore
          rate={seller.rating}
          reviewCount={seller.reviewCount}
        />
      </div>
      <div className='col-span-3 border rounded-sm p-4'>
        <h3 className='heading-sm uppercase border-b pb-4'>
          Seller reviews
        </h3>
        <SellerReviewList reviews={seller.reviews} />
      </div>
    </div>
  );
};
