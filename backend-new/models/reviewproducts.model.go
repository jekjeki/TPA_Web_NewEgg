package models

import "time"

type Reviewproducts struct {
	RevprID       string    `gorm:"type:char(10);primary_key"`
	UserID        string    `gorm:"type:char(10);not null"`
	ProductID     string    `gorm:"type:char(10);not null"`
	ReviewValue   float64   `gorm:"type:decimal(10,2);not null"`
	DateReview    time.Time `gorm:"type:date;not null"`
	ReviewComment string    `gorm:"type:varchar(50);not null"`
}

// models for show the average ratings
type ReviewProdModelAvg struct {
	ReviewValue float64 `json:"avg_review_value"`
	Avg         float64 `json:"avg"`
}
