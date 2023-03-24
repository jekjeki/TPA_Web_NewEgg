package models

type Comment struct {
	CommentID    string `gorm:"type:char(10);primary_key"`
	CommentTitle string `gorm:"type:varchar(50);not null"`
	CommentDesc  string `gorm:"type:varchar(100);not null"`
}

type CommentInput struct {
	CommentID    string `json:"comment_id" binding:"required"`
	CommentTitle string `json:"comment_title" binding:"required"`
	CommentDesc  string `json:"comment_desc" binding:"required"`
}

type CommentResponse struct {
	CommentID string `json:"comment_id"`
}

// display all comment in wishlist detail
type ViewAllCommentResponse struct {
	FirstName    string  `json:"first_name"`
	CommentID    string  `json:"comment_id"`
	UserwlID     string  `json:"userwl_id"`
	CommentTitle string  `json:"comment_title"`
	CommentDesc  string  `json:"comment_desc"`
	ReviewID     string  `json:"review_id"`
	ReviewValue  float32 `json:"review_value"`
}
