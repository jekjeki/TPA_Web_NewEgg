package models

// model for select public wishlist detail
type PublicWishlistDetailSelect struct {
	ProductID    string  `json:"product_id"`
	ProductName  string  `json:"product_name"`
	ProductPrice float64 `json:"product_price"`
	Totalqty     int     `json:"qty"`
}
