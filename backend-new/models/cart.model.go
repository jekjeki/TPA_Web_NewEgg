package models

type Cart struct {
	CartID     string `gorm:"type:char(10);not null"`
	ProductID  string `gorm:"type:char(10);not null"`
	UserID     string `gorm:"type:char(10);not null"`
	Qty        int32  `gorm:"type:int;not null"`
	Totalprice int32  `gorm:"type:int;not null"`
}

type CartInput struct {
	CartID     string `json:"cartid" binding:"required"`
	ProductID  string `json:"productid" binding:"required"`
	UserID     string `json:"userid" binding:"required"`
	Qty        int32  `json:"qty" binding:"required"`
	Totalprice int32  `json:"totalprice" binding:"required"`
}

type CartInputResponse struct {
	CartID string `json:"id,omitempty"`
}
