package controllers

import (
	"math"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	"github.com/jekjeki/golang-gorm-postgres/models"
	"gorm.io/gorm"
)

type StoreController struct {
	DB *gorm.DB
}

func NewStoreController(DB *gorm.DB) StoreController {
	return StoreController{DB}
}

// add product
func (sc *StoreController) AddProduct(ctx *gin.Context) {
	var payload *models.AddProductInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	newProduct := models.Product{
		ProductID:          *payload.ProductID,
		CategoryID:         payload.CategoryID,
		ProductName:        payload.ProductName,
		Qty:                payload.Qty,
		ProductPrice:       payload.ProductPrice,
		ProductDescription: payload.ProductDescription,
		ProductDetail:      payload.ProductDetail,
		ShopEmail:          payload.ShopEmail,
	}

	result := sc.DB.Create(&newProduct)

	if result.Error != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "error", "message": "Something bad happened"})
		return
	}

	productResponse := &models.ProductResponse{
		ProductID:          newProduct.ProductID,
		CategoryID:         newProduct.CategoryID,
		ProductName:        newProduct.ProductName,
		Qty:                newProduct.Qty,
		ProductPrice:       newProduct.ProductPrice,
		ProductDescription: newProduct.ProductDescription,
	}

	ctx.JSON(http.StatusCreated, gin.H{"status": "success", "data": gin.H{"product": productResponse}})
}

// add store tarnsaction
func (sc *StoreController) AddStoreTransactions(ctx *gin.Context) {
	var payload *models.StoreTransInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	newTransaction := models.Storetransaction{
		StoretransID: payload.StoretransID,
		ShopID:       payload.ShopID,
		ProductID:    *payload.ProductID,
	}

	result := sc.DB.Create(&newTransaction)

	if result.Error != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "error", "message": "Something bad happened"})
		return
	}

	transactionResponse := &models.StoreTransResponse{
		StoretransID: newTransaction.StoretransID,
		ShopID:       newTransaction.ShopID,
		ProductID:    newTransaction.ProductID,
	}

	ctx.JSON(http.StatusCreated, gin.H{"status": "success", "data": gin.H{"storetransaction": transactionResponse}})
}

// view all product shop
func (sc *StoreController) ViewAllStoreProduct(ctx *gin.Context) {
	var payload *models.EmailInputProduct

	pageStr := ctx.Param("page")
	page, _ := strconv.Atoi(pageStr)
	offset := (page - 1) * 50

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	//calculate total page
	perPage := 50
	var totalRows int64
	sc.DB.Model(&models.Product{}).Count(&totalRows)
	totalPages := math.Ceil(float64(totalRows / int64(perPage)))

	var products []models.Product
	// result := sc.DB.Limit(50).Offset(offset).Where("s.shop_email = ?", payload.ShopEmail).Joins("left join storetransactions st on st.product_id=products.product_id").Joins("left join shops s on s.shop_id = st.shop_id").Find(&products)
	result := sc.DB.Limit(50).Offset(offset).Where("shop_email = ?", payload.ShopEmail).Find(&products)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": result.Error})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "products": products,
		"pagination": models.PaginationData{
			NextPage:    page + 1,
			PrevPage:    page - 1,
			CurrentPage: page,
			TotalPage:   int(totalPages),
		},
	})

}

// get product filter
func (sc *StoreController) FilterProductByCategory(ctx *gin.Context) {
	var payload *models.CategoryInputFilterStore
	// var inpemail *models.ShopSigninEmail

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	// if err := ctx.ShouldBindJSON(&inpemail); err != nil {
	// 	ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
	// 	return
	// }

	var products []models.Product

	result := sc.DB.Where("category_id = ? AND shop_email = ?", payload.ID, payload.ShopEmail).Joins("left join storetransactions st on st.product_id=products.product_id").Joins("left join shops s on s.shop_id = st.shop_id").Find(&products)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": result.Error})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "products": products})
}

// get store login
func (sc *StoreController) GetMeStore(ctx *gin.Context) {
	currentUser := ctx.MustGet("currentShop").(models.Shop)

	storeResponse := &models.StoreResponse{
		ShopID:    currentUser.ShopID,
		ShopEmail: currentUser.ShopEmail,
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "data": gin.H{"store": storeResponse}})
}

// get store data for update
func (sc *StoreController) GetDataForUpdate(ctx *gin.Context) {
	currentUser := ctx.MustGet("currentShop").(models.Shop)

	storeResponse := &models.StoreResponseUpdate{
		ShopName:  currentUser.ShopEmail,
		ShopAbout: currentUser.ShopAbout,
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "storedata": storeResponse})
}

// update shop profile
func (sc *StoreController) UpdateShop(ctx *gin.Context) {
	var payload *models.UpdateStoreProfileInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	var shop []models.Shop
	result := sc.DB.Model(&shop).Where("shop_id = ?", payload.ShopID).Updates(map[string]interface{}{"shop_name": payload.ShopName, "shop_about": payload.ShopAbout})

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": result.Error})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "shopupdate": payload.ShopID})
}

// get login 2
func (sc *StoreController) GetData(ctx *gin.Context) {
	var shop models.Shop
	ctx.JSON(http.StatusOK, gin.H{"shop": shop})
}

// store update product
func (sc *StoreController) UpdateProduct(ctx *gin.Context) {
	var payload *models.UpdateProductInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	var product models.Product

	result := sc.DB.Model(&product).Where("product_id = ? AND shop_email = ?", payload.ProductID, payload.ShopEmail).Updates(map[string]interface{}{"product_name": payload.ProductName, "qty": payload.Qty, "product_price": payload.ProductPrice, "product_description": payload.ProductDescription, "product_detail": payload.ProductDetail})

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": result.Error})
		return
	}

	updateResponse := &models.ProductResponse{
		ProductID:   *payload.ProductID,
		ProductName: payload.ProductName,
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "update_products": updateResponse})
}

// shop display information
func (sc *StoreController) DisplayShopInformation(ctx *gin.Context) {
	// var payload *models.ShopIdDisplayInformationInput

	// if err := ctx.ShouldBindJSON(&payload); err != nil {
	// 	ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
	// 	return
	// }
	pageStr := ctx.Param("id")

	var shop models.Shop

	result := sc.DB.Where("shop_id = ?", pageStr).First(&shop)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": result.Error})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "shopinfo": shop})
}

// logout
func (sc *StoreController) StoreLogout(ctx *gin.Context) {
	ctx.SetCookie("access_token", "", -1, "/", "localhost", false, true)
	ctx.JSON(http.StatusOK, gin.H{"status": "success"})
}
