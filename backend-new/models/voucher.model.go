package models

type Voucher struct {
	VoucherID       string  `gorm:"type:varchar(50);primary_key"`
	VoucherName     string  `gorm:"type:varchar(50);not null"`
	VoucherDiscount float32 `gorm:"type:decimal(10,2);not null"`
}

type VoucherInput struct {
	VoucherID       string  `json:"id" binding:"required"`
	VoucherName     string  `json:"vouchername" binding:"required"`
	VoucherDiscount float32 `json:"voucherdiscount" binding:"required"`
}

type VoucherResponse struct {
	VoucherID       string  `json:"id,omitempty"`
	VoucherName     string  `json:"vouchername,omitempty"`
	VoucherDiscount float32 `json:"voucherdiscount,omitempty"`
}
