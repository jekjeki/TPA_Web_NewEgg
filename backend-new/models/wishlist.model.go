package models

type Wishlist struct {
	WishlistID   string `gorm:"type:char(5);primary_key"`
	WishlistName string `gorm:"type:varchar(50);not null"`
	WishlistType string `gorm:"type:varchar(50);not null"`
	// UserID       string `gorm:"type:char(5);not null"`
}

type WishlistInput struct {
	WishlistID   string `json:"wishlistid" binding:"required"`
	WishlistName string `json:"wishlist_name" binding:"required"`
	WishlistType string `json:"wishlist_type" binding:"required"`
	// UserID       string `json:"userid" binding:"required"`
}

// wishlist input | my wishlist detail page
type MyWishlistUpdateInput struct {
	WishlistName string `json:"wishlist_name" binding:"required"`
	WishlistType string `json:"wishlist_type" binding:"required"`
}

type WishlistResponse struct {
	WishlistID string `json:"id,omitempty"`
	UserID     string `json:"userid,omitempty"`
}

type UserWishlistLoginInput struct {
	UserID string `json:"userid" binding:"required"`
}

// update wishlist name , type
type UpdateWishlistNameTypeInput struct {
	WishlistID   string `json:"wishlistid" binding:"required"`
	WishlistName string `json:"wishlist_name" binding:"required"`
	WishlistType string `json:"wishlist_type" binding:"required"`
}
