package models

type Wishlisttransactions struct {
	WishtrID   string `gorm:"type:char(5);primary_key"`
	ProductID  string `gorm:"type:char(5);not null"`
	ShopID     string `gorm:"type:char(5);not null"`
	UserID     string `gorm:"type:char(5);not null"`
	WishlistID string `gorm:"type:char(5);not null"`
	Totalqty   int    `gorm:"type:int;not null"`
	Totalprice int    `gorm:"type:int;not null"`
}

type WishlisttransactionsInput struct {
	WishtrID   string `json:"wishtrID" binding:"required"`
	ProductID  string `json:"productID" binding:"required"`
	ShopID     string `json:"shopID" binding:"required"`
	UserID     string `json:"userID" binding:"required"`
	WishlistID string `json:"wishlistID" binding:"required"`
	Totalqty   int    `json:"totalqty" binding:"required"`
	Totalprice int    `json:"totalprice" binding:"required"`
}

type WishlisttransactionsResponse struct {
	WishTrID string `json:"id,omitempty"`
}

// my lists model transaction
type MyListTrProd struct {
	WishlistID  string `json:"wishlist_id,omitempty"`
	ProductID   string `json:"product_id,omitempty"`
	ProductName string `json:"product_name,omitempty"`
	Totalprice  int    `json:"totalprice,omitempty"`
}

// my list detail input update qty
type UpdateQtyMyListInput struct {
	TotalQty int `json:"total_qty" binding:"required"`
}

// my list detail delete product in wishlist
type DeleteProductinWishlistInput struct {
	ProductID string `json:"product_id" binding:"required"`
}
