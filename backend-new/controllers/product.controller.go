package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jekjeki/golang-gorm-postgres/models"
	"gorm.io/gorm"
)

type ProductController struct {
	DB *gorm.DB
}

func NewProductController(DB *gorm.DB) ProductController {
	return ProductController{DB}
}

// test get all product
func (pc *ProductController) GetAllProduct(ctx *gin.Context) {
	var products []models.Product

	result := pc.DB.Find(&products)
	// result := pc.DB.Table("products").Select("")

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "failed get data"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "products": products})

}

// get border
func (pc *ProductController) GetCodeBestDeal(ctx *gin.Context) {
	var bestdeal []models.BestDeal

	// result := pc.DB.Table("products").Select("products.product_id, st.shop_id").Joins("left join storetransactions st on st.product_id = products.product_id")
	result := pc.DB.Table("products").Select("products.product_id, s.shop_id, products.product_name, products.qty, products.product_status, products.product_rating, products.product_price, s.shop_name, s.shop_email").Joins("left join storetransactions st on st.product_id = products.product_id").Joins("left join shops s on s.shop_id = st.shop_id").Where("products.product_status = ?", "best deal").Scan(&bestdeal)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "failed get data"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "bestdeal": bestdeal})
}

// infinite scroll
func (pc *ProductController) ProductInfiniteScroll(ctx *gin.Context) {

}

// display top 3 shops
func (pc *ProductController) TopShopHome(ctx *gin.Context) {
	var product []models.Product

	result := pc.DB.Where("bt.qty >= ?", 1).Joins("left join storetransactions st on st.product_id=products.product_id").Joins("left join shops s ON s.shop_id=st.shop_id").Joins("left join buytransactiondetail bt ON bt.product_id=products.product_id").Limit(3).Find(&product)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "failed get data"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "products": product})
}

// func get shop from product in detail page
func (pc *ProductController) GetShopFromDetail(ctx *gin.Context) {
	productid := ctx.Param("id")

	var shop models.Shop
	result := pc.DB.Table("shops").Where("st.product_id = ?", productid).Joins("join storetransactions st ON st.shop_id = shops.shop_id").Joins("join products p ON p.product_id=st.product_id").First(&shop)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "failed get data"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "shop": shop})
}

// func similar product by category
func (pc *ProductController) GetSimilarProduct(ctx *gin.Context) {
	categoryid := ctx.Param("categoryid")

	var product []models.Product

	result := pc.DB.Where("category_id = ?", categoryid).Joins("join categories p ON p.id = products.category_id").Find(&product)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "failed get data"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "products": product})
}

// validate the shop products banned or no
func (pc *ProductController) ValidateShopBanandProduct(ctx *gin.Context) {
	prodid := ctx.Param("productid")

	var shop models.Shop

	result := pc.DB.Where("pr.product_id = ? AND shops.shop_id = ?", prodid, "banned").Joins("join storetransactions st ON st.shop_id = shops.shop_id").Joins("join products pr ON pr.product_id = st.product_id").Find(&shop)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "failed get data"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "shop": shop})

}
