package controllers

import (
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/jekjeki/golang-gorm-postgres/models"
	"gorm.io/gorm"
)

type CartController struct {
	DB *gorm.DB
}

func NewCartController(DB *gorm.DB) CartController {
	return CartController{DB}
}

// add to cart
func (cc *CartController) AddToCart(ctx *gin.Context) {

	var payload *models.CartInput

	qtyprod := ctx.Param("qtyproduct")
	qtyprodupdate, _ := strconv.Atoi(qtyprod)

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	newCart := models.Cart{
		CartID:     payload.CartID,
		ProductID:  payload.ProductID,
		UserID:     payload.UserID,
		Qty:        payload.Qty,
		Totalprice: payload.Totalprice,
	}

	result := cc.DB.Create(&newCart)

	if result.Error != nil && strings.Contains(result.Error.Error(), "duplicate key value violates unique") {
		ctx.JSON(http.StatusConflict, gin.H{"status": "fail", "message": "User with that email already exists"})
		return
	} else if result.Error != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "error", "message": "Something bad happened"})
		return
	}

	cartResponse := &models.CartInputResponse{
		CartID: newCart.CartID,
	}

	var product models.Product

	result_update := cc.DB.Model(&product).Where("product_id = ?", newCart.ProductID).Update("qty", qtyprodupdate-int(newCart.Qty))

	if result_update.Error != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "error", "message": result_update.Error.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "newcart": cartResponse})

}
