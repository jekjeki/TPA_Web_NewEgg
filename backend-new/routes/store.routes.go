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

	// Display Top Shops | Main Menu
	router.GET("/display-top-shops", sc.StoreRouteController.ShowTopShops)

	// display category sold by shops
	router.GET("/get-sold-categories/:shopid", sc.StoreRouteController.DisplayAllCategoriesSold)

	//display product recommendastions | shop page ( user )
	router.GET("/get-products-rec/:shopid", sc.StoreRouteController.ShowProductRecommend)

	// display undisplay shop if shop status is banned
	router.GET("get-shop-status/:shopid", sc.StoreRouteController.GetShopStatus)

	// get all products | shop product page
	router.GET("get-products-in-product-page/:shopid/:page", sc.StoreRouteController.GetAllProductsShopProductPage)

	// get products by filtering product rating
	router.GET("/get-products-by-filtering-rating/:shopid/:reviewVal", sc.StoreRouteController.FilterProductsByRatingShopPage)

	// display products Product Page sort Product By Price
	router.GET("/get-products-by-sort-product-price/:shopid", sc.StoreRouteController.SortProductsPriceShopPage)

	//display products in Product Page sort Product by Rating
	router.GET("/get-products-by-sort-product-rating/:shopid", sc.StoreRouteController.SortProductsByRatingShopPage)

	// REVIEW PRODUCTS PAGE

	// count reviweers users
	router.GET("/get-count-user-review-products/:shopid", sc.StoreRouteController.CountUsersGiveRating)

	// average review rating
	router.GET("/get-average-review-rating/:shopid", sc.StoreRouteController.ShowAverageProductRating)

}
