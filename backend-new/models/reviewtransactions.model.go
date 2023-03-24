package models

type Reviewtransactions struct {
	ReviewtrID string `gorm:"type:char(10);primary_key"`
	UserwlID   string `gorm:"type:char(10);not null"`
	ReviewID   string `gorm:"type:char(10);not null"`
}

type ReviewtransactionsInput struct {
	ReviewtrID string `json:"reviewtr_id" binding:"required"`
	UserwlID   string `json:"userwl_id" binding:"required"`
	ReviewID   string `json:"review_id" binding:"required"`
}
