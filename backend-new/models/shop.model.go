package models

type Shop struct {
	ShopID       string `gorm:"type:char(5);not null"`
	ShopName     string `gorm:"type:varchar(100);not null"`
	ShopEmail    string `gorm:"type:uniqueIndex;not null"`
	ShopPassword string `gorm:"type:varchar(30);not null"`
	ShopStatus   string `gorm:"type:varchar(30);not null"`
	ShopAbout    string `gorm:"type:varchar(255);not null"`
}

type ShopInput struct {
	ShopID       string `json:"id" binding:"required"`
	ShopName     string `json:"shopname" binding:"required"`
	ShopEmail    string `json:"shopemail" binding:"required"`
	ShopPassword string `json:"shoppassword" binding:"required"`
	ShopStatus   string `json:"shopstatus" binding:"required"`
}

type ShopSigninEmail struct {
	ShopEmail string `json:"shopemail" binding:"required"`
}

type ShopLoginInput struct {
	ShopEmail    string `json:"shopemail" binding:"required"`
	ShopPassword string `json:"shoppassword" binding:"required"`
}

type BanShopInput struct {
	ShopID     string `json:"shopid" binding:"required"`
	ShopStatus string `json:"shopstatus" binding:"required"`
}

type StoreResponse struct {
	ShopID    string `json:"shopid,omitempty"`
	ShopEmail string `json:"shopemail,omitempty"`
}

// response for update
type StoreResponseUpdate struct {
	ShopID    string `json:"shopid,omitempty"`
	ShopName  string `json:"shopname,omitempty"`
	ShopAbout string `json:"shopabout,omitempty"`
}

type UpdateStoreProfileInput struct {
	ShopID    string `json:"shopid" binding:"required"`
	ShopName  string `json:"shopname" binding:"required"`
	ShopAbout string `json:"shopabout" binding:"required"`
}

// email for view product and paginate
type EmailInputProduct struct {
	ShopEmail *string `json:"shopemail" binding:"required"`
}

type ShopIdDisplayInformationInput struct {
	ShopID *string `json:"shopid" binding:"required"`
}
