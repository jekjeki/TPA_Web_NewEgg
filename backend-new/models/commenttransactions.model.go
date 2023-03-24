package models

type Commenttransactions struct {
	CommenttrID string `gorm:"type:char(10);primary_key"`
	UserID      string `gorm:"type:char(10);not null"`
	UserwlID    string `gorm:"type:char(10);not null"`
	CommentID   string `gorm:"type:char(10);not null"`
}

type CommenttransactionsInput struct {
	CommenttrID string `json:"commenttr_id" binding:"required"`
	UserID      string `json:"user_id" binding:"required"`
	UserwlID    string `json:"userwl_id" binding:"required"`
	CommentID   string `json:"comment_id" binding:"required"`
}

type CommenttransactionsResponse struct {
	CommenttrID string `json:"commenttr_id"`
}
