package models

type Review struct {
	ReviewID    string  `gorm:"type:char(10);primary_key"`
	ReviewValue float32 `gorm:"type:char(10);not null"`
}

type ReviewInput struct {
	ReviewID    string  `json:"review_id" binding:"required"`
	ReviewValue float32 `json:"review_value" binding:"required"`
}
