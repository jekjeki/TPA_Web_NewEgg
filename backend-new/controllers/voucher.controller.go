package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jekjeki/golang-gorm-postgres/models"
	"gorm.io/gorm"
)

type VoucherController struct {
	DB *gorm.DB
}

func NewVoucherController(DB *gorm.DB) VoucherController {
	return VoucherController{DB}
}

// insert voucher
func (vc *VoucherController) AddVoucher(ctx *gin.Context) {
	var payload *models.VoucherInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	newVoucher := models.Voucher{
		VoucherID:       payload.VoucherID,
		VoucherName:     payload.VoucherName,
		VoucherDiscount: payload.VoucherDiscount,
	}

	result := vc.DB.Create(&newVoucher)

	if result.Error != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "error", "message": "Something bad happened"})
		return
	}

	voucherResponse := &models.VoucherResponse{
		VoucherID:       newVoucher.VoucherID,
		VoucherName:     newVoucher.VoucherName,
		VoucherDiscount: newVoucher.VoucherDiscount,
	}

	ctx.JSON(http.StatusCreated, gin.H{"status": "success", "data": gin.H{"voucher": voucherResponse}})
}
