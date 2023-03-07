package models

type Emailsubscribe struct {
	SubsID    string `gorm:"type:char(5);primary_key"`
	SubsEmail string `gorm:"type:varchar(30);not null"`
}

type EmailSubscribeInput struct {
	SubsID    string `json:"subsid" binding:"required"`
	SubsEmail string `json:"subsemail" binding:"required"`
}

type EmailSubscribeResponse struct {
	SubsID string `json:"subsid" binding:"required"`
}
