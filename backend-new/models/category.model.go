package models

type Category struct {
	ID           string `gorm:"type:char(10);primary_key"`
	CategoryName string `gorm:"type:varchar(100);not null"`
}

type CategoryResponse struct {
	ID           string `json:"id,omitempty"`
	CategoryName string `json:"category_name,omitempty"`
}
