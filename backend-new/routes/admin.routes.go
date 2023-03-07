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

	//active shops
	router.POST("/create-shop", ac.adminController.InsertShop)
	router.GET("/view-all-shops", ac.adminController.ViewAllShops)
	router.GET("/view-active-shops", ac.adminController.ViewActiveShop)
	router.GET("/view-ban-shops", ac.adminController.ViewBanShop)

	//ban shop
	router.POST("/ban-shop", ac.adminController.AdminBanShop)
	router.POST("/unban-shop", ac.adminController.AdminUnbanShop)

}
