package models

type SendEmail struct {
	Subject string `gorm:"type:varchar(255);not null"`
	Message string `gorm:"type:varchar(255);not null"`
}

type SendEmailInput struct {
	Subject string `json:"subject" binding:"required"`
	Message string `json:"message" binding:"required"`
}
