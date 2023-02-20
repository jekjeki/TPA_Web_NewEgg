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
	result := pc.DB.Table("products").Select("products.product_id, s.shop_id, products.product_name, products.qty, products.product_status, products.product_rating, products.product_price, s.shop_name, s.shop_contact").Joins("left join storetransactions st on st.product_id = products.product_id").Joins("left join shops s on s.shop_id = st.shop_id").Where("products.product_status = ?", "best deal").Scan(&bestdeal)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "failed get data"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "bestdeal": bestdeal})
}
