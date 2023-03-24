package models

type Product struct {
	ProductID          string  `gorm:"type:varchar(50);primary_key"`
	CategoryID         string  `gorm:"type:varchar(50);not null"`
	ProductName        string  `gorm:"type:varchar(255);not null"`
	Qty                int     `gorm:"type:integer;not null"`
	ProductPrice       float32 `gorm:"type:decimal(10,2);not null"`
	ProductDescription string  `gorm:"type:varchar(255);not null"`
	ProductDetail      string  `gorm:"type:varchar(255);not null"`
	ShopEmail          string  `gorm:"type:varchar(255);not null"`
}

type AddProductInput struct {
	ProductID          *string `json:"productid" binding:"required"`
	CategoryID         string  `json:"categoryid" binding:"required"`
	ProductName        string  `json:"productname" binding:"required"`
	Qty                int     `json:"productstock" binding:"required"`
	ProductPrice       float32 `json:"productprice" binding:"required"`
	ProductDescription string  `json:"productdesc" binding:"required"`
	ProductDetail      string  `json:"productdetail" binding:"required"`
	ShopEmail          string  `json:"storeemail" binding:"required"`
}

type ProductResponse struct {
	ProductID          string  `json:"productid,omitempty"`
	CategoryID         string  `json:"categoryid,omitempty"`
	ProductName        string  `json:"productname,omitempty"`
	Qty                int     `json:"productstock,omitempty"`
	ProductPrice       float32 `json:"productprice,omitempty"`
	ProductDescription string  `json:"productdesc,omitempty"`
	ProductDetail      string  `json:"detail,omitempty"`
}

type UpdateProductInput struct {
	ProductID          *string `json:"productid" binding:"required"`
	ProductName        string  `json:"productname" binding:"required"`
	Qty                int     `json:"productstock" binding:"required"`
	ProductPrice       float32 `json:"productprice" binding:"required"`
	ProductDescription string  `json:"productdesc" binding:"required"`
	ProductDetail      string  `json:"productdetail" binding:"required"`
	ShopEmail          string  `json:"storeemail" binding:"required"`
}

// my wishlist add all products to cart
type MyWishlistAddProductstoCartInput struct {
	CartID    string `json:"cart_id" binding:"required"`
	ProductID string `json:"product_id" binding:"required"`
	UserID    string `json:"user_id" binding:"required"`
	Qty       int    `json:"total_qty" binding:"required"`
}

// display data in follow wishlist
type DisplayProductFollowWishlist struct {
	WishlistID  string `json:"wishlist_id"`
	ProductID   string `json:"product_id"`
	ProductName string `json:"product_name"`
	Totalprice  int    `json:"total_price"`
}

// select product name, product price, product review | shop product page
type ShowProductDataAndReview struct {
	ProductID    string  `json:"product_id"`
	ProductName  string  `json:"product_name"`
	ProductPrice int     `json:"product_price"`
	ReviewValue  float32 `json:"review_value"`
}

// count total users give review to products shop
type CountUserGiveReview struct {
	UserID string `json:"user_id"`
}
