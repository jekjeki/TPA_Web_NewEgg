package models

type Userwishlisttransaction struct {
	UserwlID   string `gorm:"type:char(5);primary_key"`
	UserID     string `gorm:"type:char(5);not null"`
	WishlistID string `gorm:"type:char(5);not null"`
}

type UserwishlistInput struct {
	UserwlID   string `json:"userwlID" binding:"required"`
	UserID     string `json:"userID" binding:"required"`
	WishlistID string `json:"wishlistID" binding:"required"`
}
