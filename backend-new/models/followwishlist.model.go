package models

type FollowWishlist struct {
	FollowWishlistID string `gorm:"type:char(10);primary_key"`
	WishlistID       string `gorm:"type:char(10);not null"`
	UserID           string `gorm:"type:char(10);not null"`
}

type FollowWishlistInputAdd struct {
	FollowWishlistID string `json:"follow_wishlist_id" binding:"required"`
	WishlistID       string `json:"wishlist_id" binding:"required"`
	UserID           string `json:"user_id" binding:"required"`
}

// get data follow wishlist
type GetFollowWIshlistResponse struct {
	FollowWishlistID string `json:"follow_wishlist_id"`
	WishlistID       string `json:"wishlist_id"`
	WishlistName     string `json:"wishlist_name"`
}

// delete follow wishlist model
type DeleteFollowWishlist struct {
	FollowWishlistID string `json:"follow_wishlist_id" binding:"required"`
}

// duplicate follow wishlists | to my lists
type DuplicateFollowListToMyListsInput struct {
	UserwlID   string `json:"userwl_id" binding:"required"`
	UserID     string `json:"user_id" binding:"required"`
	WishlistID string `json:"wishlist_id" binding:"required"`
}
