package models

type Notestransaction struct {
	NotetrID   string `gorm:"type:char(10);primary_key"`
	WishlistID string `gorm:"type:char(10);not null"`
	NoteID     string `gorm:"type:char(10);not null"`
}

type NotestransactionInput struct {
	NotetrID   string `json:"notetr_id" binding:"required"`
	WishlistID string `json:"wishlist_id" binding:"required"`
	NoteID     string `json:"note_id" binding:"required"`
}
