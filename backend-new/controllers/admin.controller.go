package controllers

import (
	"net/http"
	"net/smtp"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/jekjeki/golang-gorm-postgres/models"
	"gorm.io/gorm"
)

type AdminController struct {
	DB *gorm.DB
}

func NewAdminController(DB *gorm.DB) AdminController {
	return AdminController{DB}
}

// get all users
func (ad *AdminController) GetAllUsers(ctx *gin.Context) {

	var getusers []models.User

	result := ad.DB.Where("role = ?", "user").Find(&getusers)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "failed get data"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "users_all": getusers})
}

// ban users
func (ad *AdminController) BanUnbanUser(ctx *gin.Context) {
	var payload *models.BanUnbanInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	var users models.User

	result := ad.DB.Model(&users).Where("id = ?", payload.ID).Update("status_user", payload.StatusUser)
	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": result.Error})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "user_id": users.ID})
}

// get users where check subsribe
func (ad *AdminController) GetUsersCheckSubsribe(ctx *gin.Context) {
	var userssubs []models.User

	result := ad.DB.Where("subscribe = ?", "checked").Find(&userssubs)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": result.Error})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "user_subscribe": userssubs})
}

// send email
func (ad *AdminController) AdminSendMail(ctx *gin.Context) {

	var payload *models.SendEmailInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	newEmail := models.SendEmail{
		Subject: payload.Subject,
		Message: payload.Message,
	}

	auth := smtp.PlainAuth(
		"",
		"yusufzaki013@gmail.com",
		"xnodhfnqsjllbijc",
		"smtp.gmail.com",
	)

	msg := "Subject:" + newEmail.Subject + "\n" + newEmail.Message + ""

	send := smtp.SendMail(
		"smtp.gmail.com:587",
		auth,
		"yusufzaki013@gmail.com",
		[]string{"jekjekii060@gmail.com"},
		[]byte(msg),
	)

	if send != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": send.Error})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "message": payload.Message})
}

// insert shop
func (ad *AdminController) InsertShop(ctx *gin.Context) {
	var payload *models.ShopInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	newShop := models.Shop{
		ShopID:       payload.ShopID,
		ShopName:     payload.ShopName,
		ShopEmail:    payload.ShopEmail,
		ShopPassword: payload.ShopPassword,
		ShopStatus:   payload.ShopStatus,
	}

	result := ad.DB.Create(&newShop)

	if result.Error != nil && strings.Contains(result.Error.Error(), "duplicate key value violates unique") {
		ctx.JSON(http.StatusConflict, gin.H{"status": "fail", "message": "Shop with that email already exists"})
		return
	} else if result.Error != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "error", "message": "Something bad happened"})
		return
	}

	shopResponse := &models.Shop{
		ShopID:       newShop.ShopID,
		ShopName:     newShop.ShopName,
		ShopEmail:    newShop.ShopEmail,
		ShopPassword: newShop.ShopPassword,
		ShopStatus:   newShop.ShopStatus,
	}

	auth := smtp.PlainAuth(
		"",
		"yusufzaki013@gmail.com",
		"xnodhfnqsjllbijc",
		"smtp.gmail.com",
	)

	msg := "Subject:" + "Congratulations! your shop has ben created !" + "\n" + "congratulations the shop " + shopResponse.ShopName + "has available !"

	send := smtp.SendMail(
		"smtp.gmail.com:587",
		auth,
		"yusufzaki013@gmail.com",
		[]string{shopResponse.ShopEmail},
		[]byte(msg),
	)

	if send != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": send.Error})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"status": "success", "data": gin.H{"shop": shopResponse}})

}

// view shop all
func (ad *AdminController) ViewAllShops(ctx *gin.Context) {
	var shops []models.Shop

	result := ad.DB.Find(&shops)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": result.Error})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "shops": shops})
}

// filter status shop active
func (ad *AdminController) ViewActiveShop(ctx *gin.Context) {
	var shops []models.Shop

	result := ad.DB.Where("shop_status = ?", "active").Find(&shops)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": result.Error})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "active_shop": shops})
}

// filter status shop banned
func (ad *AdminController) ViewBanShop(ctx *gin.Context) {
	var shops []models.Shop

	result := ad.DB.Where("shop_status = ?", "banned").Find(&shops)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": result.Error})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "active_shop": shops})
}

// admin ban unban shop
func (ad *AdminController) AdminBanShop(ctx *gin.Context) {
	var payload *models.BanShopInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	var shops models.Shop
	result := ad.DB.Model(&shops).Where("shop_id = ?", payload.ShopID).Update("shop_status", payload.ShopStatus)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": result.Error})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "shop_id": shops.ShopID})
}

// admin unban shop
func (ad *AdminController) AdminUnbanShop(ctx *gin.Context) {
	var payload *models.BanShopInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	var shops models.Shop
	result := ad.DB.Model(&shops).Where("shop_id = ?", payload.ShopID).Update("shop_status", payload.ShopStatus)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": result.Error})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "shop_id": shops.ShopID})

}
