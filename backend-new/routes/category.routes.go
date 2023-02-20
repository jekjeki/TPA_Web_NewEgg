package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/jekjeki/golang-gorm-postgres/controllers"
)

type CategoryRouteController struct {
	CategoryRouteController controllers.CategoryController
}

func NewRouteCategoryController(categoryController controllers.CategoryController) CategoryRouteController {
	return CategoryRouteController{categoryController}
}

func (cc *CategoryRouteController) CategoryRoute(rg *gin.RouterGroup) {
	router := rg.Group("category")
	router.GET("/categories", cc.CategoryRouteController.GetAllCategory)
}
