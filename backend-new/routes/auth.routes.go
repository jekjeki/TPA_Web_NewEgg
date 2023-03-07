package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/jekjeki/golang-gorm-postgres/controllers"
)

type AuthRouteController struct {
	authController controllers.AuthController
}

func NewAuthRouteController(authController controllers.AuthController) AuthRouteController {
	return AuthRouteController{authController}
}

func (rc *AuthRouteController) AuthRoute(rg *gin.RouterGroup) {
	router := rg.Group("/auth")

	router.POST("/register", rc.authController.SignUpUser)
	router.POST("/signinemail", rc.authController.SignInEmail)
	router.POST("/login", rc.authController.SignInUser)
	router.GET("/refresh", rc.authController.RefreshAccessToken)
	router.POST("/signinemail-shop", rc.authController.ShopSigninEmail)
	router.POST("/login-shop", rc.authController.LoginShop)
	router.GET("/users-logout", rc.authController.LogoutUsers)

}
