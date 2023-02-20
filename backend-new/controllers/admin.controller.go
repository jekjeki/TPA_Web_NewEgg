package controllers

import (
	"net/http"
	"net/smtp"

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
