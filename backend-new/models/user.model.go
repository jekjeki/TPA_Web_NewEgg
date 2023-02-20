package models

type User struct {
	ID         string `gorm:"type:varchar(50);primary_key"`
	FirstName  string `gorm:"type:varchar(255);not null"`
	LastName   string `gorm:"type:varchar(255);not null"`
	Role       string `gorm:"type:varchar(255);not null"`
	Email      string `gorm:"uniqueIndex;not null"`
	Phone      string `gorm:"type:varchar(255);not null"`
	Password   string `gorm:"type:varchar(255);not null"`
	Subscribe  string `gorm:"type:varchar(255);not null"`
	StatusUser string `gorm:"type:varchar(255);not null"`
}

type BanUnbanInput struct {
	ID         string `json:"id" binding:"required"`
	StatusUser string `json:"statususer" binding:"required"`
}

type SignUpInput struct {
	ID        string `json:"id" binding:"required"`
	FirstName string `json:"firstname" binding:"required"`
	LastName  string `json:"lastname" binding:"required"`
	Email     string `json:"email" binding:"required"`
	Phone     string `json:"phone" binding:"required"`
	Password  string `json:"password" binding:"required"`
	Subscribe string `json:"subscribe" binding:"required"`
}

type SignInInput struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type SignInEmail struct {
	Email string `json:"email" binding:"required"`
}

type UserResponse struct {
	ID        string `json:"id,omitempty"`
	FirstName string `json:"first_name,omitempty"`
	LastName  string `json:"last_name,omitempty"`
	Role      string `json:"role,omitempty"`
}
