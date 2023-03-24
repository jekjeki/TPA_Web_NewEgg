package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/jekjeki/golang-gorm-postgres/controllers"
)

type WishlistRouteController struct {
	wishlistController controllers.WishlistController
}

func NewRouteWishlistController(wishlistController controllers.WishlistController) WishlistRouteController {
	return WishlistRouteController{wishlistController}
}

func (wi *WishlistRouteController) WishlistRoute(rg *gin.RouterGroup) {
	router := rg.Group("/wishlist")

	router.POST("/create-wishlist", wi.wishlistController.CreateWishList)
	router.POST("/create-wishlist-transaction", wi.wishlistController.CreateWishlistTransactions)
	router.POST("/add-to-wishlist", wi.wishlistController.GetUsersWishlist)

	//get wishlist with the user
	router.GET("/get-user-wishlists/:userid", wi.wishlistController.DisplayWishlistByUser)
	router.GET("/get-wishlist-product/:userid", wi.wishlistController.GetProductFromWishlist)

	// add userwishlisttransactions
	router.POST("/add-user-wishlist-trans", wi.wishlistController.AddDatatoUserWishlistTrans)

	//get wishlisttransactions my lists page
	router.GET("/get-wishlists-transaction/:userid", wi.wishlistController.GetWishlistTransactions)

	//update name type
	router.PUT("/update-wishlist-name-type", wi.wishlistController.UpdateWishlistNameandType)

	//router add data to public wishlists
	router.POST("/add-public-wishlist-data", wi.wishlistController.AddDataToPublicWishlists)

	// get wishlist with type = public
	router.GET("/get-wishlist-public", wi.wishlistController.GetPublicWishlistName)
	router.GET("/get-wishlisttr-product", wi.wishlistController.GetAllProduct)

	// get public wishlist tr
	router.GET("/public-wishlist-tr", wi.wishlistController.GetPublicTransactions)

	//FOLLOW WISHLIST

	// add follow wishlist
	router.POST("/add-follow-wishlist", wi.wishlistController.AddFollowWishlist)

	// get follow wishlist
	router.GET("/get-followed-wishlist/:userid", wi.wishlistController.GetFollowedWishlist)

	// get products inside follow wishlists
	router.GET("/get-products-follow-wishlist", wi.wishlistController.GetProductDataFollowWishlist)

	// delete follow wishlist
	router.DELETE("/delete-follow-wishlist", wi.wishlistController.DeleteFollowWishlist)

	//duplicate public wishlists
	router.POST("/duplicate-data-to-my-lists", wi.wishlistController.DuplicatePublicWishlist)

	// PUBLIC WISHLIST DETAIL PAGE
	router.GET("/get-product-wishlist-detail/:wishlistid", wi.wishlistController.AllProductPublicWishlist)

	//public wishlist add to cart
	router.POST("/public-wishlist-detail-add-cart", wi.wishlistController.AddWishlistProductToCart)

	// MY WISHLISTS
	// my wishlist show product in detail page
	router.GET("/get-product-my-wishlist-detail/:wishlistid", wi.wishlistController.AllProductWishlistDetail)

	// my wishlist update detail my wishlist
	router.PUT("/update-mywishlist-detail/:wishlistid", wi.wishlistController.UpdateMyWishlistDetail)

	//update qty in my wishlist detail
	router.PUT("/update-qty-mywishlist-detail/:productid", wi.wishlistController.UpdateProductQty)

	// add all items to cart | my wishlist detail
	router.POST("/add-carts-mywishlist-detail", wi.wishlistController.AddAllMyWishlistDetailtoCart)

	// delete product in detail wishlist
	router.DELETE("/delete-product-mywishlist-detail/:wishlistid", wi.wishlistController.DeleteProductFromMyWishlistDetail)

	// follow wishlists | duplicate wishlists
	router.POST("/add-follow-wishlist-to-my-wishlist", wi.wishlistController.DuplicateFollowWishlistToMyLists)
}
