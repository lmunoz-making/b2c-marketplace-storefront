type SellerAddress = {
  address_line?: string
  city?: string
  country_code?: string
  postal_code?: string
}

type SellerProps = SellerAddress & {
  id: string
  name: string
  handle: string
  description: string
  photo: string
  tax_id: string
  created_at: string
  rating?: number
  reviewCount?: number
}
