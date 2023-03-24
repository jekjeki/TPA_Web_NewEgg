package controllers

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/jekjeki/golang-gorm-postgres/models"
	"gorm.io/gorm"
)

type WishlistController struct {
	DB *gorm.DB
}

func NewWishlistController(DB *gorm.DB) WishlistController {
	return WishlistController{DB}
}

// create a list
func (wc *WishlistController) CreateWishList(ctx *gin.Context) {
	var payload *models.WishlistInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	newWishList := models.Wishlist{
		WishlistID:   payload.WishlistID,
		WishlistName: payload.WishlistName,
		WishlistType: payload.WishlistType,
	}

	result := wc.DB.Create(&newWishList)

	if result.Error != nil && strings.Contains(result.Error.Error(), "duplicate key value violates unique") {
		ctx.JSON(http.StatusConflict, gin.H{"status": "fail", "message": "User with that email already exists"})
		return
	} else if result.Error != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "error", "message": "Something bad happened"})
		return
	}

	wishListResponse := &models.WishlistResponse{
		WishlistID: newWishList.WishlistID,
	}

	ctx.JSON(http.StatusCreated, gin.H{"status": "success", "data": gin.H{"wishlist_id": wishListResponse}})

}

// create wish list transactions
func (wc *WishlistController) CreateWishlistTransactions(ctx *gin.Context) {
	var payload models.WishlisttransactionsInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	newWishlistTr := models.Wishlisttransactions{
		WishtrID:   payload.WishtrID,
		ProductID:  payload.ProductID,
		ShopID:     payload.ShopID,
		UserID:     payload.UserID,
		WishlistID: payload.WishlistID,
		Totalqty:   payload.Totalqty,
		Totalprice: payload.Totalprice,
	}

	result := wc.DB.Create(&newWishlistTr)

	if result.Error != nil && strings.Contains(result.Error.Error(), "duplicate key value violates unique") {
		ctx.JSON(http.StatusConflict, gin.H{"status": "fail", "message": "User with that email already exists"})
		return
	} else if result.Error != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "error", "message": "Something bad happened"})
		return
	}

	wishlistResponse := &models.WishlisttransactionsResponse{
		WishTrID: newWishlistTr.WishtrID,
	}

	ctx.JSON(http.StatusCreated, gin.H{"status": "success", "data": gin.H{"wishlistTr_id": wishlistResponse}})
}

// get user wish list
func (wc *WishlistController) GetUsersWishlist(ctx *gin.Context) {

	var payload *models.UserWishlistLoginInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	var wishlist []models.Wishlist

	result := wc.DB.Where("uw.user_id = ?", payload.UserID).Joins("join userwishlisttransactions uw ON wishlists.wishlist_id=uw.wishlist_id").Find(&wishlist)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "wishlist": wishlist})

}

// display wishlist with specify user
func (wc *WishlistController) DisplayWishlistByUser(ctx *gin.Context) {
	var wishlist []models.Wishlist
	userid := ctx.Param("userid")

	result := wc.DB.Where("wi.user_id = ?", userid).Joins("join userwishlisttransactions wi ON wi.wishlist_id = wishlists.wishlist_id").Find(&wishlist)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "failed", "error": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "wishlist_name": wishlist})
}

// get product in wishlist data from current user login
func (wc *WishlistController) GetProductFromWishlist(ctx *gin.Context) {
	var product []models.Product

	currentUser := ctx.Param("userid")

	result := wc.DB.Where("user_id = ?", currentUser).Joins("join wishlisttransactions wi ON wi.product_id = products.product_id").Find(&product)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "failed", "error": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "product": product})

}

// get wishlist transactions
func (wc *WishlistController) GetWishlistTransactions(ctx *gin.Context) {
	var wishlisttr []models.MyListTrProd
	currUser := ctx.Param("userid")

	result := wc.DB.Table("products").Where("user_id = ?", currUser).Select("wi.wishlist_id, products.product_id, products.product_name, wi.totalprice").Joins("join wishlisttransactions wi ON wi.product_id=products.product_id").Scan(&wishlisttr)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "failed", "error": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "wishlisttr": wishlisttr})

}

// change / update wishlist name and type
func (wc *WishlistController) UpdateWishlistNameandType(ctx *gin.Context) {
	var payload *models.UpdateWishlistNameTypeInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	var wishlist models.Wishlist

	result := wc.DB.Model(&wishlist).Where("wishlist_id = ?", payload.WishlistID).Updates(map[string]interface{}{"wishlist_name": payload.WishlistName, "wishlist_type": payload.WishlistType})

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "update_wishlistid": payload.WishlistID})
}

// add data to public wishlists
func (wc *WishlistController) AddDataToPublicWishlists(ctx *gin.Context) {
	var payload *models.PublicwishlistInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	newPublicWishlists := models.Publicwishlist{
		WishlistID:   payload.WishlistID,
		WishlistType: payload.WishlistType,
		Date:         payload.Date,
		TotalRating:  payload.TotalRating,
		TotalPrice:   payload.TotalPrice,
	}

	result := wc.DB.Create(&newPublicWishlists)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "failed", "error": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "create_date": payload.Date})
}

// add user wishlist transaction
func (wc *WishlistController) AddDatatoUserWishlistTrans(ctx *gin.Context) {
	var payload *models.UserwishlistInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	newUserWishlisttr := models.Userwishlisttransaction{
		UserwlID:   payload.UserwlID,
		UserID:     payload.UserID,
		WishlistID: payload.WishlistID,
	}

	result := wc.DB.Create(&newUserWishlisttr)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "failed", "message": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "user_wishlist_id": payload.UserwlID})
}

// get public wishlist name
func (wc *WishlistController) GetPublicWishlistName(ctx *gin.Context) {

	var wishlist []models.Wishlist

	result := wc.DB.Where("wishlists.wishlist_type = ?", "public").Joins("join userwishlisttransactions uw ON uw.wishlist_id=wishlists.wishlist_id").Find(&wishlist)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "success", "error": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "wishlist": wishlist})
}

// get product with public wishlist type
func (wc *WishlistController) GetAllProduct(ctx *gin.Context) {
	var product []models.WishlistProduct

	result := wc.DB.Table("products").Where("wishlist_id != ?", " ").Select("ws.wishlist_id, products.product_name, product_price, st.shop_id, products.product_id").Joins("join wishlisttransactions ws ON ws.product_id=products.product_id").Joins("join storetransactions st ON st.product_id=ws.product_id").Scan(&product)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "failed", "error": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "result": product})
}

// get publictransactions total price wishlists
func (wc *WishlistController) GetPublicTransactions(ctx *gin.Context) {
	// var publicwishlist []models.Publicwishlist
	var wish []models.SelectData
	// result := wc.DB.Find(&publicwishlist)

	result := wc.DB.Table("publicwishlists").Joins("join wishlists wi ON wi.wishlist_id=publicwishlists.wishlist_id").Joins("join userwishlisttransactions uw ON uw.wishlist_id=wi.wishlist_id").Scan(&wish)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "failed", "error": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "public_wishlist_tr": wish})
}

// FOLLOW WISHLIST COMPONENT

// add to follow wishlist
func (wc *WishlistController) AddFollowWishlist(ctx *gin.Context) {
	var payload models.FollowWishlistInputAdd

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	newFollowWishlist := models.FollowWishlist{
		FollowWishlistID: payload.FollowWishlistID,
		WishlistID:       payload.WishlistID,
		UserID:           payload.UserID,
	}

	result := wc.DB.Create(&newFollowWishlist)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "failed", "error": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "result_id": payload.FollowWishlistID})
}

// get follow wishlist name
func (wc *WishlistController) GetFollowedWishlist(ctx *gin.Context) {
	currUser := ctx.Param("userid")

	var followwishlist []models.GetFollowWIshlistResponse

	result := wc.DB.Table("wishlists").Where("fw.user_id = ?", currUser).Joins("join follow_wishlists fw ON fw.wishlist_id=wishlists.wishlist_id").Scan(&followwishlist)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "failed", "error": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "wishlists": followwishlist})
}

// get product data | follow wishlists
func (wc *WishlistController) GetProductDataFollowWishlist(ctx *gin.Context) {
	var selectData []models.DisplayProductFollowWishlist

	result := wc.DB.Table("follow_wishlists").Joins("join wishlists wi ON wi.wishlist_id=follow_wishlists.wishlist_id").Joins("join wishlisttransactions wt ON wt.wishlist_id=wi.wishlist_id").Joins("join products pr ON pr.product_id=wt.product_id").Limit(3).Scan(&selectData)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "error": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "products": selectData})
}

// delete follow wishlist data
func (wc *WishlistController) DeleteFollowWishlist(ctx *gin.Context) {
	var payload *models.DeleteFollowWishlist
	var followwishlist models.FollowWishlist

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	result := wc.DB.Where("follow_wishlist_id = ?", payload.FollowWishlistID).Delete(&followwishlist)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "error": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "wishlist_id": payload.FollowWishlistID})

}

// duplicate follow wishlists | to my wishlists
func (wc *WishlistController) DuplicateFollowWishlistToMyLists(ctx *gin.Context) {
	var payload *models.DuplicateFollowListToMyListsInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	newUserWiwshlist := models.Userwishlisttransaction{
		UserwlID:   payload.UserwlID,
		WishlistID: payload.WishlistID,
		UserID:     payload.UserID,
	}

	result := wc.DB.Create(&newUserWiwshlist)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "error": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "data": payload.UserwlID})

}

// public wishlists | duplicate public wishlist
func (wc *WishlistController) DuplicatePublicWishlist(ctx *gin.Context) {
	var payload *models.WishlisttransactionsInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	newWishlisttr := models.Wishlisttransactions{
		WishtrID:   payload.WishtrID,
		ProductID:  payload.ProductID,
		ShopID:     payload.ShopID,
		UserID:     payload.UserID,
		WishlistID: payload.WishlistID,
		Totalqty:   payload.Totalqty,
		Totalprice: payload.Totalprice,
	}

	result := wc.DB.Create(&newWishlisttr)

	wishlistTrResponse := *&models.WishlisttransactionsResponse{
		WishTrID: newWishlisttr.WishtrID,
	}

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "failed", "error": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "wishlistTr": wishlistTrResponse})
}

// get all product in specific wishlist | public wishlist detail page
func (wc *WishlistController) AllProductPublicWishlist(ctx *gin.Context) {
	// var product []models.Product

	var selectItem []models.PublicWishlistDetailSelect

	wishlistid := ctx.Param("wishlistid")

	// result := wc.DB.Where("wi.wishlist_id = ?", wishlistid).Joins("join wishlisttransactions wi ON wi.product_id = products.product_id").Joins("join wishlists w ON w.wishlist_id = wi.wishlist_id").Find(&product)
	result := wc.DB.Table("products").Where("wi.wishlist_id = ?", wishlistid).Select("products.product_id, products.product_name, products.product_price, wi.totalqty").Joins("join wishlisttransactions wi ON wi.product_id = products.product_id").Joins("join wishlists w ON w.wishlist_id = wi.wishlist_id").Scan(&selectItem)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "error": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "product": selectItem})
}

// public wishlist detail | Add all Data product to cart
func (wc *WishlistController) AddWishlistProductToCart(ctx *gin.Context) {
	var payload *models.CartInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	newCartData := models.Cart{
		CartID:     payload.CartID,
		ProductID:  payload.ProductID,
		UserID:     payload.UserID,
		Qty:        payload.Qty,
		Totalprice: payload.Totalprice,
	}

	result := wc.DB.Create(&newCartData)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "failed", "error": result.Error.Error()})
		return
	}

	cartResponse := &models.CartInputResponse{
		CartID: newCartData.CartID,
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "cart": cartResponse})
}

// My Wishlist Page Detail
func (wc *WishlistController) AllProductWishlistDetail(ctx *gin.Context) {

	var products []models.Product

	wishlistid := ctx.Param("wishlistid")

	result := wc.DB.Where("wishlist_id = ?", wishlistid).Joins("join wishlisttransactions wi ON wi.product_id=products.product_id").Find(&products)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "failed", "error": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "products": products})

}

// update wishlist name & type | user my wishlist detail page
func (wc *WishlistController) UpdateMyWishlistDetail(ctx *gin.Context) {

	var payload *models.MyWishlistUpdateInput

	wishlistid := ctx.Param("wishlistid")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	var wishlist models.Wishlist

	resultUpdate := wc.DB.Model(&wishlist).Where("wishlist_id = ?", wishlistid).Updates(map[string]interface{}{"wishlist_name": payload.WishlistName, "wishlist_type": payload.WishlistType})

	if resultUpdate.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "failed", "error": resultUpdate.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "result_update_name": payload.WishlistName})
}

// update qty in my list detail
func (wc *WishlistController) UpdateProductQty(ctx *gin.Context) {
	var payload *models.UpdateQtyMyListInput

	productIdParam := ctx.Param("productid")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	var wishlistTrqty models.Wishlisttransactions

	result := wc.DB.Model(&wishlistTrqty).Where("product_id = ?", productIdParam).Updates(map[string]interface{}{"totalqty": payload.TotalQty})

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "failed", "error": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "response_id": productIdParam})
}

// my wishlists detail | Add All to Carts
func (wc *WishlistController) AddAllMyWishlistDetailtoCart(ctx *gin.Context) {
	var payload *models.MyWishlistAddProductstoCartInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	newWishlistToCart := models.Cart{
		CartID:    payload.CartID,
		ProductID: payload.ProductID,
		UserID:    payload.UserID,
		Qty:       int32(payload.Qty),
	}

	result := wc.DB.Create(&newWishlistToCart)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "error": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "cart_id": payload.CartID})
}

// my wishlists detail page | delete product from my wishlist
func (wc *WishlistController) DeleteProductFromMyWishlistDetail(ctx *gin.Context) {

	var payload *models.DeleteProductinWishlistInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	wishlistid := ctx.Param("wishlistid")

	var wishlisttr models.Wishlisttransactions

	result := wc.DB.Where("wishlist_id = ? AND product_id = ?", wishlistid, payload.ProductID).Delete(&wishlisttr)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "error": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "product_id": payload.ProductID})
}
