package controllers

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/jekjeki/golang-gorm-postgres/models"
	"gorm.io/gorm"
)

type UserController struct {
	DB *gorm.DB
}

func NewUserController(DB *gorm.DB) UserController {
	return UserController{DB}
}

// get curr user role login
func (uc *UserController) GetMe(ctx *gin.Context) {
	currentUser := ctx.MustGet("currentUser").(models.User)

	userResponse := &models.UserResponse{
		FirstName: currentUser.FirstName,
		LastName:  currentUser.LastName,
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "data": gin.H{"user": userResponse}})
}

// user subscribe email newsletter
func (uc *UserController) SubscribeEmailNewsLetter(ctx *gin.Context) {
	var payload *models.EmailSubscribeInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	newEmail := models.Emailsubscribe{
		SubsID:    payload.SubsID,
		SubsEmail: payload.SubsEmail,
	}

	result := uc.DB.Create(&newEmail)

	if result.Error != nil && strings.Contains(result.Error.Error(), "duplicate key value violates unique") {
		ctx.JSON(http.StatusConflict, gin.H{"status": "fail", "message": "User with that email already exists"})
		return
	}

	subscribeResponse := &models.EmailSubscribeResponse{
		SubsID: newEmail.SubsEmail,
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "news_subscribe": subscribeResponse})

}
