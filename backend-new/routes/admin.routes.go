package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/jekjeki/golang-gorm-postgres/controllers"
)

type AdminRouteController struct {
	adminController controllers.AdminController
}

func NewAdminRouteController(adminController controllers.AdminController) AdminRouteController {
	return AdminRouteController{adminController}
}

func (ac *AdminRouteController) AdminRoute(rg *gin.RouterGroup) {
	router := rg.Group("/admin")

	router.GET("/users", ac.adminController.GetAllUsers)
	router.PUT("/ban-users", ac.adminController.BanUnbanUser)
	router.POST("/send-email", ac.adminController.AdminSendMail)
	router.GET("/users-subscribe", ac.adminController.GetUsersCheckSubsribe)
}
