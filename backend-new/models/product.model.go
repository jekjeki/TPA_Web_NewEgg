package models

type Product struct {
	ProductID          string  `gorm:"type:varchar(50);primary_key"`
	CategoryID         string  `gorm:"type:varchar(50);not null"`
	ProductName        string  `gorm:"type:varchar(255);not null"`
	Qty                int     `gorm:"type:integer;not null"`
	ProductPrice       float32 `gorm:"type:decimal(10,2);not null"`
	ProductDescription string  `gorm:"type:varchar(255);not null"`
	ProductDetail      string  `gorm:"type:varchar(255);not null"`
	ShopEmail          string  `gorm:"type:varchar(255);not null"`
}

type AddProductInput struct {
	ProductID          *string `json:"productid" binding:"required"`
	CategoryID         string  `json:"categoryid" binding:"required"`
	ProductName        string  `json:"productname" binding:"required"`
	Qty                int     `json:"productstock" binding:"required"`
	ProductPrice       float32 `json:"productprice" binding:"required"`
	ProductDescription string  `json:"productdesc" binding:"required"`
	ProductDetail      string  `json:"productdetail" binding:"required"`
	ShopEmail          string  `json:"storeemail" binding:"required"`
}

type ProductResponse struct {
	ProductID          string  `json:"productid,omitempty"`
	CategoryID         string  `json:"categoryid,omitempty"`
	ProductName        string  `json:"productname,omitempty"`
	Qty                int     `json:"productstock,omitempty"`
	ProductPrice       float32 `json:"productprice,omitempty"`
	ProductDescription string  `json:"productdesc,omitempty"`
	ProductDetail      string  `json:"detail,omitempty"`
}

type UpdateProductInput struct {
	ProductID          *string `json:"productid" binding:"required"`
	ProductName        string  `json:"productname" binding:"required"`
	Qty                int     `json:"productstock" binding:"required"`
	ProductPrice       float32 `json:"productprice" binding:"required"`
	ProductDescription string  `json:"productdesc" binding:"required"`
	ProductDetail      string  `json:"productdetail" binding:"required"`
	ShopEmail          string  `json:"storeemail" binding:"required"`
}
