package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/jekjeki/golang-gorm-postgres/controllers"
)

type ProductRouteController struct {
	ProductRouteController controllers.ProductController
}

func NewRouteProductController(productController controllers.ProductController) ProductRouteController {
	return ProductRouteController{productController}
}

func (pr *ProductRouteController) ProductRoute(rg *gin.RouterGroup) {
	router := rg.Group("product")
	router.GET("/allproducts", pr.ProductRouteController.GetAllProduct)
	router.GET("/bestdeal", pr.ProductRouteController.GetCodeBestDeal)
	router.GET("/top-shop-home", pr.ProductRouteController.TopShopHome)
	router.GET("/get-shop-detail/:id", pr.ProductRouteController.GetShopFromDetail)
	router.GET("/get-similar-product/:categoryid", pr.ProductRouteController.GetSimilarProduct)
	router.GET("/is-product-banned/:productid", pr.ProductRouteController.ValidateShopBanandProduct)
}
