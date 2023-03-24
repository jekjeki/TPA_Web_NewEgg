package models

type Publicwishlist struct {
	WishlistID   string  `gorm:"type:char(10);not null"`
	WishlistType string  `gorm:"type:char(20);not null"`
	Date         string  `gorm:"type:date;not null"`
	TotalRating  float32 `gorm:"type:float"`
	TotalPrice   int     `gorm:"type:int"`
	ReviewID     string  `gorm:"type:char(10)"`
}

type PublicwishlistInput struct {
	WishlistID   string  `json:"wishlistid" binding:"required"`
	WishlistType string  `json:"wishlist_type" binding:"required"`
	Date         string  `json:"date" binding:"required"`
	TotalRating  float32 `json:"totalrating"`
	TotalPrice   int     `json:"totalprice"`
}

type WishlistProduct struct {
	WishlistID   string  `json:"wishlistid"`
	ProductName  string  `json:"product_name"`
	ProductPrice float64 `json:"product_price"`
	ShopID       string  `json:"shop_id"`
	ProductID    string  `json:"product_id"`
}

type SelectData struct {
	WishlistID   string `json:"wishlist_id"`
	WishlistName string `json:"wishlist_name"`
	TotalPrice   int    `json:"totalprice"`
	UserwlID     string `json:"userwl_id"`
}
