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

// Show TopShop | Main menu
func (sc *StoreController) ShowTopShops(ctx *gin.Context) {
	var topshop []models.Shop

	result := sc.DB.Limit(3).Where("wt.totalqty >= 1").Joins("join storetransactions st ON st.shop_id = shops.shop_id").Joins("join wishlisttransactions wt ON st.shop_id=wt.shop_id").Find(&topshop)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "error": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "top_shops": topshop})

}

// show all categories sold by the shop
func (sc *StoreController) DisplayAllCategoriesSold(ctx *gin.Context) {
	var categories []models.Category

	shopid := ctx.Param("shopid")

	result := sc.DB.Distinct("categories.category_name").Where("st.shop_id = ?", shopid).Joins("join products pr ON pr.category_id = categories.id").Joins("join storetransactions st ON pr.product_id = pr.product_id").Find(&categories)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "error": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "categories": categories})
}

// show product recomendations | shop Page ( user )
func (sc *StoreController) ShowProductRecommend(ctx *gin.Context) {
	var products []models.Product

	shopid := ctx.Param("shopid")

	result := sc.DB.Distinct("products.product_id, products.product_name, products.product_price").Where("c. qty > 1 AND st.shop_id = ?", shopid).Joins("join carts c ON c.product_id = products.product_id").Joins("join storetransactions st ON st.product_id = products.product_id").Find(&products)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "error": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "products": products})

}

// display undisplay shop if shop status is banned
func (sc *StoreController) GetShopStatus(ctx *gin.Context) {
	var shop models.Shop

	shopid := ctx.Param("shopid")

	result := sc.DB.Where("shop_id = ?", shopid).Find(&shop)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "error": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "shop": shop})
}

// shop products page | paginate product
type PaginationData struct {
	NextPage int
	PrevPage int
	CurrPage int
}

func (sc *StoreController) GetAllProductsShopProductPage(ctx *gin.Context) {
	var products []models.Product

	shopid := ctx.Param("shopid")

	s := ctx.Query("s")

	// get page number
	pageNumber := ctx.Param("page")
	page, _ := strconv.Atoi(pageNumber)
	offset := (page - 1) * 10

	// search != " "
	if s != "" {
		result := sc.DB.Limit(10).Where("st.shop_id = ? AND products.product_name LIKE ? ", shopid, "%"+s+"%").Joins("join storetransactions st ON products.product_id = st.product_id").Offset(offset).Find(&products)

		if result.Error != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "error": result.Error.Error()})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{"status": "success", "data": gin.H{
			"products": products,
			"pagination": PaginationData{
				NextPage: page + 1,
				PrevPage: page - 1,
				CurrPage: page,
			},
		}})

		return

	}

	result := sc.DB.Limit(10).Where("st.shop_id = ?", shopid).Joins("join storetransactions st ON products.product_id = st.product_id").Offset(offset).Find(&products)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "failed", "error": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "data": gin.H{
		"products": products,
		"pagination": PaginationData{
			NextPage: page + 1,
			PrevPage: page - 1,
			CurrPage: page,
		},
	}})

}

// filter products by the rating
func (sc *StoreController) FilterProductsByRatingShopPage(ctx *gin.Context) {
	var products []models.ShowProductDataAndReview

	reviewVal := ctx.Param("reviewVal")
	shopid := ctx.Param("shopid")

	result := sc.DB.Table("products").Where("rv.review_value > ? AND st.shop_id = ?", reviewVal, shopid).Joins("join reviewproducts rv ON rv.product_id=products.product_id").Joins("join storetransactions st ON st.product_id = products.product_id").Scan(&products)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "error": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "products": products})

}

// sort display product price
func (sc *StoreController) SortProductsPriceShopPage(ctx *gin.Context) {
	var products []models.ShowProductDataAndReview

	shopid := ctx.Param("shopid")

	result := sc.DB.Table("products pr").Where("st.shop_id = ?", shopid).Order("product_price asc").Select("pr.product_id, pr.product_name, pr.product_price, rv.review_value").Joins("join reviewproducts rv ON rv.product_id=pr.product_id").Joins("join storetransactions st ON pr.product_id = st.product_id").Scan(&products)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "error": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "products": products})
}

// sort display product by rating
func (sc *StoreController) SortProductsByRatingShopPage(ctx *gin.Context) {
	var products []models.ShowProductDataAndReview

	shopid := ctx.Param("shopid")

	result := sc.DB.Table("products pr").Where("st.shop_id = ?", shopid).Order("rv.review_value asc").Select("pr.product_id, pr.product_name, pr.product_price, rv.review_value").Joins("join reviewproducts rv ON rv.product_id=pr.product_id").Joins("join storetransactions st ON pr.product_id = st.product_id").Scan(&products)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "error": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "products": products})
}

// count many user given reviews in products shops
func (sc *StoreController) CountUsersGiveRating(ctx *gin.Context) {
	var countusers models.CountUserGiveReview

	shopid := ctx.Param("shopid")

	var count int64
	result := sc.DB.Table("reviewproducts rp").Where("st.shop_id = ?", shopid).Select("rp.user_id").Joins("join products pr ON pr.product_id=rp.product_id").Joins("join storetransactions st ON st.product_id=pr.product_id").Scan(&countusers).Count(&count)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "error": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "count_result": count})
}

// display average of product rating
func (sc *StoreController) ShowAverageProductRating(ctx *gin.Context) {

	var reviews models.ReviewProdModelAvg

	shopid := ctx.Param("shopid")

	result := sc.DB.Table("reviewproducts rp").Select("AVG(review_value) as avg").Where("shop_id = ?", shopid).Joins("join products pr ON pr.product_id=rp.product_id").Joins("join storetransactions st ON st.product_id=pr.product_id").Scan(&reviews)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "error": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "average": reviews})

}
