export type ProductCategory =
  | 'lingerie'
  | 'fragrances'
  | 'wellness'
  | 'couples'
  | 'lifestyle'
  | 'gifts'
  | 'dolls'

export type ProductStatus = 'active' | 'draft' | 'out_of_stock' | 'discontinued'

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'

export interface Product {
  id:          string
  name:        string
  slug:        string
  description: string
  shortDesc:   string
  price:       number
  comparePrice?: number
  currency:    string
  images:      string[]
  category:    ProductCategory
  brandId?:    string
  sku:         string
  stock:       number
  isDiscreet:  boolean
  tags:        string[]
  status:      ProductStatus
  createdAt:   Date
}

export interface ProductVariant {
  id:        string
  productId: string
  name:      string
  options:   Record<string, string>
  price?:    number
  stock:     number
  sku:       string
}

export interface CartItem {
  productId:  string
  variantId?: string
  quantity:   number
  product:    Product
}

export interface Cart {
  items:    CartItem[]
  subtotal: number
  total:    number
}

export interface Order {
  id:            string
  userId:        string
  items:         OrderItem[]
  status:        OrderStatus
  subtotal:      number
  shipping:      number
  total:         number
  addressId:     string
  paymentMethod: string
  paymentRef?:   string
  notes?:        string
  createdAt:     Date
  updatedAt:     Date
}

export interface OrderItem {
  id:        string
  orderId:   string
  productId: string
  variantId?: string
  quantity:  number
  price:     number
  product:   Product
}
