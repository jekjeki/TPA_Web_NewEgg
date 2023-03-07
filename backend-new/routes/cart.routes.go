package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/jekjeki/golang-gorm-postgres/controllers"
)

type CartRouteController struct {
	CartRouteController controllers.CartController
}

func NewRouteCartController(cartController controllers.CartController) CartRouteController {
	return CartRouteController{cartController}
}

func (cc *CartRouteController) CartRoute(rg *gin.RouterGroup) {
	router := rg.Group("cart")
	router.POST("/add-cart/:qtyproduct", cc.CartRouteController.AddToCart)
}
