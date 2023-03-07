package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jekjeki/golang-gorm-postgres/models"
	"gorm.io/gorm"
)

type CategoryController struct {
	DB *gorm.DB
}

func NewCategoryController(DB *gorm.DB) CategoryController {
	return CategoryController{DB}
}

// get all category
func (cc *CategoryController) GetAllCategory(ctx *gin.Context) {
	var categories []models.Category
	result := cc.DB.Find(&categories)
	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "failed get data"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "categories": categories})
}

// popular category
func (cc *CategoryController) GetPopularCategory(ctx *gin.Context) {
	var category []models.Category

	result := cc.DB.Where("qty >= ?", 10).Joins("left join products on products.category_id = categories.id").Limit(3).Find(&category)

	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "failed get data"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "category": category})

}
