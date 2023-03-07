package models

type Storetransaction struct {
	StoretransID string `gorm:"type:char(20);primary_key"`
	ShopID       string `gorm:"type:char(20);not null"`
	ProductID    string `gorm:"type:char(20);not null"`
}

type StoreTransInput struct {
	StoretransID string  `json:"storetransid" binding:"required"`
	ShopID       string  `json:"shopid" binding:"required"`
	ProductID    *string `json:"productid" binding:"required"`
}

type StoreTransResponse struct {
	StoretransID string `json:"storetransid,omitempty"`
	ShopID       string `json:"shopid,omitempty"`
	ProductID    string `json:"productid,omitempty"`
}
