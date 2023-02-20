package models

type Product struct {
	ProductID     string  `gorm:"type:varchar(50);primary_key"`
	CategoryID    string  `gorm:"type:varchar(50);not null"`
	ProductName   string  `gorm:"type:varchar(255);not null"`
	Qty           int     `gorm:"type:integer;not null"`
	ProductStatus string  `gorm:"type:varchar(255);not null"`
	ProductRating float32 `gorm:"type:decimal(10,2);not null"`
	ProductPrice  float32 `gorm:"type:decimal(10,2);not null"`
}
