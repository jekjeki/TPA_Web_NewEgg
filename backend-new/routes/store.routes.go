package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/jekjeki/golang-gorm-postgres/controllers"
	"github.com/jekjeki/golang-gorm-postgres/middleware"
)

type StoreRouteController struct {
	StoreRouteController controllers.StoreController
}

func NewRouteStoreController(storeController controllers.StoreController) StoreRouteController {
	return StoreRouteController{storeController}
}

func (sc *StoreRouteController) StoreRoute(rg *gin.RouterGroup) {
	router := rg.Group("store")
	router.POST("/add-product", sc.StoreRouteController.AddProduct)
	router.POST("/add-store-transactions", sc.StoreRouteController.AddStoreTransactions)
	router.POST("/all-product/:page", sc.StoreRouteController.ViewAllStoreProduct)
	router.GET("/get-login-store", middleware.DeserializeStore(), sc.StoreRouteController.GetMeStore)
	router.POST("/get-filter-product", sc.StoreRouteController.FilterProductByCategory)
	router.PUT("/update-store-product", sc.StoreRouteController.UpdateProduct)
	router.GET("/get-data", sc.StoreRouteController.GetData)
	router.GET("/get-store-data-for-update", middleware.DeserializeStore(), sc.StoreRouteController.GetDataForUpdate)
	router.PUT("/update-shop-profile", sc.StoreRouteController.UpdateShop)
	router.GET("/store-information-data/:id", sc.StoreRouteController.DisplayShopInformation)
	router.GET("/get-store-login-data", middleware.DeserializeStore(), sc.StoreRouteController.GetMeStore)
	router.GET("/store-logout", sc.StoreRouteController.StoreLogout)
}
